import { getCityList, getCountryList, getDateFormat, getDesignationList, getLanguagesList, getModulePermissions, getStateList } from "../../helpers/backend_helper";
import { apiError, setCityList, setCountryList, setDateFormats, setDesignationList, setLanguagesList, setModulePermissions, setStateList } from "./reducer";


export const modulePermision = (user) => async (dispatch) => {
    let user = JSON.parse(localStorage.getItem("authUser")) || {}
    try {
        let response = getModulePermissions(user?.user_role_id);

        var data = await response;
        console.log({ data })
        if (data?.success) {
            dispatch(setModulePermissions(data))
        }
    } catch (error) {
        dispatch(apiError({ data: 'Something Went Wrong' }));
    }
};

export const dateFormat = (user) => async (dispatch) => {

    try {
        let response = getDateFormat();

        var data = await response;
        // console.log({ data })
        if (data?.success) {
            dispatch(setDateFormats(data))
        }
    } catch (error) {
        if (error.response?.data) {
            let message = Object.values(error.response?.data?.data)[0]

            dispatch(apiError({ data: message[0] || message }));
        }
    }
};
export const designationsList = (user) => async (dispatch) => {

    try {
        let response = getDesignationList();

        var data = await response;
        // console.log({ data })
        if (data?.success) {
            dispatch(setDesignationList(data))
        }
    } catch (error) {
        if (error.response?.data) {
            let message = Object.values(error.response?.data?.data)[0]

            dispatch(apiError({ data: message[0] || message }));
        }
    }
};
export const languagesList = (user) => async (dispatch) => {

    try {
        let response = getLanguagesList();

        var data = await response;
        // console.log({ data })
        if (data?.success) {
            dispatch(setLanguagesList(data))
        }
    } catch (error) {
        console.log({ error })
        // if (error.response?.data) {
        //     let message = Object.values(error.response?.data?.data)[0]

        //     dispatch(apiError({ data: message[0] || message }));
        // }
    }
};
export const countriesList = (user) => async (dispatch) => {

    try {
        let response = getCountryList();

        var data = await response;
        if (data?.success) {
            dispatch(setCountryList(data))
            return { success: true, list: data.data }
        }
    } catch (error) {
        if (error.response?.data) {
            let message = Object.values(error.response?.data?.data)[0]

            dispatch(apiError({ data: message[0] || message }));
        }
    }
};
export const statesList = (id) => async (dispatch) => {

    try {
        let response = getStateList(id);

        var data = await response;
        if (data?.success) {
            dispatch(setStateList(data))
            return { success: true, list: data.data }
        }
    } catch (error) {
        if (error.response?.data) {
            let message = Object.values(error.response?.data?.data)[0]

            dispatch(apiError({ data: message[0] || message }));
        }
    }
};
export const citiesList = (id) => async (dispatch) => {

    try {
        let response = getCityList(id);

        var data = await response;
        if (data?.success) {
            dispatch(setCityList(data))
            return { success: true, list: data.data }
        }
    } catch (error) {
        if (error.response?.data) {
            let message = Object.values(error.response?.data?.data)[0]

            dispatch(apiError({ data: message[0] || message }));
        }
    }
};
