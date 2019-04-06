import { compose } from 'redux'

import ChatListView from './ChatListView'
import withForm from '../../hocs/withForm'
import withUserAndFirebaseAndRouter from '../../hocs/withUser'
import withHeader from '../../hocs/withHeader'
import withSubscribe from '../../hocs/withSubscribe'
import withServiceAndFirebase from '../../hocs/withService'
import ChatService from '../../service/ChatService'

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
)(ChatListView)

export default wrappedChatListView
