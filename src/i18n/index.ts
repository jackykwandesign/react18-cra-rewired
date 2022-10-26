import i18n from "i18next";
import { I18nextProviderProps, initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import translationsEN from './en/en.json'
import translationsHE from './he/he.json'
export const defaultNS = "translation";
export const resources = {
  en: {
    translation:translationsEN
    // translationsEN,
  },
  he: {
    translation:translationsHE
    // translationsEN,
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    defaultNS,
    resources,
    // keySeparator: false, // we do not use keys in form messages.welcome
    // interpolation: {
    //   escapeValue: false // react already safes from xss
    // }
  });
const i18Props:I18nextProviderProps = {
  i18n: i18n
}
export {i18Props}