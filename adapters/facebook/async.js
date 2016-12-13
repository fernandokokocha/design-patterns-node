require('rootpath')();
var FB = require('fb');
var config = require('config/config');

module.exports = function FacebookAdapter() {
  FB.options({ version: 'v2.8' });
  FB.setAccessToken(config.FB_TOKEN);

  this.fetch = function (pathname, options) {
    return new Promise(
      function (resolve, reject) {
        FB.api(
          pathname,
          'get',
          options,
          function (response) {
            if (!response) {
              reject('Error occurred');
            }

            if (response.error) {
              reject(response.error.message);
            }

            resolve(response);
          }
        );
      }
    );
  };
};
