require('rootpath')();
var SuccessMock = require('test/fixtures/requestMocks/facebook/success');
var NotFoundMock = require('test/fixtures/requestMocks/facebook/notFound');
var WrongTypeMock = require('test/fixtures/requestMocks/facebook/wrongType');

module.exports = {

  success: function (id, response) {
    var data = pageRequests(id);
    return SuccessMock(id, data[0].path, data[0].query, response);
  },

  notFound: function (id, response) {
    var params = pageRequests(id);
    return NotFoundMock(id, params[0].path, params[0].query, response);
  },

  wrongType: function (id, response) {
    var params = pageRequests(id);
    return WrongTypeMock(id, params[0].path, params[0].query, response);
  },

};

function pageRequests(id) {
  var version = '/v2.8/';
  return [
    {
      path: version + id,
      query: {
        fields: 'name,about,link,location,posts.limit(5).fields(message,type)',
      },
    },
  ];
}
