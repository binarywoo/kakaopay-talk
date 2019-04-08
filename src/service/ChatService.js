import ChatDao from '../dao/ChatDao'

class ChatService {
  constructor(firebase) {
    this.firebase = firebase
    this.dao = new ChatDao(firebase)
  }

  getAllChatList = () => {
    return this.dao.readAllChatList()
  }

  postChat = chat => {
    return this.dao.createChat(chat)
  }

  subscribeAllChatList = () => {
    return this.dao.listenToAllChatList()
  }

  getChat = key => {
    return this.dao.readChat(key)
  }

  participateChat = (chatKey, user) => {
    return this.dao.updateChatUsers(chatKey, user.key, user.userId)
  }

  putChat = (path, data) => {
    return this.dao.updateChat(path, data)
  }

  deleteChat = key => {
    return this.dao.deleteChat(key)
  }
}

export default ChatService
