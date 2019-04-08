import ChatDao from '../dao/ChatDao'
import MessageDao from '../dao/MessageDao'

class ChatService {
  constructor(firebase) {
    this.firebase = firebase
    this.dao = new ChatDao(firebase)
    this.messageDao = new MessageDao(firebase)
  }

  getAllChatList = () => {
    return this.dao.readAllChatList()
  }

  postChat = chat => {
    return this.dao.createChat(chat).then(newChat => {
      const userKey = Object.keys(newChat.users)[0]
      const user = newChat.users[userKey]
      const newMessage = {
        content: 'in',
        type: 'participate',
        user: Object.keys(newChat.users)[0],
        userId: user.userId,
        lastUpdate: new Date().toISOString()
      }
      this.messageDao.createMessage(newChat.key, newMessage)
      return Promise.resolve(newChat)
    })
  }

  subscribeAllChatList = () => {
    return this.dao.listenToAllChatList()
  }

  getChat = key => {
    return this.dao.readChat(key)
  }

  participateChatUser = (chatKey, user) => {
    return this.dao.updateChat(`${chatKey}/users/${user.key}`, {
      userId: user.userId,
      participate: new Date().toISOString()
    })
  }

  putChat = (path, data) => {
    return this.dao.updateChat(path, data)
  }

  deleteChat = key => {
    return this.dao.deleteChat(key)
  }
}

export default ChatService
