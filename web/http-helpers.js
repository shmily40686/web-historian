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
//callback input - data
exports.serveAssets = function(res, asset, callback) {
    var absPath;
    if (asset === '/') {
      absPath = archive.paths.siteAssets + '/index.html';
    } else {
      absPath = archive.paths.siteAssets + asset;
      // console.log(absPath);
    }
    // fs.readFile(absPath, 'utf8', (err, data) => {
    //   if (err) {
    //     res.end(404);
    //   } else {
    //     callback(data);
    //   }
    // });
    // } else { //if has file
    fs.readFile(absPath, 'utf8', (err, data) => {
      if (err) res.end(404);
      callback(data);
    });
    // } 
};

//url ex: "www.example.com"
//callback input - response code and (opt) data
//I: filename is like '?url=www.example.com'
exports.getPageFile = function(res, fileName, callback){
  /*
  if isUrlArchived is true for url,
    fs.readFile for url
  else 
    add url to list
    end response with 404
  */
  fileName = fileName.slice(6);
  archive.isUrlArchived(fileName, function(isArchived){
    if(isArchived){
      fs.readFile(archive.paths.archivedSites + '/' + fileName,'utf8',function(err,data){
        if (err) throw err;
        callback(200, data);
      })
    } else {
      archive.addUrlToList(fileName, function(){
        fs.readFile(archive.paths.siteAssets + '/' + 'loading.html','utf8',function(err,data){
          if (err) throw err;
          callback(404, data);
        });
        
  
        //res.end(404);
      })
    }
  })
}
// As you progress, keep thinking about what helper functions you can put here!
