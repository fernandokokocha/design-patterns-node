require('rootpath')();
var facebookAdapter = require('adapters/facebook/facebookAdapter');

module.exports = function FetchPageInsights() {
  var that = this;
  that.resolve = null;
  that.reject = null;
  that.response = null;

  this.run = function (pageId, metric) {
    return new Promise(
      function (resolve, reject) {
        that.resolve = resolve;
        that.reject = reject;
        fetchPageInsights(pageId, metric).then(onSuccess, onFail);
      }
    );
  };

  function fetchPageInsights(pageId, metric) {
    var pathname = pageId + '/insights/' + metric;
    var options = {};
    return facebookAdapter.fetch(pathname, options);
  }

  function onSuccess(rawResponse) {
    that.response = rawResponse;
    validateResponse();
    that.resolve(rawResponse);
  }

  function onFail(error) {
    that.reject(error);
  }

  function validateResponse() {
    if (!that.response.data)
      that.reject('Non-page object provided');
  }
};
