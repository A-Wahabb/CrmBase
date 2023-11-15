import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    dateFormats: [],
    languageList: [],
    countryList: [],
    designationList: [],
    stateList: [],
    cityList: [],
    modulePermissions: null,
    lang: 'en',
    error: ''
};

const defaultSlice = createSlice({
    name: "default",
    initialState,
    reducers: {
        setModulePermissions(state, action) {
            state.modulePermissions = action.payload.data;
        },
        setDateFormats(state, action) {
            state.dateFormats = action.payload.data;
        },
        setCountryList(state, action) {
            state.countryList = action.payload.data;
        },
        setStateList(state, action) {
            state.stateList = action.payload.data;
        },
        setCityList(state, action) {
            state.cityList = action.payload.data;
        },
        setDesignationList(state, action) {
            state.designationList = action.payload.data;
        },
        setLanguagesList(state, action) {
            state.languageList = action.payload.data;
        },
        setLang(state, action) {
            state.lang = action.payload.data;
        },
        apiError(state, action) {
            state.error = action.payload.data;
        },
    },
});

export const {
    setModulePermissions,
    setDateFormats,
    setCountryList,
    setStateList,
    setCityList,
    setDesignationList,
    setLanguagesList,
    setLang,
    apiError,
} = defaultSlice.actions

export default defaultSlice.reducer;