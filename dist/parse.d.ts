import { SubtitleType } from './shared';
export declare const ssaTimeToMsec: (ssaTime: string) => number;
export declare const stripHeading: (ssaFile: string) => string[];
export declare const parseLine: (heading: string, line: string) => string[];
interface FormatIdxIface {
    startIdx: number;
    endIdx: number;
    textIdx: number;
}
export declare const pullEventData: (line: string, format: FormatIdxIface, omitInlineStyles: boolean) => SubtitleType;
export declare const parseSsa: (data: string, omitInlineStyles: boolean) => SubtitleType[];
export default parseSsa;
