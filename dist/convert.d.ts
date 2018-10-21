import { SubtitleType } from './shared';
export declare const msecToSsaTime: (milleseconds: number) => string;
export declare const buildHeading: () => string;
export declare const buildHardStyles: () => string;
export declare const buildDialogue: (text: string, start: number, end: number, style: string) => string;
export declare const subToSsa: (sub: SubtitleType) => string;
export declare const toSsa: (subArray: SubtitleType[], styles: string, heading: string) => string;
export default toSsa;
