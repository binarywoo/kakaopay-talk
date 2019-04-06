import React, { PureComponent } from 'react'
import { compose } from 'redux'

import withFirebase from './withFirebase'

// { service, key } 형태의 객체를 배열로 받음
// key 해당하는 service를 생성하여 prop으로 ComposedComponent에 전달
export default args => ComposedComponent => {
  class withService extends PureComponent {
    render() {
      const newProps = Object.assign(
        {},
        this.props,
        ...args.map(arg => ({
          [arg.key]: new arg.service(this.props.firebase)
        }))
      )
      return <ComposedComponent {...newProps} />
    }
  }

  return compose(withFirebase)(withService)
}
