'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('./take-queued/index');

Object.defineProperty(exports, 'takeQueued', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

var _queue = require('./queue');

Object.defineProperty(exports, 'startQueue', {
  enumerable: true,
  get: function get() {
    return _queue.startQueue;
  }
});
Object.defineProperty(exports, 'Queue', {
  enumerable: true,
  get: function get() {
    return _queue.Queue;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }