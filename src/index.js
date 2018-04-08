'use strict';

var parse = require('./parse');
var convert = require('./convert');

module.exports = {
  fromSsa: parse.parseSsa,
  toSsa: convert,
  toMS: parse.ssaTimeToMsec,
  toSsaTime: convert.msecToSsaTime,
};
