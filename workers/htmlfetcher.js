// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

var archive = require('./../helpers/archive-helpers');

(function() {
    var urls = archive.readListOfUrls((urls) => {
        archive.downloadUrls(urls);
    });
})();
