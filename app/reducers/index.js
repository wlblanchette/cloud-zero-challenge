import {
  ACTION_TYPES,
  submitName
} from './../actions'

const { NEW_NAME } = ACTION_TYPES;
const _debugHeader = "[reducer]:>> ";

const initialState = {
  name: 'fred the first'
}

function reducer(state = initialState, action) {
  console.log(_debugHeader, "state", state)
  console.log(_debugHeader, "action", action)

  switch (action.type) {
    case NEW_NAME:
      return Object.assign({}, state, {
        name: action.name
      })
    default:
      return state
  }
}

export default reducer