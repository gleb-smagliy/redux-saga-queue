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
            _context.next = 19;
            break;
          }

          _context.next = 4;
          return (0, _effects.take)(queue.channel);

        case 4:
          action = _context.sent;

          (0, _log2.default)('taken ' + action.type);
          (0, _log2.default)('waiting for patterns: ' + JSON.stringify(queue.patterns));
          _context.next = 9;
          return (0, _effects.call)(queue.getActionHandler, action);

        case 9:
          _ref = _context.sent;
          handler = _ref.handler;
          args = _ref.args;
          _context.next = 14;
          return (0, _effects.call)(handler, action, args);

        case 14:
          _context.next = 16;
          return (0, _effects.call)(_reduxSaga.delay, 0);

        case 16:
          (0, _log2.default)('processed ' + action.type);

          // if(queue.postCondition)
          // {
          //   log(`waiting for postCondition ${queue.postCondition}`);
          //   yield take(queue.postCondition);
          //   log(`reached postCondition ${queue.postCondition}`);
          // }
          _context.next = 1;
          break;

        case 19:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}