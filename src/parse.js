'use strict';

function ssaTimeToMsec(ssaTime) {
  var scale = [60 * 60 * 1000, 60 * 1000, 1000, 10];

  return ssaTime.split(/[:.]/g)
    .map(function (time) {
      return parseInt(time);
    })
    .reduce(function (acc, t, i) {
      return acc + t * scale[i];
    }, 0);
}

function cleanFile(data) {
  return data.replace(/^\s+|\s+$/g, '');
}

// TODO improve handling of multiline breaks which occur in events
function stripHeading(ssaFile) {
  var eventsSection = ssaFile.split(/[\r\n]{4,}|\n{2,}/).slice(2)
    .join('\n');

  eventsSection = eventsSection
    .split(/[\n\s]*\[\s*Events\s*\][\n\s]*/i)
    .join('')
    .split('\n');

  return eventsSection;
}

function parseLine(heading, line) {
  var lineData = line.replace(new RegExp(('\\s*' + heading + ':\\s*'), 'i'), '');
  return lineData.split(/,\s*/);
}

function pullEventFormat(formatLine) {
  var format = {};

  var formatList = parseLine('format', formatLine).map(function (col) {
    return col.toLowerCase();
  });

  format.startIdx = formatList.indexOf('start');
  format.endIdx = formatList.indexOf('end');
  format.textIdx = formatList.length - 1;

  return format;
}

function removeInlineFormatting(text) {
  return text.split(/{\\[^}]*}/g).join('');
}

function pullEventData(line, format, idx, omitInlineStyles) {
  var eventList = parseLine('dialogue', line);

  var start = ssaTimeToMsec(eventList[format.startIdx]);
  var end = ssaTimeToMsec(eventList[format.endIdx]);
  var text = eventList.slice(format.textIdx).join(', ');

  if (omitInlineStyles) {
    text = removeInlineFormatting(text);
  }

  return {
    id: idx,
    startTime: start,
    endTime: end,
    text: text,
  };
}

function parseSsa(data, omitInlineStyles) {
  var eventsList = stripHeading(cleanFile(data));
  var eventFormat = pullEventFormat(eventsList.shift());

  eventsList = eventsList.filter(function (event) {
    if (event.split(':')[0].match(/Dialogue\s*/i)) {
      return event;
    }
  });
  return eventsList.map(function (event, idx) {
    return pullEventData(event, eventFormat, idx+1, omitInlineStyles);
  });
}

module.exports = {
  parseSsa: parseSsa,
  ssaTimeToMsec: ssaTimeToMsec,
};
