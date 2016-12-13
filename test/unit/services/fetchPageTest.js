require('rootpath')();
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;
var FetchPage = require('services/fetchPage');
var pageMocks = require('test/fixtures/requestMocks/page');

describe('FetchPage', function () {
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

  it('returns page data for numeric page id', function () {
    var pageId = '492672064193149';
    pageMocks.success(pageId);
    return expect(new FetchPage().run(pageId))
      .to.eventually.become(expected);
  });

  it('returns page data for alphanumeric page id', function () {
    var pageId = 'rstit';
    pageMocks.success(pageId);
    return expect(new FetchPage().run(pageId))
      .to.eventually.become(expected);
  });

  it('gets rejected for person id', function () {
    var markId = '4';
    pageMocks.wrongType(markId);
    return expect(new FetchPage().run(markId))
      .to.be.rejectedWith('Non-page object provided');
  });

  it('gets rejected for invalid id', function () {
    var invalidId = '-1';
    pageMocks.notFound(invalidId);
    return expect(new FetchPage().run(invalidId))
      .to.be.rejectedWith('(#803) Some of the aliases you requested do not exist: -1');
  });
});
