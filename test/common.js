global.chai = require('chai');
global.assert = chai.assert;
global.expect = chai.expect;
chai.should();
chai.config.includeStack = true;

process.env.NODE_ENV = 'test';

// Include common modules from your application that will be used among multiple test suites.
// global.myModule = require('../app/myModule');