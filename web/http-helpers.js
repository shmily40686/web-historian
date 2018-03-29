var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
//var url = require('url');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

//asset === file path
exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

    //diff content headers
    if (asset === '/') {
      var absPath = archive.paths.siteAssets + '/index.html';
      fs.readFile(absPath, 'utf8', (err, data) => {
        if (err) {
          res.end(404);
        } else {
          callback(data);
        }
      });
    } else if (path.extname(asset) !== '') { //if has file

      var absPath = archive.paths.siteAssets + asset;
      fs.readFile(absPath, 'utf8', (err, data) => {
        if (err) {
          res.end(404);
        } else {
          callback(data);
        }
      });

    }
  /*
  create diff content headers for diff files
  fs.readFile
  */
};



// As you progress, keep thinking about what helper functions you can put here!
