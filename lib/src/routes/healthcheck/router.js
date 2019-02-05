"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _routeService = _interopRequireDefault(require("../../services/healthcheck/route-service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.get('/', function (req, res) {
  res.send((0, _routeService.default)());
});
var _default = router;
exports.default = _default;