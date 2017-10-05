'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _log = require('../log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/regeneratorRuntime.mark(takeQueued);

function takeQueued(queue, pattern, saga) {
  for (var _len = arguments.length, args = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }

  return regeneratorRuntime.wrap(function takeQueued$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          (0, _log2.default)('calling takeQueued for \'' + pattern + '\'');

          queue.addPattern(pattern, saga, args);

          return _context.abrupt('return', queue.worker);

        case 3:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}

exports.default = takeQueued;