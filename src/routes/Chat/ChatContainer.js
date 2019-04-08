import React, { PureComponent } from 'react'
import { compose } from 'redux'
import { Icon } from 'antd'

import ChatView from './ChatView'
import withSubscribe from '../../hocs/withSubscribe'
import withService from '../../hocs/withService'
import ChatService from '../../service/ChatService'
import withHeader from '../../hocs/withHeader'
import MessageService from '../../service/MessageService'
import withUser from '../../hocs/withUser'
import withUpload from '../../hocs/withStorage'
import InvitationService from '../../service/InvitationService'
import { convertSnapshotToArr } from '../../libs/daoUtils'
import { scrollToBottom } from '../../libs/chatAppUtils'
import ConfirmModal from '../../components/ConfirmModal/index'

class ChatContainer extends PureComponent {
  componentDidMount() {
    this._listenToMessage()
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.match.params.key &&
      prevProps.match.params.key !== this.props.match.params.key
    ) {
      this._listenToMessage()
      this._unlistenToMessage(prevProps.match.params.key)
    }
  }

  componentWillUnmount() {
    const { subscribeAction, match, headerAction } = this.props
    const chatKey = match.params.key
    this._unlistenToMessage(chatKey)
    subscribeAction.clearSubscribe('messages')
    headerAction.receiveExtra(null)
  }

  _handleOnClickExit = () => {
    ConfirmModal({
      title: '채팅방 나가기',
      content: '채팅방을 나가시겠습니까?',
      onOk: () => {
        this._sendParticipateMessage('out')
        const { match, chatService, user, history, chat } = this.props
        const chatKey = match.params.key
        if (Object.keys(chat.users).length === 1) {
          chatService.deleteChat(chatKey)
        } else {
          chatService.deleteChat(`${chatKey}/users/${user.key}`)
        }
        history.push('/chat-list')
      }
    })
  }

  _listenToMessage = () => {
    const {
      match,
      chatService,
      history,
      user,
      headerAction,
      header,
      firebase,
      subscribeAction
    } = this.props
    const chatKey = match.params.key

    // 채팅방의 내 참여 정보를 업데이트
    chatService.getChat(chatKey).then(chat => {
      chatService.participateChatUser(chatKey, user)
      if (!chat.users[user.key]) this._sendParticipateMessage('in')
    })

    // 채팅방에 참여 후 채팅방 상태 구독
    firebase
      .database()
      .ref(`chats/${chatKey}`)
      .on('value', snapshot => {
        const chat = snapshot.val()
        if (!chat) return history.push('/404')
        subscribeAction.receiveSubscribe('chat', chat)
        // 헤더에 채팅방 나가기 버튼 생성
        headerAction.receiveHeader({
          title: chat.title,
          backPath: header.backPath || '/chat-list',
          extra: (
            <div
              key='exit'
              style={{
                cursor: 'export',
                display: 'inline-block',
                marginRight: 24
              }}
              onClick={this._handleOnClickExit}
            >
              <Icon type='export' />
            </div>
          )
        })
      })

    // 채팅방의 메시지 구독
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
    firebase
      .database()
      .ref(`chats/${chatKey}`)
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

  _sendParticipateMessage = inOrOut => {
    const { user, messageService, chat } = this.props
    const newMessage = {
      content: inOrOut,
      type: 'participate',
      user: user.key,
      userId: user.userId,
      lastUpdate: new Date().toISOString()
    }
    messageService.postMessage(chat.key, newMessage)
    return Promise.resolve()
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
    },
    {
      key: 'chat'
    }
  ]),
  withService([
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
  withUser({ isUserRequired: true })
)(ChatContainer)

export default wrappedChatView
