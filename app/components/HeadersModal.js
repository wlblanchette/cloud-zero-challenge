import { STATE } from '../constants'
import React from 'react';
import PropTypes from 'prop-types';

var _debugHeader = "[HeadersModal]:>> ";

class HeadersModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(_debugHeader, "this.props.open", this.props.open)
    var headerList = Object.keys(this.props.headers).map((header, i) => {
      return (<li key={"headerItem-"+i}>
        <span className="headers-modal__header">{header}: </span>
        <span className="headers-modal__counter">{this.props.headers[header]}</span>
      </li>)
    });

    var className = "headers-modal";

    if(this.props.open) {
      className += " open"
    }

    return (
      <div className={className}>
        <div className="container">
          <i className="fa fa-times-circle" onClick={this.props.toggleModal} aria-hidden="true"></i>
          <h3>All Unique Headers</h3>
          <ul>{headerList}</ul>
        </div>
      </div>
    )
  }
}


export default HeadersModal;