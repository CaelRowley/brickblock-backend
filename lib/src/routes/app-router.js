"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _router = _interopRequireDefault(require("./healthcheck/router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addRouters = function addRouters(app) {
  app.use(_router.default);
};

var _default = addRouters;
exports.default = _default;