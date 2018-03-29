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
    // console.log(req.url);
  if (req.method === 'GET') {
    if(req.url === '/' || path.extname(req.url) !== ''){ //in public folder
      console.log(req.url);
      httpHelpers.serveAssets(res, req.url, (data) => {
        var headers = httpHelpers.headers;
        headers['Content-Type'] = mimeType[path.extname(req.url)];
        res.writeHead(200, httpHelpers.headers);      
        res.end(data);
      });
    } else { //in archive sites folder
      // console.log('url:',req.url.slice(1));
      httpHelpers.getPageFile(res, req.url, archive.paths.archivedSites, (responseCode, data) => {
        //write headers
        //end response with data
        var headers = httpHelpers.headers;
        headers['Content-Type'] = 'text/html';
        res.writeHead(responseCode, httpHelpers.headers);      
        res.end(data);

      });
    }
  } else if (req.method === 'POST'){
    var body = '';
    req.on('data', function (chunk) {
        body += chunk;
    });
    req.on('end', function () { 
        archive.addUrlToList(body.slice(4), () => {
          res.writeHead(302,httpHelpers.headers);
          res.end();
        });                    
    });

  } else {
    res.end(archive.paths.list);
  }

};
