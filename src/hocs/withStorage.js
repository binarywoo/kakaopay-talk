import React from 'react'
import { compose } from 'redux'
import withFirebase from './withFirebase'

export default ComposedComponent => {
  class withStorage extends React.PureComponent {
    _uploadFile = (path, file) => {
      const { firebase } = this.props
      const storageRef = firebase.storage().ref()
      const fileRef = storageRef.child(`${path}/${Date.now()}/${file.name}`)
      return fileRef.put(file)
    }

    _getDownloadUrl = path => {
      const { firebase } = this.props
      const storageRef = firebase.storage().ref()
      return storageRef.child(path).getDownloadURL()
    }

    render() {
      return (
        <ComposedComponent
          {...this.props}
          storage={{
            upload: this._uploadFile,
            getDownloadUrl: this._getDownloadUrl
          }}
        />
      )
    }
  }

  return compose(withFirebase)(withStorage)
}
