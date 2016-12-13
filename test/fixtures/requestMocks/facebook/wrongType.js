require('rootpath')();
var nock = require('nock');
var config = require('config/config');

const DEFAULT_RESPONSE = {
  name: 'Mark Zuckerberg',
  link: 'https://www.facebook.com/app_scoped_user_id/4/',
  id: '4',
};

module.exports = function (id, path, query, response) {
  if (!response) {
    response = DEFAULT_RESPONSE;
  }

  query.access_token = config.FB_TOKEN;

  return nock('https://graph.facebook.com:443', { encodedQueryParams: true })
    .get(path)
    .query(query)
    .reply(200, response);
};
