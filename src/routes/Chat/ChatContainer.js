import React, { PureComponent } from 'react'
import { compose } from 'redux'

import ChatView from './ChatView'
import withSubscribe from '../../hocs/withSubscribe'
import withView from '../../hocs/withView'
import withServiceAndFirebase from '../../hocs/withService'
import ChatService from '../../service/ChatService'
import withHeader from '../../hocs/withHeader'
import MessageService from '../../service/MessageService'
import withUserAndFirebaseAndRouter from '../../hocs/withUser'
import withUpload from '../../hocs/withStorage'
import InvitationService from '../../service/InvitationService'
import { convertSnapshotToArr } from '../../libs/daoUtils'
import { scrollToBottom } from '../../libs/chatAppUtils'

class ChatContainer extends PureComponent {
  componentDidMount() {
    this._listenToMessage()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.key !== this.props.match.params.key) {
      this._unlistenToMessage(prevProps.match.params.key)
      this._listenToMessage()
    }
  }

  componentWillUnmount() {
    const { subscribeAction, match } = this.props
    const chatKey = match.params.key
    this._unlistenToMessage(chatKey)
    subscribeAction.clearSubscribe('messages')
  }

  _listenToMessage = () => {
    const {
      match,
      chatService,
      history,
      user,
      headerAction,
      viewAction,
      header,
      firebase,
      subscribeAction
    } = this.props
    const chatKey = match.params.key

    chatService.getChat(chatKey).then(chat => {
      if (!chat) return history.push('/404')
      viewAction.receiveView('chat', chat)
      if (!chat.users[user.key]) {
        chatService.participateChat(chatKey, user.key)
      }
      headerAction.receiveHeader({
        title: chat.title,
        backPath: header.backPath || '/chat-list'
      })
    })

    firebase
      .database()
      .ref(`messages/${chatKey}`)
      .on('value', snapshot => {
        subscribeAction.receiveSubscribe(
          'messages',
          convertSnapshotToArr(snapshot)
        )
      })

    scrollToBottom()
  }

  _unlistenToMessage = chatKey => {
    const { firebase } = this.props
    firebase
      .database()
      .ref(`messages/${chatKey}`)
      .off('value')
  }

  _onSendMessage = message => {
    const { user, messageService, chat } = this.props
    const newMessage = {
      content: message,
      type: 'text',
      user: user.key,
      userId: user.userId,
      lastUpdate: new Date().toISOString(),
      profileImage: user.profileImage || null
    }
    messageService.postMessage(chat.key, newMessage)
  }

  _getUserListToInvite = () => {
    const { userService } = this.props
    return userService.getAllUser()
  }

  _sendImageMessage = file => {
    const { storage, user, messageService, chat } = this.props
    return storage
      .upload('messageImage', file)
      .then(res => {
        const path = res.metadata.fullPath
        return storage.getDownloadUrl(path)
      })
      .then(url => {
        const newMessage = {
          content: url,
          type: 'image',
          user: user.key,
          userId: user.userId,
          lastUpdate: new Date().toISOString(),
          profileImage: user.profileImage || null
        }
        messageService.postMessage(chat.key, newMessage)
        return Promise.resolve()
      })
  }

  _sendInvitation = invitation => {
    const { invitationService } = this.props
    return invitationService.postInvitation(invitation)
  }

  render() {
    return (
      <ChatView
        {...this.props}
        sendInvitation={this._sendInvitation}
        sendImageMessage={this._sendImageMessage}
        getUserListToInvite={this._getUserListToInvite}
        onSendMessage={this._onSendMessage}
      />
    )
  }
}

const wrappedChatView = compose(
  withSubscribe([
    {
      key: 'messages'
    }
  ]),
  withView([
    {
      key: 'chat'
    }
  ]),
  withServiceAndFirebase([
    {
      service: ChatService,
      key: 'chatService'
    },
    {
      service: MessageService,
      key: 'messageService'
    },
    {
      service: InvitationService,
      key: 'invitationService'
    }
  ]),
  withHeader,
  withUpload,
  withUserAndFirebaseAndRouter({ isUserRequired: true })
)(ChatContainer)

export default wrappedChatView
