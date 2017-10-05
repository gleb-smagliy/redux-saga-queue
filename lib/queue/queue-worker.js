'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _callee;

var _reduxSaga = require('redux-saga');

var _effects = require('redux-saga/effects');

var _log = require('../log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/regeneratorRuntime.mark(_callee);

function _callee(queue) {
  var action, _ref, handler, args;

  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          (0, _log2.default)('started worker');

        case 1:
          if (!true) {
            _context.next = 20;
            break;
          }

          _context.next = 4;
          return (0, _effects.take)(queue.channel);

        case 4:
          action = _context.sent;

          (0, _log2.default)('taken ' + action.type);
          _context.next = 8;
          return (0, _effects.call)(queue.getActionHandler, action);

        case 8:
          _ref = _context.sent;
          handler = _ref.handler;
          args = _ref.args;
          _context.next = 13;
          return (0, _effects.call)(handler, action, args);

        case 13:
          (0, _log2.default)('processed ' + action.type);

          if (!queue.postCondition) {
            _context.next = 18;
            break;
          }

          _context.next = 17;
          return (0, _effects.take)(queue.postCondition);

        case 17:
          (0, _log2.default)('taken ' + queue.postCondition);

        case 18:
          _context.next = 1;
          break;

        case 20:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}