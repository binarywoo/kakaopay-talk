import { childSetAndReturnResult } from '../libs/daoUtils'

class MessageDao {
  constructor(firebase) {
    this.ref = firebase.database().ref('messages')
  }

  createMessage = (chatKey, message) => {
    const key = this.ref.child(chatKey).push().key
    const newMessage = Object.assign({}, message, { key })
    return childSetAndReturnResult(this.ref.child(chatKey), key, newMessage)
  }
}

export default MessageDao
