import { compose } from 'redux'

import SignInView from './SignInView'
import withUserAndFirebaseAndRouter from '../../hocs/withUser'
import withForm from '../../hocs/withForm'
import withHeader from '../../hocs/withHeader'

const wrappedSignInView = compose(
  withUserAndFirebaseAndRouter({ isNoUserRequired: false }),
  withForm,
  withHeader
)(SignInView)

export default wrappedSignInView
