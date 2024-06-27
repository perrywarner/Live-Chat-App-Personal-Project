import { User } from '../app'
import { Message } from '../models'

// addNewMessageToUserSentBy() requires instance of User to already have initialized.
// figured this out the hard way: I tried to put this function inside the create() method of MessageService but encountered "TypeError: services_1.MessageService is not a constructor"
// as a result, this is only called in /routes/message:createMessage() because both instances would have been initialized at that point.
//
// unfortunately, since it's wrapped up in /routes, a network request to that endpoint is required to trigger the logic.
// as a result, this is a key thing I wanted to test but had to be omitted from the UserService <=> MessageService Integration Tests.
//
// (note valid as of 6/30/22)
// export const addNewMessageToUserSentBy = (newMessage: Message) => {
//     User.addSentMessage(newMessage.sentBy, newMessage)
// }
