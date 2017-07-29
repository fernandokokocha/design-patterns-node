require('rootpath')();
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

var expect = chai.expect;
var config = require('config/config');

var app = require('index');

var endpoint = '/facebook/page/';

var facebookAdapter = require('adapters/facebook/facebookAdapter');

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

    it('returns expected value', function (done) {
        facebookAdapter.clear();
        var pageId = '492672064193149';

        chai.request(app)
            .get(endpoint + pageId)
            .end(function (err, response) {
                expect(response).to.have.status(200);
                expect(response.res.body).to.deep.equal(expected);
                expect(facebookAdapter.requestSent).to.have.length(1);
                expect(facebookAdapter.requestSent[0]).to.equal(pageId);
                done();
              });
      });
  });
