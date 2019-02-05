"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _routeService = _interopRequireDefault(require("../../../src/services/healthcheck/route-service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-vars, no-undef */
var should = _chai.default.should();

var healthCheckResponse = 'Health check!';
describe('Services: healthcheck', function () {
  context('routeService.healthcheck()', function () {
    it("should return \"".concat(healthCheckResponse, "\""), function () {
      (0, _routeService.default)().should.equal(healthCheckResponse);
    });
  });
});