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

  updateMessage = (path, dao) => {
    return this.ref.child(path).set(dao)
  }
}

export default MessageDao
