
import translationDe from "../locales/de.js";
import translationIT from "../locales/it.js";
import translationES from "../locales/es.js";
import translationENG from "../locales/en";
import translationCN from "../locales/cn.js";
import translationFR from "../locales/fr.js";
import translationAR from "../locales/ar.js";
import i18n from "i18next";

const TranslationSetting = (translations) => {

    // the translations
    let resources = {
        en: {
            translation: translationENG(translations),
        },
        fr: {
            translation: translationFR(translations),
        },
        de: {
            translation: translationDe(translations)
        },
        es: {
            translation: translationES(translations),
        },
        cn: {
            translation: translationCN(translations),
        },
        ar: {
            translation: translationAR(translations),
        },
        it: {
            translation: translationIT(translations),
        },
    };
    console.log({ resources })
    i18n.init({
        resources,
        lng: localStorage.getItem("I18N_LANGUAGE") || "en",
        fallbackLng: "en", // use en if detected lng is not available

        keySeparator: true, // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    })

}

export default TranslationSetting 