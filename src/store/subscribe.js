// ------------------------------------
// Constants
// ------------------------------------
export const RECEIVE_SUBSCRIBE = 'RECEIVE_SUBSCRIBE'
export const CLEAR_SUBSCRIBE = 'CLEAR_SUBSCRIBE'

// ------------------------------------
// Actions
// ------------------------------------
export function receiveSubscribe(key, state) {
  return {
    key,
    type: RECEIVE_SUBSCRIBE,
    payload: state
  }
}

export function clearSubscribe(key) {
  return {
    key,
    type: CLEAR_SUBSCRIBE
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function subscribeReducer(state = initialState, action) {
  if (action.type === RECEIVE_SUBSCRIBE) {
    return Object.assign({}, state, { [action.key]: action.payload })
  } else if (action.type === CLEAR_SUBSCRIBE) {
    return Object.assign({}, state, { [action.key]: null })
  } else {
    return state
  }
}
