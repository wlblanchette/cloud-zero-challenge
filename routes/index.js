var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log("got data", req.app.get('sites-data'))
  var page = req.query.page;
  console.log("queries", req.query)

  var paginatedData = getPaginatedData(page, req.app.get('sites-data'))
  res.render('index', { 
    title: 'Express',
    sites: paginatedData
  });
});

module.exports = router;

function getPaginatedData(page = 0, data) {
  var results = [],
      amountPerPage = 50;

  results = data.slice((page * amountPerPage), (page + 1 * amountPerPage))

  return results;
}

