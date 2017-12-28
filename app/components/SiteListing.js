import { makeRequest } from '../actions';
import React from 'react';
import PropTypes from 'prop-types';
import SiteItem from './SiteItem';
import PaginationFooter from './PaginationFooter';

var _debugHeader = "[SiteListing]:>> ";

class SiteListing extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var sites = Object.keys(this.props.sites);

    var contents = sites.map(site => {
      let propSite = this.props.sites[site];

      let siteIndex = propSite.siteIndex;
      let fetch_state = propSite.fetch_state;

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
          dispatchMakeRequest={this.props.dispatchMakeRequest} 
        />
      )
    })

    return (
      <div className="site-listing">
        <h1>Site listing project</h1>
        {contents}
        <PaginationFooter />
      </div>
    )
  }
}

SiteListing.propTypes = {
  sites: PropTypes.object
};

SiteListing.defaultProps = {
  sites: {
    ['https://google.com']: {
      siteIndex: 0,
      fetch_state: 'FETCHING'
    }
  }
};


export default SiteListing;