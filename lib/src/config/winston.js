"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _winston = _interopRequireDefault(require("winston"));

var _appRootPath = _interopRequireDefault(require("app-root-path"));

require("winston-daily-rotate-file");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var format = _winston.default.format;
var printFormat = format.printf(function (info) {
  var timestamp = info.timestamp,
      level = info.level,
      message = info.message,
      args = _objectWithoutProperties(info, ["timestamp", "level", "message"]);

  return "".concat(timestamp, " [").concat(level, "]: ").concat(message, " ").concat(Object.keys(args).length ? JSON.stringify(args, null, 2) : '');
});
var enumerateErrorFormat = format(function (info) {
  if (info.message instanceof Error) {
    info.message = Object.assign({
      // eslint-disable-line no-param-reassign
      message: "".concat(info.message.message, "\n").concat(info.message.stack)
    }, info.message);
  }

  if (info instanceof Error) {
    return Object.assign({
      message: "".concat(info.message, "\n").concat(info.stack)
    }, info);
  }

  return info;
});

var logger = _winston.default.createLogger({
  format: format.combine(enumerateErrorFormat(), format.json(), format.align(), format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss.SSS ZZ'
  })),
  transports: [new _winston.default.transports.Console({
    level: process && process.env && process.env.LOG_LEVEL_CONSOLE || "error",
    format: format.combine(format.colorize(), printFormat),
    handleExceptions: true
  }), new _winston.default.transports.DailyRotateFile({
    level: process && process.env && process.env.LOG_LEVEL_FILE || "error",
    dirname: "".concat(_appRootPath.default, "/logs/"),
    filename: '%DATE%-brickblock-backend.log',
    maxsize: '5m',
    maxFiles: 20,
    tailable: true,
    handleExceptions: true,
    zippedArchive: true
  })],
  exitOnError: false
});

var _default = logger;
exports.default = _default;