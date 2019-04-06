import MessageDao from '../dao/MessageDao'
import ChatDao from '../dao/ChatDao'

class MessageService {
  constructor(firebase) {
    this.firebase = firebase
    this.dao = new MessageDao(firebase)
    this.chatDao = new ChatDao(firebase)
  }

  postMessage = (chatKey, message) => {
    this.chatDao.updateChat(`${chatKey}/lastMessage`, message.content)
    this.chatDao.updateChat(`${chatKey}/lastUpdate`, new Date().toISOString())
    return this.dao.createMessage(chatKey, message)
  }
}

export default MessageService
