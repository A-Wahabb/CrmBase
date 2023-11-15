import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { get } from "lodash";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from 'reselect';

//i18n
import i18n from "../../i18n";
import languages from "../../common/languages";
import { languagesList, setUserLang } from '../../slices/thunks';
import axios from 'axios';


const LanguageDropdown = () => {
    const dispatch = useDispatch();
    const [selectedLang, setSelectedLang] = useState("");
    const [AllLanguages, setAllLanguages] = useState("");
    const selectLayoutState = (state) => state;
    const LanguagesData = createSelector(
        selectLayoutState,
        (state) => {
            return ({
                languageList: state.UpdateDefaults.languageList,
                lang: state.UpdateDefaults.languageList
            })
        }
    );
    // Inside your component
    const {
        languageList,
        lang,
    } = useSelector(LanguagesData);

    //fetch All Companies
    useEffect(() => {
        dispatch(languagesList());
    }, [])

    useEffect(() => {
        setAllLanguages(Object.keys(languageList).reduce((obj, key) => {
            obj[key] = {
                label: languages[key].label,
                flag: languages[key].flag,
            };
            return obj;
        }, {}))
    }, [languageList])


    // Declare a new state variable, which we'll call "menu"

    useEffect(() => {
        const currentLanguage = localStorage.getItem("I18N_LANGUAGE");
        setSelectedLang(currentLanguage);
    }, [lang]);

    const changeLanguageAction = lang => {
        //set language as i18n
        i18n.changeLanguage(lang);
        localStorage.setItem("I18N_LANGUAGE", lang);
        setSelectedLang(lang);
        axios.defaults.headers.common["Accept-Language"] = lang;
        dispatch(setUserLang(lang))
    };


    const [isLanguageDropdown, setIsLanguageDropdown] = useState(false);
    const toggleLanguageDropdown = () => {
        setIsLanguageDropdown(!isLanguageDropdown);
    };
    return (
        <React.Fragment>
            <Dropdown isOpen={isLanguageDropdown} toggle={toggleLanguageDropdown} className="ms-1 topbar-head-dropdown header-item">
                <DropdownToggle className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle" tag="button">
                    <img
                        src={get(AllLanguages, `${selectedLang}.flag`)}
                        alt="Header Language"
                        height="20"
                        className="rounded"
                    />
                </DropdownToggle>
                <DropdownMenu className="notify-item language py-2">
                    {Object.keys(AllLanguages).map(key => (
                        <DropdownItem
                            key={key}
                            onClick={() => changeLanguageAction(key)}
                            className={`notify-item ${selectedLang === key ? "active" : "none"
                                }`}
                        >
                            <img
                                src={get(AllLanguages, `${key}.flag`)}
                                alt="Skote"
                                className="me-2 rounded"
                                height="18"
                            />
                            <span className="align-middle">
                                {get(AllLanguages, `${key}.label`)}
                            </span>
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
        </React.Fragment>
    );
};

export default LanguageDropdown;