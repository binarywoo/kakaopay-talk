import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { clearView, receiveView } from '../store/view'

// options
// { service, key } 의 배열로 이루어짐
// service로 데이터를 가져오고 unmount시 클리어
export default options => ComposedComponent => {
  class withView extends React.PureComponent {
    componentDidMount() {
      this._fetchData()
    }

    _fetchData = () => {
      const { viewAction } = this.props
      options.forEach(item => {
        const { service, key } = item
        if (service) {
          service().then(res => viewAction.receiveView(key, res))
        }
      })
    }

    componentWillUnmount() {
      options.forEach(item => {
        const { viewAction } = this.props
        viewAction.clearView(item.key)
      })
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  const mapStateToProps = state => {
    const result = {}
    options.forEach(item => {
      result[item.key] = state.view[item.key]
    })
    return result
  }

  const mapDispatchToProps = dispatch => ({
    viewAction: {
      clearView: key => dispatch(clearView(key)),
      receiveView: (key, state) => dispatch(receiveView(key, state))
    }
  })

  return compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )
  )(withView)
}
