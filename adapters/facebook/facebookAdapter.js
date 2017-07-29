require('rootpath')();
var Async = require('adapters/facebook/async');
var Fake = require('adapters/facebook/fake');

if (process.env.ENV == 'test') {
  global.__facebookAdapter = global.__facebookAdapter || new Fake();
} else {
  global.__facebookAdapter = global.__facebookAdapter || new Async();
}

module.exports = global.__facebookAdapter;
