import { STATE } from '../constants'
import React from 'react';
import PropTypes from 'prop-types';

var _debugHeader = "[PaginationFooter]:>> ";

class PaginationFooter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var contents = [];
    var pageNumber = getPageNumber();
    var forwardHref = "/?page="+(pageNumber + 1);
    var backwardHref = "/?page="+(pageNumber - 1);

    // if it isn't the first page, show back button
    if(pageNumber > 0) {
      contents.push(
        <a className="pagination-footer__back" href={backwardHref}>
          <i className="fa fa-chevron-circle-left" aria-hidden="true"></i>
        </a>
      )
    }

    // always show the forward
    contents.push(
      <a className="pagination-footer__forward" href={forwardHref}>
        <i className="fa fa-chevron-circle-right" aria-hidden="true"></i>
      </a>
    )

    return (
      <div className="pagination-footer">
        <div className="row">
          {contents}
        </div>
      </div>
    )
  }
}


export default PaginationFooter;


function getPageNumber() {
  let query = location.search;

  if(query === '') {
    return 0
  }
  query = query.replace(/^\?/, "")
               .split('=');

  console.log(_debugHeader, "query", query)
  
  return Number(query[1])
}