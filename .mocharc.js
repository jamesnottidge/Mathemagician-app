const chai = require('chai');
global.assert = chai.assert;

module.exports = {
    require: ['@babel/register'],
    recursive: true
};