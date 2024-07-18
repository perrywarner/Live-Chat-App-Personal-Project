import { randomInt } from 'crypto'
import {
    Message,
    MessageCreateRequest,
    MessageGetQueryParams,
    setupMessageModel,
} from '../models'
import { Model, ModelCtor, Sequelize } from 'sequelize'
import { displayCurrentTime } from '../utils/displayCurrentTime'

type CacheSyncBacklog = {
    news: Message[]
    updateds: {
        original: Message
        updated: Message
    }[]
    deleteds: Message[]
}

export class MessageService {
    messages: Message[]
    messagesTable: ModelCtor<Model<any, any>> | undefined
    cacheSyncBacklog: CacheSyncBacklog
    syncTimerTimesCalled: number

    constructor(dbConnection: Sequelize) {
        this.cacheSyncBacklog = {
            news: [],
            updateds: [],
            deleteds: [],
        }
        this.messages = []
        this.syncTimerTimesCalled = 0

        // Set up our Sequelize Models which are basically our DB Tables. More info at https://sequelize.org/docs/v6/core-concepts/model-basics/#concept
        console.log('\n✨ Initiating Message Table setup ✨')
        setupMessageModel(dbConnection)
            .catch((error) => {
                throw new Error('⛔ Failed to create the Message table:', error)
            })
            .then(async (table) => {
                this.messagesTable = table
                console.log('✅ Successfully linked ORM with Messages DB ')
                const messageListQueryResult =
                    await this.messagesTable.findAll()
                const messageList = messageListQueryResult.map(
                    (queryResult) => {
                        return queryResult.toJSON()
                    }
                )
                this.messages = messageList
                if (this.messages) {
                    console.log(
                        '✅ Messages successfully queried from DB and loaded in memory'
                    )
                }
                this.startSyncTimer()
            })
    }

    create(submitted: MessageCreateRequest) {
        // TODO don't create message if sentBy not in Users
        if (!this.messagesTable) {
            throw new Error(
                'Could not perform operation because messagesTable has not yet been initialized'
            )
        }
        const newMessage: Message = {
            id: randomInt(0, 65536),
            data: submitted.data,
            sentBy: submitted.sentBy,
            createTime: Date.now(),
            createdAt: Date.now().toString(),
            updatedAt: Date.now().toString(),
            existsOnlyInMemory: true,
        }
        this.messages.push(newMessage)
        this.cacheSyncBacklog.news.push(newMessage)
        return newMessage
    }

    // potential TODO: maybe add queryBy Message['data']
    queryBy({ sentBy }: MessageGetQueryParams) {
        let response: Message[] = []

        if (sentBy) {
            response = Array.from(this.messages.values()).filter((message) => {
                return sentBy === message.sentBy
            })
        }

        return response
    }

    /* WIP
    // currently the param 'createTime' is the only choice so could be seen as redundant,
    //  but I plan on adding other Message properties in the future and this way is adaptible to it
    sortBy(choice: 'createTime') {
        if (choice === 'createTime') {
            // .sort(((curr, next) => {
            //     const currTime = curr[0];
            //     const nextTime = next[0];
            //     if (typeof currTime === 'number' && typeof nextTime === 'number') {
            //         return currTime - nextTime
            //     }
            // }))
        } else return;
    }
    */

    async syncMessagesInMemoryWithDb() {
        if (!this.cacheSyncBacklog || !this.messagesTable) {
            return
        }
        console.log('\n\n🔄 Starting sync with DB 🔄')
        console.log('Cache Sync Backlog looks to be:', this.cacheSyncBacklog)

        const { news, updateds, deleteds } = this.cacheSyncBacklog
        let tableUpdated = false
        if (news.length > 0) {
            console.log(
                `${news.length} Messages have been created in the in-memory cache. Attempting to create them in the DB...`
            )
            const revisedAsDbCompatible = news.map((newMessage) => {
                return {
                    data: newMessage.data,
                    sentBy: newMessage.sentBy,
                    createTime: newMessage.createTime,
                }
            })
            const totalCreatedsCount = await this.messagesTable.bulkCreate(
                revisedAsDbCompatible
            )
            console.log(`📀 Created ${totalCreatedsCount} Messages in the DB.`)
            tableUpdated = true
        }
        if (updateds.length > 0) {
            console.log(
                `${news.length} Messages have been updated in the in-memory cache. Attempting to update them in the DB...`
            )
            const ids = updateds.map((updated) => updated.original.id)
            const revisedAsDbCompatible = updateds.map((updatedMessage) => {
                return {
                    data: updatedMessage.updated.data,
                    sentBy: updatedMessage.updated.sentBy,
                }
            })
            const updateThreads = revisedAsDbCompatible.map(
                (updatedValue, index) => {
                    return this.messagesTable?.update(updatedValue, {
                        where: {
                            id: ids[index],
                        },
                    })
                }
            )
            const consolidatedUpdateResult = await Promise.all(updateThreads)
            const totalUpdatedsCount = consolidatedUpdateResult.reduce(
                (accumulator, currentValue, currentIndex) => {
                    if (!currentValue) {
                        return accumulator
                    }
                    return accumulator + currentValue[currentIndex]
                },
                0
            )
            console.log(`📀 Updated ${totalUpdatedsCount} Messages in the DB.`)
            tableUpdated = true
        }
        if (deleteds.length > 0) {
            console.log(
                `${news.length} Messages have been deleted in the in-memory cache. Attempting to delete them in the DB...`
            )
            const deleteThreads = deleteds.map((deleted) => {
                return this.messagesTable?.destroy({
                    where: {
                        id: deleted.id,
                    },
                })
            })
            const consolidatedUpdateResult = await Promise.all(deleteThreads)
            const totalDeletedsCount = consolidatedUpdateResult.reduce(
                (accumulator, currentValue, currentIndex) => {
                    if (!accumulator) {
                        console.log(
                            `weirdness occurred: totalDeletedsCount accumulator undefined during loop index: ${currentIndex}. Setting accumulator to 0 and wishing for the best...`
                        )
                        accumulator = 0
                    }
                    if (!currentValue) {
                        return accumulator
                    }
                    return accumulator + currentValue
                },
                0
            )
            console.log(`📀 Deleted ${totalDeletedsCount} Messages in the DB.`)
            tableUpdated = true
        }
        if (tableUpdated) {
            console.log(
                'DB Table has been updated. Syncing in-memory cache with DB.'
            )
            const messageListQueryResult = await this.messagesTable.findAll()
            const messageList = messageListQueryResult.map((queryResult) => {
                return queryResult.toJSON()
            })
            this.messages = messageList
            if (this.messages) {
                console.log(
                    '✅ Messages successfully queried from DB and loaded in memory'
                )
            }
        }
        this.cacheSyncBacklog = {
            news: [],
            updateds: [],
            deleteds: [],
        }
        console.log('🔄 Finishing sync with DB 🔄')

        this.syncTimerTimesCalled = this.syncTimerTimesCalled + 1
        console.log(
            `DB sync wait timer started. Should execute in 20 seconds. Times it has been called: ${this.syncTimerTimesCalled}.`
        )
        displayCurrentTime()
    }

    async startSyncTimer() {
        setInterval(() => this.syncMessagesInMemoryWithDb(), 10000)
        await this.syncMessagesInMemoryWithDb()
    }
}
