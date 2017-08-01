require('rootpath')();
var PageBuilder = require('builders/pageBuilder');
var facebookAdapter = require('adapters/facebook/facebookAdapter');

var FetchPage = require('services/fetchPage');
var FetchPageInsights = require('services/fetchPageInsights');

module.exports = function GetPageObject() {
  var that = this;

  this.run = function (pageId) {
    var builder = new PageBuilder(pageId);

    var fetchingPromises = [
      new FetchPage().run(pageId)
        .then(builder.fillPageData),
      new FetchPageInsights().run(pageId, 'page_fans_country')
        .then(builder.fillFans),
      new FetchPageInsights().run(pageId, 'page_storytellers_by_country')
        .then(builder.fillStorytellers),
    ];

    return new Promise(
      function (resolve, reject) {
        Promise.all(fetchingPromises).then(
          function () { resolve(builder.getResult()); },

          function (error) { reject(error); }
        );
      }
    );
  };
};
