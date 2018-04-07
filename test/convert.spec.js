
'use strict';

var expect = require('chai').expect;
var convert = require('../src/convert');

describe('convert', function() {
  var heading = '[Script Info]\n' +
    'Title: Built By https://github.com/padraigfl\n' +
    'Original Script: Likely Someone Else\n' +
    'ScriptType: v4.00\n';
  var style = '[V4 Styles]\n' +
    'Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, TertiaryColour, BackColour,' +
    'Bold, Italic, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, AlphaLevel, Encoding\n' +
    'Style: primary, Tahoma, 24, 16777215, 00000000, 00000000, 00000000, 0, 0, 1, 1, 0, 2, 30, 30, 10, 0, 0\n' +
    'Style: secondary, Tahoma, 18, 16777215, 00000000, 00000000, 00000000, 0, 0, 1, 1, 0, 2, 30, 30, 10, 0, 0\n';

  var dialoguePrefix1 = 'Dialogue: Marked=0,';
  var dialoguePrefix2 = 'NTP,0000,0000,0000,!Effect,';

  var obj = [
    { id: 1, startTime: 72833, endTime: 79000, text: 'ASDFGHJKL\\nASDFGHJKL' },
    { id: 2, startTime: 102458, endTime: 109417, text: 'Sfheee idjfhsa' },
    { id: 3, startTime: 115708, endTime: 117750, text: 'Oooops', secondaryText: 'secondary' },
  ];

  // it('secondsToSsaTime', function() {
  //   expect(convert.msecToSsaTime(3901560)).to.equal('01:05:01.56');
  //   expect(convert.msecToSsaTime(7421501)).to.equal('02:03:41.50');
  // });
  // it('buildHeading', function() {
  //   expect(convert.buildHeading()).to.equal(heading);
  // });
  // it('buildText', function() {
  //   expect(convert.buildText(obj[0].text)).to.equal(
  //     obj[0].text[0]+'\\n'+obj[0].text[1]
  //   );
  // });
  // it('buildText with custom linesplit', function() {
  //   expect(convert.buildText(obj[0].text, '|')).to.equal(
  //     obj[0].text[0]+'|'+obj[0].text[1]
  //   );
  // });
  // it('buildDialogue', function() {
  //   expect(convert.buildDialogue(convert.buildText(obj[0].text), obj[0].start, obj[0].end, style)).to.equal(
  //     dialoguePrefix1 + '00:01:12.83,00:01:19.00,'+ style + ',' + dialoguePrefix2 + obj[0].text[0] + '\\n' + obj[0].text[1] + '\n'
  //   );
  // });
  // it('build dialogue with secondary subs', function() {
  //   expect(convert.subToSsa(obj[2])).to.equal(
  //     dialoguePrefix1 + '00:01:55.70,00:01:57.75,primary,' + dialoguePrefix2 + obj[2].text[0] + '\n' +
  //     dialoguePrefix1 + '00:01:55.70,00:01:57.75,secondary,' + dialoguePrefix2 + obj[2].secondaryText[0] + '\n'
  //   );
  // });
  it('subArrayToSsa', function() {
    expect(convert(obj)).to.equal(
      heading + '\n' + style + '\n' + '[Events]\n' +
      'Format: Marked, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text' + '\n' +
      dialoguePrefix1 + '00:01:12.83,00:01:19.00,primary,' + dialoguePrefix2 + obj[0].text +  '\n' +
      dialoguePrefix1 + '00:01:42.45,00:01:49.41,primary,' + dialoguePrefix2 + obj[1].text + '\n' +
      dialoguePrefix1 + '00:01:55.70,00:01:57.75,primary,' + dialoguePrefix2 + obj[2].text + '\n' +
      dialoguePrefix1 + '00:01:55.70,00:01:57.75,secondary,' + dialoguePrefix2 + obj[2].secondaryText + '\n\n'
    );
  });
});
