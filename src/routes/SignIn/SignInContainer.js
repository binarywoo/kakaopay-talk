import React, { PureComponent } from 'react'
import { compose } from 'redux'

import SignInView from './SignInView'
import withUserAndFirebaseAndRouter from '../../hocs/withUser'
import withForm from '../../hocs/withForm'
import withHeader from '../../hocs/withHeader'
import { USER_KEY } from '../../constants/commonConstants'

class SignInContainer extends PureComponent {
  componentDidMount() {
    const { headerAction } = this.props
    headerAction.receiveTitle('로그인')
  }

  _onSubmit = userId => {
    const { userService, history } = this.props
    return userService.getUserByUserId(userId).then(user => {
      if (!user) {
        return userService.postUser({ userId }).then(user => {
          localStorage.setItem(USER_KEY, user.key)
          history.push('/chat-list')
          return Promise.resolve()
        })
      } else {
        localStorage.setItem(USER_KEY, user.key)
        history.push('/chat-list')
        return Promise.resolve()
      }
    })
  }

  render() {
    return <SignInView {...this.props} onSubmit={this._onSubmit} />
  }
}

const wrappedSignInView = compose(
  withUserAndFirebaseAndRouter({ isNoUserRequired: false }),
  withForm,
  withHeader
)(SignInContainer)

export default wrappedSignInView
