'use strict';

var expect = require('chai').expect;
var parse = require('../src/parse');
var fs = require('fs');

function readFile(filename) {
  return fs.readFileSync(filename, 'utf8', function(err, data) {
    if (err) throw err;
    return data;
  });
}

describe('parse', function() {
  // it('parseLine', function() {
  //   var line = 'Dialogue: Marked=0,00:01:12.83,00:01:19.00,HardDefault,NTP,0000,0000,0000,!Effect,TestStuff, TestAgain';
  //   expect(parse.parseLine('dialogue', line))
  //     .to.deep.equal(
  //       [
  //         'Marked=0', '00:01:12.83', '00:01:19.00',
  //         'HardDefault', 'NTP', '0000', '0000',
  //         '0000', '!Effect', 'TestStuff', 'TestAgain',
  //       ]
  //     );
  // });

  it('ssaTimeToSeconds', function() {
    expect(parse.ssaTimeToMsec('01:01:01.01')).to.equal(3661010);
  });

  // it('stripHeading', function() {
  //   var file = readFile('./test/dummySubs/3Lines.ssa');
  //   var strippedLines = parse.stripHeading(file);

  //   expect(strippedLines[0]).to.equal('Format: Marked, Start, End, Style, Name, MarginL, MarginR, MarginV, PrimaryEffect, Text');
  //   expect(strippedLines[1]).to.equal('Dialogue: Marked=0,00:01:12.83,00:01:19.00,HardDefault,NTP,0000,0000,0000,!Effect,TestStuff, TestAgain');
  // });

  it('parsesSsa', function() {
    var expected = [
      { id: 1, startTime: 72830, endTime: 79000, text: 'TestStuff, TestAgain' },
      { id: 2, startTime: 102460, endTime: 109420, text: '(testing parentheses)' },
      { id: 3, startTime: 115710, endTime: 117750, text: 'TESTS IN CAPS' },
    ];
    var file = readFile('./test/dummySubs/3Lines.ssa');

    expect(parse.parseSsa(file)).to.deep.equal(expected);
  });


  it('parsesSsa with inline styles', function() {
    var expected = [
      { id: 1, startTime: 47100, endTime: 49100, text: 'asdfsadf sdsaada sdsd a Red blue green karaokeRed blue green karaoke' },
    ];
    var file = readFile('./test/dummySubs/inlineStyle.ssa');

    expect(parse.parseSsa(file, true)).to.deep.equal(expected);
  });

});
