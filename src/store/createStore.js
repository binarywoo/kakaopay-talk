import { applyMiddleware, compose, createStore } from 'redux'
// import thunk from 'redux-thunk'

import reducers from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// 추후 redux 관련 미들웨어는 이곳에 추가
// 비동기 호출을 리듀서 내에서 하게 된다면 thunk 주석을 풀어야 함
const middlewares = [
  // thunk
]

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middlewares))
)

export default store
