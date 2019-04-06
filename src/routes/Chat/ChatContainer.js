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
)(ChatView)

export default wrappedChatView
