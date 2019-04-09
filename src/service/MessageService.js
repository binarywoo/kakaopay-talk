import MessageDao from '../dao/MessageDao'
import ChatDao from '../dao/ChatDao'

class MessageService {
  constructor(firebase) {
    this.firebase = firebase
    this.dao = new MessageDao(firebase)
    this.chatDao = new ChatDao(firebase)
  }

  postMessage = (chatKey, message) => {
    if (message.type !== 'participate') {
      this.chatDao.updateChat(
        `${chatKey}/lastMessage`,
        message.type === 'text' ? message.content : '사진'
      )
      this.chatDao.updateChat(`${chatKey}/lastUpdate`, new Date().toISOString())
    }
    return this.dao.createMessage(chatKey, message)
  }

  putMessage = (path, data) => {
    return this.dao.updateMessage(path, data)
  }
}

export default MessageService
