"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _supertest = _interopRequireDefault(require("supertest"));

var _app = _interopRequireDefault(require("../../../src/app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-vars, no-undef */
var should = _chai.default.should();

describe('Routes: healthcheck', function () {
  context('GET /', function () {
    it('should respond with a HTTP 200 OK', function (done) {
      (0, _supertest.default)(_app.default).get('/').end(function (err, res) {
        res.statusCode.should.equal(200);
        done();
      });
    });
  });
});