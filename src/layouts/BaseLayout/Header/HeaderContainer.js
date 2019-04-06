import { compose } from 'redux'

import HeaderView from './HeaderView'
import withUserAndFirebaseAndRouter from '../../../hocs/withUser'
import withHeader from '../../../hocs/withHeader'
import withSubscribe from '../../../hocs/withSubscribe'
import withServiceAndFirebase from '../../../hocs/withService'
import InvitationService from '../../../service/InvitationService'

const wrappedHeaderView = compose(
  withUserAndFirebaseAndRouter(),
  withHeader,
  withSubscribe([
    {
      key: 'invitations'
    }
  ]),
  withServiceAndFirebase([
    {
      key: 'invitationService',
      service: InvitationService
    }
  ])
)(HeaderView)

export default wrappedHeaderView
