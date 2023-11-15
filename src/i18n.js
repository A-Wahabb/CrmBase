import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import TranslationSetting from "./helpers/TranslationSetting.js";


// the translations
const get_translations = JSON.parse(localStorage.getItem('localization'))

const language = localStorage.getItem("I18N_LANGUAGE");
if (!language) {
  localStorage.setItem("I18N_LANGUAGE", "en");
}


i18n
  .use(detector)
  .use(initReactI18next) // passes i18n down to react-i18next

TranslationSetting(get_translations)

export default i18n;