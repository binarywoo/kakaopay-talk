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
import { USER_KEY } from '../../../constants/commonConstants'

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

  _onAcceptInvitation = invitation => {
    const { history, invitationService } = this.props
    invitationService.putInvitation(
      `${invitation.to}/${invitation.key}/checked`,
      true
    )
    history.push(`/chat/${invitation.chat}`)
  }

  _onDenyInvitation = invitation => {
    const { invitationService } = this.props
    invitationService.putInvitation(
      `${invitation.to}/${invitation.key}/checked`,
      true
    )
  }

  _onLogout = () => {
    const { userAction } = this.props
    userAction.clearUser()
    localStorage.removeItem(USER_KEY)
  }

  _onBack = () => {
    const { header, history, headerAction } = this.props
    if (header.backPath) {
      return () => {
        history.push(header.backPath)
        headerAction.receiveBackPath(null)
      }
    } else {
      return null
    }
  }

  _onChangeBackgroundColor = color => {
    const { user, userAction, userService } = this.props
    const { hex } = color
    const newUser = Object.assign({}, user, {
      backgroundColor: hex
    })
    userAction.receiveUser(newUser)
    userService.putUser(`${user.key}/backgroundColor`, hex)
  }

  _onApplyProfileImage = profileFileObj => {
    const { storage, userService, userAction, user } = this.props
    return storage
      .upload('messageImage', profileFileObj)
      .then(res => {
        const path = res.metadata.fullPath
        return storage.getDownloadUrl(path)
      })
      .then(url => {
        userService.putUser(`${user.key}/profileImage`, url)
        userAction.receiveUser(Object.assign({}, user, { profileImage: url }))
        return Promise.resolve()
      })
  }

  render() {
    return (
      <HeaderView
        {...this.props}
        onApplyProfileImage={this._onApplyProfileImage}
        onChangeBackgroundColor={this._onChangeBackgroundColor}
        onBack={this._onBack}
        onLogout={this._onLogout}
        onAcceptInvitation={this._onAcceptInvitation}
        onDenyInvitation={this._onDenyInvitation}
      />
    )
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
