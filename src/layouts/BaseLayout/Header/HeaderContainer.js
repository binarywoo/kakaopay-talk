import React, { PureComponent } from 'react'
import { compose } from 'redux'

import HeaderView from './HeaderView'
import withForm from '../../../hocs/withForm'
import withUser from '../../../hocs/withUser'
import withHeader from '../../../hocs/withHeader'
import withSubscribe from '../../../hocs/withSubscribe'
import withService from '../../../hocs/withService'
import withStorage from '../../../hocs/withStorage'
import InvitationService from '../../../service/InvitationService'
import { convertSnapshotToArr } from '../../../libs/daoUtils'

class HeaderContainer extends PureComponent {
  componentDidMount() {
    this._subscribeUser()
  }

  _subscribeUser = () => {
    const { firebase, user, subscribeAction } = this.props
    if (user) {
      firebase
        .database()
        .ref(`invitations/${user.key}`)
        .on('value', snapshot => {
          subscribeAction.receiveSubscribe(
            'invitations',
            convertSnapshotToArr(snapshot)
          )
        })
    }
  }

  render() {
    return <HeaderView {...this.props} />
  }
}

const wrappedHeaderView = compose(
  withUser(),
  withHeader,
  withSubscribe([
    {
      key: 'invitations'
    }
  ]),
  withService([
    {
      key: 'invitationService',
      service: InvitationService
    }
  ]),
  withForm,
  withStorage
)(HeaderContainer)

export default wrappedHeaderView
