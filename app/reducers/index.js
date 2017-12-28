import {
  submitName
} from './../actions'

import { ACTION_TYPES, STATE } from '../constants'

var { FETCH_FAIL, FETCH_SUCCESS, FETCHING, TOGGLE_MODAL } = ACTION_TYPES;
const _debugHeader = "[reducer]:>> ";

const initialState = {
  sites: {},
  timing: {
    counter: 0,
    timestart: null,
    timeend: null
  },
  headerCollection: {},
  modal: {
    open: false
  }
}

processPrintedState(initialState.sites)

export default function reducer(state = initialState, action) {
  // console.log(_debugHeader, "state", state)
  // console.log(_debugHeader, "action", action)

  switch (action.type) {
    case FETCH_SUCCESS:
      return fetchSuccess(state, action)
    case FETCH_FAIL:
      return fetchFail(state, action)
    case FETCHING:
      return startingFetch(state, action)
    case TOGGLE_MODAL:
      return toggleModal(state, action)
    default:
      return state
  }
}


//------------------------------------
// promary reducers, process top-level 
// state
//------------------------------------
function toggleModal(state, action) {
  return {
    ...state,
    modal: {
      open: !state.modal.open
    }
  }
}

function startingFetch(state, action) {
  return {
    sites: {
      ...state.sites,
      [action.url]: {
        siteIndex: state.sites[action.url].siteIndex,
        fetch_state: STATE.URL.FETCHING,
      }
    },
    timing: {
      ...processTimingState(state.timing, action)
    },
    headerCollection: state.headerCollection,
    modal: state.modal
  };
}

function fetchSuccess(state, action) {
  return {
    sites: {
      ...state.sites,
      [action.url]: {
        siteIndex: state.sites[action.url].siteIndex,
        fetch_state: STATE.URL.RESOLVED,
        statusCode: action.statusCode
      }
    },
    timing: {
      ...processTimingState(state.timing, action)
    },
    headerCollection: {
      ...processIncomingHeaders(state.headerCollection, action)
    },
    modal: state.modal
  };
}

function fetchFail(state, action) {
  return {
    sites: {
      ...state.sites,
      [action.url]: {
        siteIndex: state.sites[action.url].siteIndex,
        fetch_state: STATE.URL.ERROR,
        errorMessage: action.errorMessage,
        statusCode: action.statusCode
      }
    },
    timing: {
      ...processTimingState(state.timing, action)
    },
    headerCollection: state.headerCollection,
    modal: state.modal
  };
}


//------------------------------------
// secondary reducer, for capturing 
// and counting unique headers
//------------------------------------
function processIncomingHeaders(headerState, action) {
  // console.log(_debugHeader, "action", action)
  var new_state = {
    ...headerState
  };

  Object.keys(action.headers).forEach(header => {
    if(new_state[header]) {
      new_state[header] = new_state[header] + 1;
    } else {
      new_state[header] = 1;
    }
  })

  return new_state
}


//------------------------------------
// secondary reducer, for timing state
//------------------------------------
function processTimingState(timingState, action) {
  let timestart = initTimestart(timingState.timestart),
      timeend,
      counter = timingState.counter;

  switch (action.type) {
    case FETCH_SUCCESS:
    case FETCH_FAIL:
      counter++;
      break;
    case FETCHING:
      break;
    default:
      return state
  }

  // check the counter to see if finished.
  if(counter === 25) {
    timeend = Date.now()
  } else {
    timeend = null
  }


  // console.log(_debugHeader, "*processTimingState* counter", counter)
  // console.log(_debugHeader, "*processTimingState* timestart", timestart)
  // console.log(_debugHeader, "*processTimingState* timeend", timeend)

  return {
    counter: counter,
    timestart: timestart,
    timeend: timeend
  }
}




//------------------------------------
// helpers
//------------------------------------

// initializer pattern, pass through if set.
function initTimestart(timestart) {
  if(timestart === null) {
    return Date.now()
  } else {
    return timestart
  }
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