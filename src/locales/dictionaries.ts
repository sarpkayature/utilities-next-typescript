import 'server-only';

import { locales } from 'constants/index';

type locales = keyof typeof locales;

const dictionaries = {
  en: () => import('./en.json').then((module) => module.default),
  tr: () => import('./tr.json').then((module) => module.default),
};

export const getDictionary = async (locale: string) =>
  dictionaries[locale as locales]();
