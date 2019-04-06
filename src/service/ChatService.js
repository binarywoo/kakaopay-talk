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

  participateChat = (chatKey, userKey) => {
    return this.dao.updateChatUsers(chatKey, userKey, true)
  }

  putChat = (path, data) => {
    return this.dao.updateChat(path, data)
  }
}

export default ChatService
