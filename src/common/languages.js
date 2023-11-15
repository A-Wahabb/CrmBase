import flagus from "../assets/images/flags/us.svg";
import flagspain from "../assets/images/flags/spain.svg";
import flaggermany from "../assets/images/flags/germany.svg";
import flagitaly from "../assets/images/flags/italy.svg";
import flagchina from "../assets/images/flags/china.svg";
import flagfrench from "../assets/images/flags/french.svg";
import flagarabic from "../assets/images/flags/ae.svg";


const languages = {
  en: {
    label: "English",
    flag: flagus,
  },
  fr: {
    label: "français",
    flag: flagfrench,
  },
  de: {
    label: "Deutsche",
    flag: flaggermany,
  },
  es: {
    label: "Española",
    flag: flagspain,
  },
  cn: {
    label: "中国人",
    flag: flagchina,
  },
  ar: {
    label: "Arabic",
    flag: flagarabic,
  },
  it: {
    label: "Italiana",
    flag: flagitaly,
  },
}

export default languages
