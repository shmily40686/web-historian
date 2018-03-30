var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

//returns array
exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf8', (err, data) => {
    if (err) throw err;
    var urls = data.split('\n');
    callback(urls);
  });
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls((urls) => {
    callback(urls.includes(url));
  });
};

// exports.isUrl = function(str) {
//   return str.includes('www.') || str.includes('http://') || str.includes('https://');
// }

exports.addUrlToList = function(url, callback) {
  // var list = exports.path.list;
  exports.readListOfUrls((urls) => {
    //edit data
    if (!urls.includes(url)) {
      var data = urls.join('\n') + url + '\n';
      console.log(data);
      fs.writeFile(exports.paths.list, data, 'utf8', function(err) {
        if (err) throw err;
        callback();
      });    
    } else {
      callback();
    }

  });

};

exports.isUrlArchived = function(url, callback) {
    fs.readdir(exports.paths.archivedSites, (err, files) => {
      if (err) throw err;
      callback(files.includes(url));
    });
};

exports.downloadUrls = function(urls) {
  /*
  for each url,
    create file in archivedSites directory
  */

  urls.forEach(url => {
        console.log('downloading urls', url);
    
    http.get('http://' + url, (res) => {

      if (res.statusCode === 200) {
        // var statusCode = res.statusCode;
        //var contentType = res.headers('content-type');

        var writeStream = fs.createWriteStream(exports.paths.archivedSites + '/' + url);
        res.pipe(writeStream);

        writeStream.on('error', (err) => {
          console.log(err);
        });
      }
      console.log(res);
    }).on('error', (e) => {
      console.error('Got error: ', e.message);
    });
    //get request from web
    //create write stream

    // fs.writeFile(exports.paths.archivedSites + '/' + url, `<html>
    // <head>
    // </head>
    // <body>
    // <div> hello </div>
    // </body>
    // </html>`, 'utf8', function(err) {
    //   if (err) throw err;
    // });
  });


};
