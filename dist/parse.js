"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("./shared");
exports.ssaTimeToMsec = (ssaTime) => (ssaTime.split(/[:.]/g)
    .map((t) => parseInt(t, 10))
    .reduce((acc, t, i) => acc + t * shared_1.scale[i], 0));
const cleanFile = (data) => data.replace(/(^[\s\r\n]+)|([\s\r\n]+$)/g, '');
exports.stripHeading = (ssaFile) => ssaFile
    .split(/[\r\n]{4,}|\n{2,}/).slice(2).join('\n') // Breaking apart sections
    .split(/[\n\s]*\[\s*Events\s*\][\n\s]*/i).join('').split('\n'); // split events and styles
exports.parseLine = (heading, line) => line
    .replace(new RegExp(('\\s*' + heading + ':\\s*'), 'i'), '') // todo, explain
    .split(/,\s*/);
const pullEventFormat = (formatLine) => {
    const formatList = exports.parseLine('format', formatLine)
        .map((col) => col.toLowerCase());
    return {
        startIdx: formatList.indexOf('start'),
        endIdx: formatList.indexOf('end'),
        textIdx: formatList.length - 1,
    };
};
const removeInlineFormatting = (text) => text.split(/{\\[^}]*}/g).join('');
exports.pullEventData = (line, format, omitInlineStyles) => {
    const eventList = exports.parseLine('dialogue', line);
    const start = exports.ssaTimeToMsec(eventList[format.startIdx]);
    const end = exports.ssaTimeToMsec(eventList[format.endIdx]);
    let text = eventList.slice(format.textIdx).join(', ');
    if (omitInlineStyles) {
        text = removeInlineFormatting(text);
    }
    return {
        start,
        end,
        text,
    };
};
exports.parseSsa = (data, omitInlineStyles) => {
    let eventsList = exports.stripHeading(cleanFile(data));
    const format = eventsList.shift();
    const eventFormat = pullEventFormat(format || ''); // hack
    eventsList = eventsList.filter((event) => {
        if (event.split(':')[0].match(/Dialogue\s*/i)) {
            return event;
        }
    });
    return eventsList.map((event) => (exports.pullEventData(event, eventFormat, omitInlineStyles)));
};
exports.default = exports.parseSsa;
