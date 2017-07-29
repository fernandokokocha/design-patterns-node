require('rootpath')();

module.exports = function FacebookAdapter() {
  var that = this;
  var exampleResponse = {
      name: 'RST Software House',
      location: {
          city: 'Wroclaw',
          country: 'Poland',
        },
      posts: {
          data: [
              {
              message: "We've just joined action #BECIAKI and supported Ania Tułecka financially in her fight against cancer.\n\nNow we'd like to invite our partners RST Software Masters, Publicon and Trans.eu System Polska to take action as well. Krzysztof, Szymon, Piotr - it's your turn. We count on you!",
              type: 'video',
              id: '492672064193149_970677793059238',
            },
          ],
        },
    };

  this.requestSent = [];

  this.clear = function () {
      that.requestSent = [];
    };

  this.fetch = function (pathname, options) {
      that.requestSent.push(pathname);
      return new Promise(
          function (resolve, reject) {
            resolve(exampleResponse);
          }
      );
    };
};
