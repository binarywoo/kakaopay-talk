import React, { PureComponent } from 'react'

import { FirebaseContext } from '../contexts/firebase'

export default ComposedComponent => {
  class withFirebase extends PureComponent {
    render() {
      return (
        <FirebaseContext.Consumer>
          {firebase => (
            <ComposedComponent {...this.props} firebase={firebase} />
          )}
        </FirebaseContext.Consumer>
      )
    }
  }

  return withFirebase
}
