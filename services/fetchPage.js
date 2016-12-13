require('rootpath')();
var facebookAdapter = require('adapters/facebook/facebookAdapter');

module.exports = function FetchPage() {
  var that = this;
  that.resolve = null;
  that.reject = null;
  that.response = null;

  this.run = function (pageId) {
    return new Promise(
      function (resolve, reject) {
        that.resolve = resolve;
        that.reject = reject;
        fetchPageInfo(pageId).then(onSuccess, onFail);
      }
    );
  };

  function fetchPageInfo(pageId) {
    var pathname = pageId;
    var options = {
      fields: 'name,about,link,location,posts.limit(5).fields(message,type)',
    };
    return facebookAdapter.fetch(pathname, options);
  }

  function onSuccess(rawResponse) {
    that.response = rawResponse;
    validateResponse();
    that.resolve(parseResponse());
  }

  function onFail(error) {
    that.reject(error);
  }

  function validateResponse() {
    if (!that.response.name)
      that.reject('Non-page object provided');
    else if (!that.response.location || !that.response.location.city)
      that.reject('Non-page object provided');
    else if (!that.response.posts)
      that.reject('Non-page object provided');
  }

  function parseResponse() {
    return {
      name: that.response.name,
      city: that.response.location.city,
      video_posts: that.response.posts.data.filter(isVideoType),
    };
  }

  function isVideoType(post) {
    return (post.type === 'video');
  }
};
