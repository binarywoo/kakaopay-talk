import React, { PureComponent } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import {
  receiveHeader,
  receiveTitle,
  receiveBackPath,
  receiveExtra
} from '../store/header'

export default ComposedComponent => {
  class withHeader extends PureComponent {
    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  const mapStateToProps = state => ({
    header: state.header
  })

  const mapDispatchToProps = dispatch => ({
    headerAction: {
      receiveHeader: header => dispatch(receiveHeader(header)),
      receiveTitle: title => dispatch(receiveTitle(title)),
      receiveBackPath: backPath => dispatch(receiveBackPath(backPath)),
      receiveExtra: extraComponent => dispatch(receiveExtra(extraComponent))
    }
  })

  return compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )
  )(withHeader)
}
