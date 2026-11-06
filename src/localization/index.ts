import 'intl-pluralrules';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { findBestLanguageTag } from 'react-native-localize';
import en from './en/main.json';
import pl from './pl/main.json';
import uk from './ua/main.json';

const DEFAULT_LANGUAGE = 'uk';
const LANGUAGE_STORAGE_KEY = 'language';

const resources = {
  uk: { translation: uk },
  en: { translation: en },
  pl: { translation: pl },
};

i18n.use(initReactI18next).init({
  resources,
  lng:
    findBestLanguageTag(Object.keys(resources))?.languageTag ??
    DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
  interpolation: { escapeValue: false },
});

const restoreLanguage = async () => {
  try {
    const storedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (storedLanguage && storedLanguage in resources) {
      await i18n.changeLanguage(storedLanguage);
    }
  } catch (error) {
    console.error(error);
  }
};

restoreLanguage();

export const selectLanguage = async (language: string) => {
  try {
    await i18n.changeLanguage(language);
    await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch (error) {
    console.error(error);
  }
};

export default i18n;
