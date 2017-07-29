### Service objects for Node.js - example

#### Setup

`npm install`

If you want to use the service in real life, copy `config/example.config.js` to `config/config.js` and fill in the fields with real data.

`npm start` or whatever you want to run the server locally (nodemon?). Entry point is `index.js`.

#### Tests

`npm run test:unit` for unit tests

`npm run test:integration` for integration tests

`npm run test:fake` for tests using fake facebook adapter


#### Code style

`npm run style:check` - to only check errors

`npm run style:fix` - to fix what can be fixed