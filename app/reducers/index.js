import {
  submitName
} from './../actions'

import { ACTION_TYPES, STATE } from '../constants'

var { FETCH_FAIL, FETCH_SUCCESS, FETCHING } = ACTION_TYPES;
const _debugHeader = "[reducer]:>> ";

const initialState = {
  sites: {}
}

processPrintedState(initialState.sites)

function reducer(state = initialState, action) {
  // console.log(_debugHeader, "state", state)
  // console.log(_debugHeader, "action", action)

  switch (action.type) {
    case FETCH_SUCCESS:
      return fetchSuccess(state, action)
    case FETCH_FAIL:
      return fetchFail(state, action)
    case FETCHING:
      return startingFetch(state, action)
    default:
      return state
  }
}

export default reducer


function startingFetch(state, action) {
  return {
    sites: {
      ...state.sites,
      [action.url]: {
        siteIndex: state.sites[action.url].siteIndex,
        fetch_state: STATE.URL.FETCHING,
      }
    }
  };
}

function fetchSuccess(state, action) {
  return {
    sites: {
      ...state.sites,
      [action.url]: {
        siteIndex: state.sites[action.url].siteIndex,
        fetch_state: STATE.URL.RESOLVED,
      }
    }
  };
}

function fetchFail(state, action) {
  return {
    sites: {
      ...state.sites,
      [action.url]: {
        siteIndex: state.sites[action.url].siteIndex,
        fetch_state: STATE.URL.ERROR,
        errorMessage: action.errorMessage
      }
    }
  };
}

//----------------------------------------------------
// data from server is printed to page on SITES_DATA
// this translates the data printed to
// page into useful state
//
// shape of page data is:
// [
//   [0, "google.com"],
//   ...
// ]
//----------------------------------------------------
function processPrintedState(initialState) {
  SITES_DATA.forEach(item => {
    getNewUrlState(item, initialState)
  })
}

//----------------------------------------------------
// this function will recieve a single item 
// and the base state obj:
// [ id <Number>, url <String> ]
//----------------------------------------------------
function getNewUrlState(item, state) {
  state[item[1]] = {
    siteIndex: item[0],
    fetch_state: STATE.URL.INITIAL
  }
}