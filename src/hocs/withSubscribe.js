import React, { PureComponent } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import withFirebase from './withFirebase'
import { receiveSubscribe, clearSubscribe } from '../store/subscribe'
import { convertSnapshotToArr } from '../libs/daoUtils'

// options
// { dataPath, key } 의 배열
// dataPath: firebase의 reference 주소 (optional)
// key: store의 subscribe 하위에 생성할 키 이름
export default options => ComposedComponent => {
  class withSubscribe extends PureComponent {
    componentDidMount() {
      this._subscribeData()
    }

    _subscribeData = () => {
      const { firebase, subscribeAction } = this.props
      options.forEach(item => {
        const { dataPath, key } = item
        if (dataPath) {
          firebase
            .database()
            .ref(dataPath)
            .on('value', snapshot => {
              subscribeAction.receiveSubscribe(
                key,
                convertSnapshotToArr(snapshot)
              )
            })
        }
      })
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  const mapStateToProps = state => {
    const result = {}
    options.forEach(item => {
      result[item.key] = state.subscribe[item.key]
    })
    return result
  }

  const mapDispatchToProps = dispatch => ({
    subscribeAction: {
      receiveSubscribe: (key, item) => dispatch(receiveSubscribe(key, item)),
      clearSubscribe: key => dispatch(clearSubscribe(key))
    }
  })

  return compose(
    withFirebase,
    connect(
      mapStateToProps,
      mapDispatchToProps
    )
  )(withSubscribe)
}
