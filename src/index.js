'use strict';

var parse = require('./parse');
var convert = require('./convert');

module.exports = {
  parse: parse.parseSsa,
  stringify: convert.toSsa,
  toMS: parse.ssaTimeToMsec,
  toSsaTime: convert.msecToSsaTime,
};
