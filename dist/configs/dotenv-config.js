'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = dotenvConfig;

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function dotenvConfig() {
  _dotenv2.default.config();
}