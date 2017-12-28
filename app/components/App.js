import { connect } from 'react-redux'
import SiteListing from './SiteListing'
import { makeRequest } from '../actions'

var _debugHeader = "[SiteListing]:>> ";

// passes abstracted dispatch handlers
// to SiteListing as props
const mapDispatchToProps = dispatch => {
  return {
    dispatchMakeRequest: url => dispatch(makeRequest(url))
  }
}

// passes abstracted state
// to SiteListing as props
const mapStateToProps = state => {
  console.log(_debugHeader, "state", state)

  return {
    sites: state.sites
  }
}


var StatefulApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(SiteListing)


export default StatefulApp;