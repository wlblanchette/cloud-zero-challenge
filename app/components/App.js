import { connect } from 'react-redux'
import SiteListing from './SiteListing'
import { makeRequest, toggleModal } from '../actions'

var _debugHeader = "[App]:>> ";

// passes abstracted dispatch handlers
// to SiteListing as props
const mapDispatchToProps = dispatch => {
  return {
    dispatchMakeRequest: url => dispatch(makeRequest(url)),
    toggleModal: () => dispatch(toggleModal())
  }
}

// passes abstracted state
// to SiteListing as props
const mapStateToProps = state => {
  // console.log(_debugHeader, "state", state)

  return {
    sites: state.sites,
    timing: state.timing,
    headers: state.headerCollection,
    modalOpen: state.modal.open
  }
}


var StatefulApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(SiteListing)


export default StatefulApp;