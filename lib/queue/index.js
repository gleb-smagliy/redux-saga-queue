'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Queue = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.startQueue = startQueue;

var _effects = require('redux-saga/effects');

var _reduxSaga = require('redux-saga');

var _queueWorker = require('./queue-worker');

var _queueWorker2 = _interopRequireDefault(_queueWorker);

var _log = require('../log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/regeneratorRuntime.mark(startQueue);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var INITIAL_BUFFER_SIZE = 50;

var Queue = exports.Queue = function () {
  function Queue(_ref) {
    var postCondition = _ref.postCondition;

    _classCallCheck(this, Queue);

    this.getActionHandler = this.getActionHandler.bind(this);
    this.isMatch = this.isMatch.bind(this);
    this.checkAction = this.checkAction.bind(this);
    this.addPattern = this.addPattern.bind(this);
    this.postCondition = postCondition;

    this.patterns = {};
    (0, _log2.default)('creating Queue');
  }

  _createClass(Queue, [{
    key: 'addPattern',
    value: function addPattern(actionType, handler, args) {
      this.patterns[actionType] = { handler: handler, args: args };
    }
  }, {
    key: 'getActionHandler',
    value: function getActionHandler(action) {
      this.checkAction(action);

      return this.patterns[action.type];
    }
  }, {
    key: 'isMatch',
    value: function isMatch(action) {
      this.checkAction(action);

      return Object.keys(this.patterns).indexOf(action.type) !== -1;
    }
  }, {
    key: 'checkAction',
    value: function checkAction(action) {
      if (!action.type) {
        throw new Error("Expected action to have a type field");
      }
    }
  }]);

  return Queue;
}();

function startQueue(queue) {
  var buffer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _reduxSaga.buffers.expanding(INITIAL_BUFFER_SIZE);
  return regeneratorRuntime.wrap(function startQueue$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          (0, _log2.default)('calling startQueue');
          _context.next = 3;
          return (0, _effects.actionChannel)(queue.isMatch, buffer);

        case 3:
          queue.channel = _context.sent;
          _context.next = 6;
          return (0, _effects.fork)(_queueWorker2.default, queue);

        case 6:
          queue.worker = _context.sent;

        case 7:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
};