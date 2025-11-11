import { enTranslations } from "./translations/en";
import { itTranslations } from "./translations/it";

export const dictionaries = {
  en: enTranslations,
  it: itTranslations,
};

export type SupportedLocale = keyof typeof dictionaries;
export type TranslationKey = keyof typeof enTranslations;

export const DEFAULT_LOCALE: SupportedLocale = "en";

