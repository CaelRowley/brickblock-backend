"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _http = _interopRequireDefault(require("http"));

var _winston = _interopRequireDefault(require("./config/winston"));

var _appRouter = _interopRequireDefault(require("./routes/app-router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();

var server = _http.default.createServer(app);

(0, _appRouter.default)(app);
var port = process && process.env && process.env.PORT || "8000";
server.listen(port, function () {
  _winston.default.debug("Server be jammin' on http://localhost:".concat(port, "!"));
});
var _default = app;
exports.default = _default;