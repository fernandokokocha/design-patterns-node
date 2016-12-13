var nock = require('nock');

module.exports = function () {
  nock.recorder.rec({
    logging: function (content) {
      console.log(content);
    },
  });
};
