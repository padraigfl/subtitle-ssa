export interface SubtitleType {
  text: string;
  secondaryText?: string;
  start: number;
  end: number;
}

export const scale: number[] = [60 * 60 * 1000, 60 * 1000, 1000, 10];
