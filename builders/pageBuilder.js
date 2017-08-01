module.exports = function PageBuilder(id) {
  var campaign = {
    id: id,
  };

  this.getResult = function () {
    return campaign;
  };

  this.fillPageData = function (rawResponse) {
    campaign.name = rawResponse.name;
    campaign.city = rawResponse.location.city;
    campaign.video_posts = rawResponse.posts.data.filter(isVideoType);
  };

  this.fillFans = function (rawResponse) {
    var fansPerCountry = rawResponse.data[0].values[0].value;
    campaign.mostFansFrom = findKeyOfMaxValue(fansPerCountry);
  };

  this.fillStorytellers = function (rawResponse) {
    var storyellersPerCountry = rawResponse.data[0].values[0].value;
    campaign.mostStorytellersFrom = findKeyOfMaxValue(storyellersPerCountry);
  };

  function isVideoType(post) {
    return (post.type === 'video');
  }

  function findKeyOfMaxValue(object) {
    var max = 0;
    var keyForMaxValue = null;
    for (var property in object) {
      if (object.hasOwnProperty(property)) {
        if (object[property] > max) {
          max = object[property];
          keyForMaxValue = property;
        }
      }
    }

    return keyForMaxValue;
  }
};
