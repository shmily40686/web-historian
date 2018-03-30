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
  console.log('REQUEST url: ', req.url, 'method', req.method);


  if (req.method === 'GET') {
    // var urls = archive.readListOfUrls((urls) => {
    //     archive.downloadUrls(urls);
    // });
    if (req.url.substring(0, 6) === '/?url=') {
      httpHelpers.getPageFile(res, req.url, (responseCode, data) => {
        //write headers
        //end response with data
        var headers = httpHelpers.headers;
        headers['Content-Type'] = 'text/html';
        res.writeHead(responseCode, httpHelpers.headers);      
        res.end(data);
      });

    } else {
      httpHelpers.serveAssets(res, req.url, (data) => {
        var headers = httpHelpers.headers;
        headers['Content-Type'] = mimeType[path.extname(req.url)];
        res.writeHead(200, httpHelpers.headers);      
        res.end(data);
      });
    }
    // if(req.url === '/' || !archive.isUrl(req.url)){ //in public folder
    // } else { //in archive sites folder
    // }
  } else if (req.method === 'POST'){
    if (req.url === '/') {
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
    }


  } else {
    res.end(archive.paths.list);
  }

};
