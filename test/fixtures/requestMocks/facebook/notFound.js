require('rootpath')();
var nock = require('nock');
var config = require('config/config');

const DEFAULT_RESPONSE = {
  error: {
    message: '(#803) Some of the aliases you requested do not exist: -1',
    type: 'OAuthException',
    code: 803,
    fbtrace_id: 'FndCuSJHV9c',
  },
};

module.exports = function (id, path, query, response) {
  if (!response) {
    response = DEFAULT_RESPONSE;
  }

  query.access_token = config.FB_TOKEN;

  return nock('https://graph.facebook.com:443', { encodedQueryParams: true })
    .get(path)
    .query(query)
    .reply(404, response);
};
