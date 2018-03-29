var fs = require('fs');
var path = require('path');
var _ = require('underscore');

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
  //console.log('BELINDA', exports.paths.list);
  fs.readFile(exports.paths.list, 'utf8', (err, data) => {
    if (err) throw err;
    var urls = data.split('\n');
    callback(urls);

  });
  //fs.readFile()
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls((urls) => {
    callback(urls.includes(url));
  });
};

exports.addUrlToList = function(url, callback) {
  // var list = exports.path.list;
  exports.readListOfUrls((urls) => {
    //edit data
    // console.log(urls);
    if (!urls.includes(url)) {
      console.log('reached here');
      var data = urls.join('\n') + '\n' + url;
      fs.writeFile(exports.paths.list, data, 'utf8', function(err) {
        if (err) throw err;
        exports.readListOfUrls((urls) => console.log(urls));
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
    //get request from web
    fs.writeFile(exports.paths.archivedSites + '/' + url, 'testtesttest', 'utf8', function(err) {
      if (err) throw err;
    });
  });

  exports.getUrlFile = function(url, callback) {

  };

};
