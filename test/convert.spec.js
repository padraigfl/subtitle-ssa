
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
    { start: 72833, end: 79000, text: 'ASDFGHJKL\\nASDFGHJKL' },
    { start: 102458, end: 109417, text: 'Sfheee idjfhsa' },
    { start: 115708, end: 117750, text: 'Oooops', secondaryText: 'secondary' },
  ];
  var onlySecondaryNoArray = { start: 115708, end: 117750, secondaryText: 'secondary' };

  var expectedEvents = '[Events]\n' +
    'Format: Marked, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text' + '\n' +
    dialoguePrefix1 + '00:01:12.83,00:01:19.00,primary,' + dialoguePrefix2 + obj[0].text +  '\n' +
    dialoguePrefix1 + '00:01:42.45,00:01:49.41,primary,' + dialoguePrefix2 + obj[1].text + '\n' +
    dialoguePrefix1 + '00:01:55.70,00:01:57.75,primary,' + dialoguePrefix2 + obj[2].text + '\n' +
    dialoguePrefix1 + '00:01:55.70,00:01:57.75,secondary,' + dialoguePrefix2 + obj[2].secondaryText + '\n\n';

  it('secondsToSsaTime', function() {
    expect(convert.msecToSsaTime(3901560)).to.equal('01:05:01.56');
    expect(convert.msecToSsaTime(7421501)).to.equal('02:03:41.50');
  });
  it('buildHeading', function() {
    expect(convert.buildHeading()).to.equal(heading);
  });
  it('buildDialogue', function() {
    expect(convert.buildDialogue(obj[0].text, obj[0].start, obj[0].end, style)).to.equal(
      dialoguePrefix1 + '00:01:12.83,00:01:19.00,'+ style + ',' + dialoguePrefix2 + obj[0].text +'\n'
    );
  });
  it('build dialogue with secondary subs', function() {
    expect(convert.subToSsa(obj[2])).to.equal(
      dialoguePrefix1 + '00:01:55.70,00:01:57.75,primary,' + dialoguePrefix2 + obj[2].text + '\n' +
      dialoguePrefix1 + '00:01:55.70,00:01:57.75,secondary,' + dialoguePrefix2 + obj[2].secondaryText + '\n'
    );
  });
  it('build dialogue with no text returns empty string', function() {
    expect(convert.buildDialogue(undefined, obj[0].start, obj[0].end, style)).to.equal(
      ''
    );
  });
  it('subArrayToSsa', function() {
    expect(convert.toSsa(obj)).to.equal(
      heading + '\n' + style + '\n' + expectedEvents
    );
  });
  it('subArrayToSsa with custom fields', function() {
    var styleString = 'styles';
    var headString = 'head';
    expect(convert.toSsa(obj, styleString)).to.equal(
      heading + '\n' + styleString + '\n' + expectedEvents
    );
    expect(convert.toSsa(obj, styleString, headString)).to.equal(
      headString + '\n' + styleString + '\n' + expectedEvents
    );
    expect(convert.toSsa(obj, false, headString)).to.equal(
      headString + '\n' + style + '\n' + expectedEvents
    );
  });
  it('handles single sub object, only secondary sub', function(){
    expect(convert.toSsa(onlySecondaryNoArray)).to.equal(
      heading+ '\n' + style + '\n' + '[Events]\n' +
      'Format: Marked, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text' + '\n' +
      dialoguePrefix1 + '00:01:55.70,00:01:57.75,secondary,' + dialoguePrefix2 + obj[2].secondaryText + '\n\n'
    );
  });
});
