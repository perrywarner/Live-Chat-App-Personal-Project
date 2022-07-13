// third party
import { useState, useEffect } from 'react'

// intra-app
import { User, UserCreateRequest } from '../../../models'

export const useUser = () => {
    const [users, setUsers] = useState<User[]>()
    const [createdUser, setCreatedUser] = useState<User>()
    const [tryPutUser, setTryPutUser] = useState<string>()
    const [getIsLoading, setGetIsLoading] = useState(false)
    const [putIsLoading, setPutIsLoading] = useState(false)

    // fetch list of users on render OR after success PUT new, see https://www.robinwieruch.de/react-hooks-fetch-data/
    useEffect(() => {
        setGetIsLoading(true)

        fetch('/users')
            .then((data) => {
                data.json().then((users: User[]) => {
                    setUsers(users)
                })
            })
            .catch((reason) => {
                console.error(`failed to GET User[] list. Reason: `, reason)
            })

        setGetIsLoading(false)
    }, [])

    // sends a PUT new User to backend when state "tryPutUser" changes.
    // on success, sets state "createdUser" to the newly created User.
    // TODO investigate cleanup part of useEffect
    useEffect(() => {
        if (tryPutUser) {
            setPutIsLoading(true)
            const requestBody: UserCreateRequest = {
                name: tryPutUser,
            }

            fetch('/users', {
                body: JSON.stringify(requestBody),
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((data) => {
                    data.json().then((newUser: User) => {
                        setCreatedUser(newUser)
                    })
                })
                .catch((reason) => {
                    console.error(
                        `failed to PUT User with name ${tryPutUser}. reason: `,
                        reason
                    )
                })

            setPutIsLoading(false)
        }
    }, [tryPutUser])

    // appends "createdUser" to state "users" when "createdUser" exists
    useEffect(() => {
        if (createdUser && users) {
            setUsers([...users, createdUser])
            setCreatedUser(undefined)
        }
    }, [createdUser, users])

    return {
        users: users,
        setTryPutUser: setTryPutUser,
        isLoading: {
            get: getIsLoading,
            put: putIsLoading,
        },
    }
}
