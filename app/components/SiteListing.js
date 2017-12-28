import React from 'react';
import PropTypes from 'prop-types';

// components
import SiteItem from './SiteItem';
import HeadersModal from './HeadersModal';
import PaginationFooter from './PaginationFooter';

var _debugHeader = "[SiteListing]:>> ";

class SiteListing extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log(_debugHeader, "this.props", this.props)
    var sites = Object.keys(this.props.sites),
        timeWaiting = getTimeWaiting(this.props.timing);

    var contents = sites.map(site => {
      let propSite = this.props.sites[site];
      // console.log(_debugHeader, "propSite", propSite)

      let siteIndex = propSite.siteIndex;
      let fetch_state = propSite.fetch_state;
      let statusCode = propSite.statusCode;

      let errorMessage = propSite.errorMessage ? 
                            propSite.errorMessage : 
                            "";

      return (
        <SiteItem
          url={site} 
          key={siteIndex} 
          siteIndex={siteIndex}
          fetch_state={fetch_state}
          errorMessage={errorMessage}
          statusCode={statusCode}
          dispatchMakeRequest={this.props.dispatchMakeRequest} 
        />
      )
    })

    return (
      <div className="container">
        <div className="site-listing">
          <h1>Site listing project</h1>
          <p className="site-listing__waiting">Time spent waiting: {timeWaiting}</p>
          <button 
            className="openModal"
            onClick={this.props.toggleModal}>See unique headers</button>
          {contents}
          <PaginationFooter />
        </div>
        <HeadersModal 
          open={this.props.modalOpen}
          toggleModal={this.props.toggleModal}
          headers={this.props.headers} />
      </div>
    )
  }
}

SiteListing.propTypes = {
  sites: PropTypes.object
};


export default SiteListing;

function getTimeWaiting(timingState) {
  if(timingState.timeend !== null) {
    // convert to moment and render to seconds
    return moment(timingState.timeend).diff(moment(timingState.timestart), "s") + " seconds";
  } else {
    return "..."
  }
}