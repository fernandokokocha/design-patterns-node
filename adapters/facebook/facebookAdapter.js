require('rootpath')();
var Async = require('adapters/facebook/async');

global.__facebookAdapter = global.__facebookAdapter || new Async();

module.exports = global.__facebookAdapter;
