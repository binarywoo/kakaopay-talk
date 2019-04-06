// ------------------------------------
// Constants
// ------------------------------------
export const RECEIVE_USER = 'RECEIVE_USER'

// ------------------------------------
// Actions
// ------------------------------------
export function receiveUser(user = null) {
  return {
    type: RECEIVE_USER,
    payload: user
  }
}

export function clearUser(user = null) {
  return {
    type: RECEIVE_USER,
    payload: null
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = null
export default function userReducer(state = initialState, action) {
  return action.type === RECEIVE_USER ? action.payload : state
}
