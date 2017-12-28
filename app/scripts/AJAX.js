import Promise from 'bluebird'

export default function AJAX(config) {
  var {method, url, data} = config;
  
  return new Promise((resolve, reject) => {
    var options = {
      method: method,
      url: url,
      beforeSend: function(request) {
        request.setRequestHeader("Accept", "application/json")
      },
      statusCode: {
        200: (response) => resolve({
          success: true, 
          response
        })
      },
      error: function(response) {
        resolve({
          success: false, 
          response
        });
      }
    }

    // data is optional param
    try {
      if(data) options.data = { json: JSON.stringify(data) }
    } catch(e) {
      console.log(e)
      resolve([false, e])
    }
    
    // console.log("AJAX options", options);
    $.ajax(options)
  }).catch(e => console.log(e))
}