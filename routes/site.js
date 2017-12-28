var express = require('express');
var request = require('request');
var _ = require('lodash');

var router = express.Router();
var _debugHeader = "[sites route]:>> ";

// proxy the test request
router.get('/', function(req, res, next) {
  var url = req.query.url;
  console.log(_debugHeader, "url", url)

  getSiteResponse("http://"+url).then(result => {
    res.send(JSON.stringify(result))
  }).catch(error => {
    console.log(_debugHeader, "error", error)
    res.status(500).send("error")
  })
});

module.exports = router;

function getSiteResponse(siteUrl) {
  return new Promise((resolve, reject) => {
    var options = {
      uri: siteUrl,
      method: 'GET',
      timeout: 7000,
      followRedirect: true,
      maxRedirects: 5,
    }

    request(options, (error, response, body) => {
      if(error) {
        console.log(error)
        var statusCode = (response ? response.statusCode : null) || 500;

        if(error.code === 'ENOTFOUND') statusCode = 404

        resolve({
          error: error,
          statusCode: statusCode,
          success: false,
        })
      } else {
        resolve({
          error: null,
          statusCode: response.statusCode,
          headers: response.headers,
          success: true,
        })
      }

    })
  })
}