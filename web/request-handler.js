var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var httpHelpers = require('./http-helpers');

var mimeType = {
  '.html': 'text/html',
  '.css' : 'text/css',
  '.js' : 'text/javascript',
  '.jpeg' : 'image/jpeg',
  '.png' : 'image/png',
  '.ico' : 'image/x-icon'
};

exports.handleRequest = function (req, res) {
  // res.writeHead (httpHelpers.headers);
  //if req is GET
    //httpHelpers.serveAssets
  if (req.method === 'GET') {
    httpHelpers.serveAssets(res, req.url, (data) => {
      // console.log('serveAssets callback: ', data);
      var headers = httpHelpers.headers;
      headers['Content-Type'] = mimeType[path.extname(req.url)];
      // console.log(mimeType[path.extname(req.url)]);
       res.writeHead(200, httpHelpers.headers);      
      res.end(data);
    });
  } else if (req.method === 'POST'){
    // res.on('data', function (body) {
    //     console.log("data");
    //     response += body;
    // });

    // res.on('end', function () { 
    //     console.log("end");
    //     response = "";
    // });
    res.writeHead(201,httpHelpers.headers);
    res.end();
  } else {
    res.end();
  }
  
  // res.end(archive.paths.list);
};
