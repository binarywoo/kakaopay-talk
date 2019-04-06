import { fromJS } from 'immutable'
// ------------------------------------
// Constants
// ------------------------------------
export const RECEIVE_HEADER = 'RECEIVE_HEADER'
export const RECEIVE_TITLE = 'RECEIVE_TITLE'
export const RECEIVE_BACK_PATH = 'RECEIVE_BACK_PATH'
export const RECEIVE_EXTRA = 'RECEIVE_EXTRA'

// ------------------------------------
// Actions
// ------------------------------------
export function receiveHeader(header) {
  return {
    type: RECEIVE_HEADER,
    payload: header
  }
}

export function receiveTitle(title) {
  return {
    type: RECEIVE_TITLE,
    payload: title
  }
}

export function receiveBackPath(backPath) {
  return {
    type: RECEIVE_BACK_PATH,
    payload: backPath
  }
}

export function receiveExtra(extra) {
  return {
    type: RECEIVE_EXTRA,
    payload: extra
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  title: null,
  backPath: null,
  extra: null
}
export default function userReducer(state = initialState, action) {
  if (action.type === RECEIVE_HEADER) {
    return action.payload
  } else if (action.type === RECEIVE_TITLE) {
    return fromJS(state)
      .setIn(['title'], action.payload)
      .toJS()
  } else if (action.type === RECEIVE_BACK_PATH) {
    return fromJS(state)
      .setIn(['backPath'], action.payload)
      .toJS()
  } else if (action.type === RECEIVE_EXTRA) {
    return fromJS(state)
      .setIn(['extra'], action.payload)
      .toJS()
  } else {
    return state
  }
}
