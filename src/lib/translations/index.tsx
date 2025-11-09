import { en } from './en';
import { hi } from './hi';
import { te } from './te';
import { ta } from './ta';

export const translations = {
  en,
  hi,
  te,
  ta,
};

export type Language = keyof typeof translations;
export type TranslationKeys = typeof en;
