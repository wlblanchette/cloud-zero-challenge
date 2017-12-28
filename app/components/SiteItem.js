import { makeRequest } from '../actions'
import { STATE } from '../constants'
import React from 'react';
import PropTypes from 'prop-types';

var _debugHeader = "[SiteItem]:>> ";

class SiteItem extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var siteUrl = this.props.url;
    this.props.dispatchMakeRequest(siteUrl);
  }

  render() {
    var contents = [];

    switch(this.props.fetch_state) {
      case STATE.URL.ERROR:
        contents.push(<i key="errorIcon" className="fa fa-exclamation-triangle" aria-hidden="true"></i>)
        contents.push(<p key="errorMessage" className="site-item__error-msg">{this.props.errorMessage}</p>)
        break;
      case STATE.URL.FETCHING:
        contents.push(<i key="loading" className="fa fa-spinner" aria-hidden="true"></i>)
        break;
      case STATE.URL.RESOLVED:
        var href = "http://" + this.props.url;
        contents.push(<i key="successIcon" className="fa fa-check-circle" aria-hidden="true"></i>)
        contents.push(<a key="link" className="site-item__link" target="__blank" href={href}>{href}</a>)
        break;
      default:
        break;
    }
    if(this.props.fetch_state === STATE.URL.ERROR) {
      
    }

    return (
      <div className="site-item">
        <h3 className="site-item__url">{this.props.url}</h3>
        <div className="row">
          {contents}
        </div>
      </div>
    )
  }
}

SiteItem.propTypes = {
  url: PropTypes.string,
  siteIndex: PropTypes.string,
  fetch_state: PropTypes.string
};


export default SiteItem;