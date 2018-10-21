"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EVENT_ORDER = [
    'Marked',
    'Start',
    'End',
    'Style',
    'Name',
    'MarginL',
    'MarginR',
    'MarginV',
    'Effect',
    'Text',
];
exports.msecToSsaTime = (milleseconds) => {
    let remainingTime = milleseconds;
    const split = [60 * 60 * 1000, 60 * 1000, 1000, 1].map((d, i) => {
        const value = Math.floor(remainingTime / d);
        let displayValue = value.toString();
        remainingTime = remainingTime - (value * d); // TODO, be less hacky
        if (displayValue.length < 2) {
            displayValue = '0' + displayValue;
        }
        if (i === 3 && displayValue.length < 3) {
            displayValue = '0' + displayValue;
        }
        return displayValue;
    });
    return split[0] + ':' + split[1] + ':' + split[2] + '.' + split[3].substring(0, 2);
};
exports.buildHeading = () => ('[Script Info]\n' +
    'Title: Built By https://github.com/padraigfl\n' +
    'Original Script: Likely Someone Else\n' +
    'ScriptType: v4.00\n');
exports.buildHardStyles = () => ('[V4 Styles]\n' +
    'Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, TertiaryColour, BackColour,' +
    'Bold, Italic, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, AlphaLevel, Encoding\n' +
    'Style: primary, Tahoma, 24, 16777215, 00000000, 00000000, 00000000, 0, 0, 1, 1, 0, 2, 30, 30, 10, 0, 0\n' +
    'Style: secondary, Tahoma, 18, 16777215, 00000000, 00000000, 00000000, 0, 0, 1, 1, 0, 2, 30, 30, 10, 0, 0\n');
const buildEventsHeading = () => ('[Events]' + '\n' + 'Format: ' +
    EVENT_ORDER.reduce((acc, val) => acc + ', ' + val) + '\n');
const dialogueBody = {
    Marked: 'Marked=0',
    Name: 'NTP',
    MarginL: '0000',
    MarginR: '0000',
    MarginV: '0000',
    Effect: '!Effect',
};
exports.buildDialogue = (text, start, end, style) => {
    const dialogueObject = Object.assign({}, dialogueBody, { Start: exports.msecToSsaTime(start), End: exports.msecToSsaTime(end), Style: style, Text: text ? text.replace('\n', '\\n') : undefined });
    if (text) {
        return 'Dialogue: ' + EVENT_ORDER.reduce((acc, val, i) => (acc + dialogueObject[val] + (i !== EVENT_ORDER.length - 1 ? ',' : '')), '') + '\n';
    }
    return '';
};
exports.subToSsa = (sub) => {
    const primaryDialogue = sub.text ? exports.buildDialogue(sub.text, sub.start, sub.end, 'primary') : '';
    const secondaryDialogue = sub.secondaryText ? exports.buildDialogue(sub.secondaryText, sub.start, sub.end, 'secondary') : '';
    return primaryDialogue + secondaryDialogue;
};
exports.toSsa = (subArray, styles, heading) => {
    if (!heading) {
        heading = exports.buildHeading();
    }
    if (!styles) {
        styles = exports.buildHardStyles();
    }
    const events = buildEventsHeading() +
        subArray.reduce((acc, sub) => acc + exports.subToSsa(sub), '');
    return heading + '\n' +
        styles + '\n' +
        events + '\n';
};
exports.default = exports.toSsa;
