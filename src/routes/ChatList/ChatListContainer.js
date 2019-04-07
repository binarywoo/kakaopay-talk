import React, { PureComponent } from 'react'
import { compose } from 'redux'

import ChatListView from './ChatListView'
import withForm from '../../hocs/withForm'
import withUserAndFirebaseAndRouter from '../../hocs/withUser'
import withHeader from '../../hocs/withHeader'
import withSubscribe from '../../hocs/withSubscribe'
import withServiceAndFirebase from '../../hocs/withService'
import ChatService from '../../service/ChatService'

class ChatListContainer extends PureComponent {
  componentDidMount() {
    const { headerAction } = this.props
    headerAction.receiveHeader({ title: '채팅방 목록', backPath: null })
  }

  _createChat = newChat => {
    const { chatService } = this.props
    return chatService.postChat(newChat).then(chat => this._goToChat(chat))
  }

  _goToChat = chat => {
    const { headerAction, location, history } = this.props
    headerAction.receiveBackPath(`${location.pathname}${location.search}`)
    history.push(`/chat/${chat.key}`)
  }

  render() {
    return (
      <ChatListView
        {...this.props}
        createChat={this._createChat}
        goToChat={this._goToChat}
      />
    )
  }
}

const wrappedChatListView = compose(
  withUserAndFirebaseAndRouter({ isUserRequired: true }),
  withForm,
  withHeader,
  withSubscribe([
    {
      dataPath: 'chats',
      key: 'chatList'
    }
  ]),
  withServiceAndFirebase([
    {
      key: 'chatService',
      service: ChatService
    }
  ])
)(ChatListContainer)

export default wrappedChatListView
