import { convertSnapshotToArr, childSetAndReturnResult } from '../libs/daoUtils'

class ChatDao {
  constructor(firebase) {
    this.ref = firebase.database().ref('chats')
  }

  readAllChatList = () => {
    return this.ref
      .once('value')
      .then(snapshot => Promise.resolve(convertSnapshotToArr(snapshot)))
  }

  createChat = chat => {
    const key = this.ref.push().key
    const newChat = Object.assign({}, chat, { key })
    return childSetAndReturnResult(this.ref, key, newChat)
  }

  readChat = key => {
    return this.ref
      .child(key)
      .once('value')
      .then(snapshot => Promise.resolve(snapshot.val()))
  }

  updateChat = (path, data) => {
    return this.ref.child(path).set(data)
  }

  updateChatUsers = (chatKey, userKey, boolean) => {
    return this.ref.child(`${chatKey}/users/${userKey}`).set(boolean)
  }
}

export default ChatDao
