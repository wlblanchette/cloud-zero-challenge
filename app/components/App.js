import { connect } from 'react-redux'
import { submitName } from '../actions'
import React from 'react';
import PropTypes from 'prop-types';

var _debugHeader = "[App]:>> ";

// passes abstracted dispatch handlers
// to App as props
const mapDispatchToProps = dispatch => {
  return {
    onNameClick: newName => dispatch(submitName(newName))
  }
}

// passes abstracted state
// to App as props
const mapStateToProps = state => {
  console.log(_debugHeader, "state", state)

  return {
    name: state.name
  }
}


function App({ name, onNameClick }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <button onClick={onNameClick.bind(null, "jimmothy")}>jimmothy</button>
      <button onClick={onNameClick.bind(null, "timmothy")}>timmothy</button>
    </div>
  );
};

App.propTypes = {
  name: PropTypes.string,
};


var StatefulApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)


export default StatefulApp;