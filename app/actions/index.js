import { ACTION_TYPES } from '../constants'
import AJAX from '../scripts/AJAX'
var _debugHeader = "[makeRequest]:>> ";

var { FETCH_FAIL, FETCH_SUCCESS, FETCHING, TOGGLE_MODAL } = ACTION_TYPES;

// ask the server to proxy a request
// the server will return the desired result
export function makeRequest(siteUrl) {
  return dispatch => {
    var url = "/site?url="+siteUrl;
    // console.log(_debugHeader, "url", url)

    // show which urls are being fetched
    dispatch(startingFetch(siteUrl))

    AJAX({
      method: "GET",
      url: url 
    }).then(result => {
      var {success, response} = result;
      var response = JSON.parse(response);
      
      // console.log(_debugHeader, "success", success)
      // console.log(_debugHeader, "response", response)

      if(response.success) {
        dispatch(fetchSuccess({
          url: siteUrl,
          statusCode: response.statusCode,
          headers: response.headers
        }))
      } else {        
        dispatch(fetchFail({
          url: siteUrl,
          statusCode: response.statusCode
        }, getErrorMessage(response)))
      }
    }).catch(error => {
      console.log(_debugHeader, error)
    })
  }
}

export function fetchSuccess(data) {
  var { url, statusCode, headers } = data;

  return {
    type: FETCH_SUCCESS,
    statusCode: statusCode,
    url,
    headers
  }
}

export function fetchFail(data, errorMessage) {
  var { url, statusCode } = data;

  return {
    type: FETCH_FAIL,
    errorMessage: errorMessage,
    statusCode: statusCode,
    url
  }
}

export function startingFetch(url) {
  return {
    type: FETCHING,
    url
  }
}

export function toggleModal() {
  return {
    type: TOGGLE_MODAL
  }
}



function getErrorMessage(response) {
  var errorMessage = "There was an error testing this site";

  if(response.error) {
    if(response.error.code === "ETIMEDOUT") {
      errorMessage = "Request timed out"
    } else if (response.error.code === "ENOTFOUND") {
      errorMessage = "Page not found"
    }
  }

  return errorMessage;
}