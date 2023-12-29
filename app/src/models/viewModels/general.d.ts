import { Request } from 'express';
import { TranslateOptions } from 'i18n';
export interface Ii18nRequest extends Request {
  t: (phraseOrOptions: string | TranslateOptions, ...replace: string[]) => string;
}
