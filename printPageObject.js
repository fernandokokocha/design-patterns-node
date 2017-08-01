require('rootpath')();
var GetPageObject = require('services/getPageObject');

new GetPageObject().run('rstit').then(console.log);
