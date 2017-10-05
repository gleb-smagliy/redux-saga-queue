'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var debug = false;

exports.default = function () {
  var _console;

  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return debug ? (_console = console).log.apply(_console, ['redux-saga-queue:'].concat(args)) : undefined;
};