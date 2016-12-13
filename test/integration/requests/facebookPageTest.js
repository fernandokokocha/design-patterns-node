require('rootpath')();
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

var expect = chai.expect;
var config = require('config/config');
var pageMocks = require('test/fixtures/requestMocks/page');

var app = require('index');

var endpoint = '/facebook/page/';

describe(endpoint, function () {
  var expected = {
    name: 'RST Software House',
    city: 'Wroclaw',
    video_posts: [
      {
        id: '492672064193149_970677793059238',
        message: "We've just joined action #BECIAKI and supported Ania Tułecka financially in her fight against cancer.\n\nNow we'd like to invite our partners RST Software Masters, Publicon and Trans.eu System Polska to take action as well. Krzysztof, Szymon, Piotr - it's your turn. We count on you!",
        type: 'video',
      },
    ],
  };

  it('successfully returns page data for numeric page id', function (done) {
    var pageId = '492672064193149';
    var facebookRequest = pageMocks.success(pageId);

    chai.request(app)
      .get(endpoint + pageId)
      .end(function (err, response) {
        expect(facebookRequest.isDone()).to.be.true;
        expect(response).to.have.status(200);
        expect(response.res.body).to.deep.equal(expected);
        done();
      });
  });

  it('successfully returns page data for alphanumeric page id', function (done) {
    var pageId = 'rstit';
    var facebookRequest = pageMocks.success('rstit');

    chai.request(app)
      .get(endpoint + pageId)
      .end(function (err, response) {
        expect(facebookRequest.isDone()).to.be.true;
        expect(response).to.have.status(200);
        expect(response.res.body).to.deep.equal(expected);
        done();
      });
  });

  it('fails with 422 for person id', function (done) {
    var markId = '4';
    var facebookRequest = pageMocks.wrongType(markId);

    chai.request(app)
      .get(endpoint + markId)
      .end(function (err, response) {
        expect(facebookRequest.isDone()).to.be.true;
        expect(response).to.have.status(422);
        expect(response.res.body).to.have.property('error', 'Non-page id provided');
        done();
      });
  });

  it('fails with 404 for invalid id', function (done) {
    var invalidId = '-1';
    var facebookRequest = pageMocks.notFound(invalidId);

    chai.request(app)
      .get(endpoint + invalidId)
      .end(function (err, response) {
        expect(facebookRequest.isDone()).to.be.true;
        expect(response).to.have.status(404);
        expect(response.res.body).to.have.property('error', 'Page not found');
        done();
      });
  });
});
