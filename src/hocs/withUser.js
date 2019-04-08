import React, { PureComponent } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { clearUser, receiveUser } from '../store/user'
import { isEmpty } from '../libs/commonUtils'
import { USER_KEY } from '../constants/commonConstants'
import SpinContainer from '../components/SpinContainer'
import withService from './withService'
import UserService from '../service/UserService'
import withSubscribe from './withSubscribe'

// options
// isUserRequired - 로그인이 꼭 필요한 페이지
// isNoUserRequired - 로그아웃 상태여야만 하는 페이지
export default (
  options = { isUserRequired: false, isNoUserRequired: false }
) => ComposedComponent => {
  class withUser extends PureComponent {
    constructor(props) {
      super(props)
      this.state = {
        isUserLoaded: !isEmpty(props.user)
      }
    }

    componentDidMount() {
      this._autoSignIn()
    }

    _autoSignIn = () => {
      // 로컬스토리지에 유저정보가 있을 경우 자동으로 로그인
      const { userAction, firebase } = this.props
      if (!this.state.isUserLoaded) {
        const userKey = localStorage.getItem(USER_KEY)
        if (userKey) {
          firebase
            .database()
            .ref(`users/${userKey}`)
            .on('value', snapshot => {
              userAction.receiveUser(snapshot.val())
              this.setState({ isUserLoaded: true })
            })
        } else {
          this.setState({ isUserLoaded: true })
        }
      }
    }

    render() {
      const { isUserRequired, isNoUserRequired } = options
      const { user } = this.props
      const { isUserLoaded } = this.state
      if (!isUserLoaded) return <SpinContainer />
      else if (isUserRequired && !user) {
        return <Redirect to='/sign-in' />
      } else if (isNoUserRequired && user) {
        return <Redirect to='/' />
      }
      return <ComposedComponent {...this.props} />
    }
  }

  const mapStateToProps = state => ({
    user: state.user
  })

  const mapDispatchToProps = dispatch => ({
    userAction: {
      receiveUser: user => dispatch(receiveUser(user)),
      clearUser: () => dispatch(clearUser())
    }
  })

  return compose(
    withRouter,
    withSubscribe([
      {
        key: 'user'
      }
    ]),
    withService([
      {
        key: 'userService',
        service: UserService
      }
    ]),
    connect(
      mapStateToProps,
      mapDispatchToProps
    )
  )(withUser)
}
