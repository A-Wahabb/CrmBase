
import { addUserData, getArchiveUserData, getUserData, setLanguage, setUserActivate, setUserArchive, updateUserAdditionalData, updateUserData, updateUserPasswordData } from "../../helpers/backend_helper";
import { setLang } from "../defaults/reducer";
import { setUserList, apiError, setApiLoading, setApiSuccess, setFeildsError, addUserList, updateUserList, setArchiveUserList, RemoveUser, ReActivateUser } from "./reducer";


export const UserData = (user) => async (dispatch) => {
    dispatch(setApiLoading({ data: true }))

    try {
        let response = getUserData();

        var data = await response;
        if (data?.success) {
            dispatch(setUserList(data?.data))
            dispatch(setApiLoading({ data: false }))
        }
    } catch (error) {
        console.log({ error })
        let message = Object.values(error?.response?.data?.data)[0]
        dispatch(setApiLoading({ data: false }))

        dispatch(apiError({ data: message[0] || message }));
        // dispatch(apiError({ data: 'Something Went Wrong' }));
    }
};

export const archiveUserData = (user) => async (dispatch) => {

    try {
        let response = getArchiveUserData();

        var data = await response;
        if (data?.success) {
            dispatch(setArchiveUserList(data?.data))
        }
    } catch (error) {
        // dispatch(apiError({ data: 'Something Went Wrong' }));
    }
};

export const addUser = (value) => async (dispatch) => {
    dispatch(setApiLoading({ data: true }))
    dispatch(setApiSuccess({ data: false }))
    dispatch(setFeildsError({ data: null }));
    try {
        let response = addUserData(value);

        var data = await response;
        dispatch(addUserList(data))
        dispatch(setApiLoading({ data: false }))
        dispatch(setApiSuccess({ data: true }))
        // if (data?.success) {
        //   dispatch(setUserList(data))
        // }
    } catch (error) {
        dispatch(setFeildsError(error.response.data))
        dispatch(setApiLoading({ data: false }))
    }
};

export const updateUser = (value) => async (dispatch) => {
    dispatch(setApiLoading({ data: true }))
    dispatch(setApiSuccess({ data: false }))
    dispatch(setFeildsError({ data: null }));
    try {
        let response = updateUserData(value);

        var data = await response;
        dispatch(updateUserList(data))
        dispatch(setApiLoading({ data: false }))
        dispatch(setApiSuccess({ data: true }))
        return true
        // if (data?.success) {
        //   dispatch(setUserList(data))
        // }
    } catch (error) {
        dispatch(setFeildsError(error.response.data))
        dispatch(setApiLoading({ data: false }))
        return false
    }
};
export const updateUserAdditional = (value) => async (dispatch) => {
    dispatch(setApiLoading({ data: true }))
    dispatch(setApiSuccess({ data: false }))
    dispatch(setFeildsError({ data: null }));
    try {
        let response = updateUserAdditionalData(value);

        var data = await response;
        dispatch(updateUserList(data))
        dispatch(setApiLoading({ data: false }))
        dispatch(setApiSuccess({ data: true }))
        return true
        // if (data?.success) {
        //   dispatch(setUserList(data))
        // }
    } catch (error) {
        dispatch(setFeildsError(error.response.data))
        dispatch(setApiLoading({ data: false }))
        return false
    }
};


export const updateUserPassword = (value) => async (dispatch) => {
    dispatch(setApiLoading({ data: true }))
    dispatch(setApiSuccess({ data: false }))
    dispatch(setFeildsError({ data: null }));
    try {
        let response = updateUserPasswordData(value);

        var data = await response;
        dispatch(setApiLoading({ data: false }))
        dispatch(setApiSuccess({ data: true }))
        return true
        // if (data?.success) {
        //   dispatch(setUserList(data))
        // }
    } catch (error) {
        dispatch(setFeildsError(error.response.data))
        dispatch(setApiLoading({ data: false }))
        return false
    }
};


export const archiveUser = (value) => async (dispatch) => {
    dispatch(setApiLoading({ data: true }))
    dispatch(apiError({ data: '' }));
    try {
        let response = setUserArchive(value?.id);

        var data = await response;

        if (data?.success) {
            dispatch(RemoveUser({ data: value }))
            dispatch(setApiLoading({ data: false }))
            dispatch(setApiSuccess({ data: true }))
        }
    } catch (error) {
        let message
        if (error?.response?.data?.message_values) {
            const words = error?.response?.data?.message?.split('_').map(word => word.toLowerCase().replace(/^\w/, c => c.toUpperCase()));

            if (words[0] === 'Error') {
                words.shift();
            }
            message = words.join(' ');

        }
        else {
            message = Object.values(error.response.data.data)[0]
        }
        dispatch(apiError({ data: message }));
        dispatch(setApiLoading({ data: false }))
    }
};
export const reActivateUser = (value) => async (dispatch) => {
    dispatch(setApiLoading({ data: true }))
    dispatch(apiError({ data: '' }));
    try {
        let response = setUserActivate(value?.id);

        var data = await response;
        if (data?.success) {
            dispatch(ReActivateUser({ data: value }))
            dispatch(setApiLoading({ data: false }))
            dispatch(setApiSuccess({ data: true }))
        }
    } catch (error) {
        let message = Object.values(error.response.data.data)[0]

        dispatch(apiError({ data: message[0] || message }));
        dispatch(setApiLoading({ data: false }))
    }
};
export const setUserLang = (value) => async (dispatch) => {
    try {
        let formData = new FormData()

        formData.append('lang', value)
        let response = setLanguage(formData);

        var data = await response;
        if (data?.success) {
            setLang(value)
        }
    } catch (error) {
    }
};