import { scale, SubtitleType } from './shared';

export const ssaTimeToMsec = (ssaTime: string): number => (
  ssaTime.split(/[:.]/g)
    .map((t: string) => parseInt(t, 10))
    .reduce((acc, t, i) => acc + t * scale[i], 0)
);

const cleanFile = (data: string): string => data.replace(/(^[\s\r\n]+)|([\s\r\n]+$)/g, '');

export const stripHeading = (ssaFile: string): string[] => ssaFile
  .split(/[\r\n]{4,}|\n{2,}/).slice(2).join('\n') // Breaking apart sections
  .split(/[\n\s]*\[\s*Events\s*\][\n\s]*/i).join('').split('\n'); // split events and styles

export const parseLine = (heading: string, line: string): string[] => line
  .replace(new RegExp(('\\s*' + heading + ':\\s*'), 'i'), '') // todo, explain
  .split(/,\s*/);

interface FormatIdxIface { startIdx: number; endIdx: number; textIdx: number; }

const pullEventFormat = (formatLine: string): FormatIdxIface => {
  const formatList = parseLine('format', formatLine)
    .map((col) => col.toLowerCase());

  return {
    startIdx: formatList.indexOf('start'),
    endIdx: formatList.indexOf('end'),
    textIdx: formatList.length - 1,
  };
};

const removeInlineFormatting = (text: string): string => text.split(/{\\[^}]*}/g).join('');

export const pullEventData = (line: string, format: FormatIdxIface, omitInlineStyles: boolean): SubtitleType => {
  const eventList = parseLine('dialogue', line);

  const start = ssaTimeToMsec(eventList[format.startIdx]);
  const end = ssaTimeToMsec(eventList[format.endIdx]);
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

export const parseSsa = (data: string, omitInlineStyles: boolean): SubtitleType[] => {
  let eventsList = stripHeading(cleanFile(data));
  const format = eventsList.shift();
  const eventFormat = pullEventFormat(format || ''); // hack

  eventsList = eventsList.filter((event) => {
    if (event.split(':')[0].match(/Dialogue\s*/i)) {
      return event;
    }
  });
  return eventsList.map((event: string) => (
    pullEventData(event, eventFormat, omitInlineStyles)
  ));
};

export default parseSsa;
