
import {
    addModuleData,
    getModuleData, setModuleActivate, setModuleArchive, updateModuleData
} from "../../helpers/backend_helper";
import { setModuleList, apiError, setApiLoading, setApiSuccess, UpdateModuleData, setFeildsError, } from "./reducer";


export const ModuleData = (user) => async (dispatch) => {

    try {
        let response = getModuleData();

        var data = await response;
        if (data?.success) {
            dispatch(setModuleList(data?.data))
        }
    } catch (error) {
        console.log({ error })
        let message = Object.values(error.response.data.data)[0]

        dispatch(apiError({ data: message[0] || message }));
        // dispatch(apiError({ data: 'Something Went Wrong' }));
    }
};
export const addModule = (value) => async (dispatch) => {
    dispatch(setApiLoading({ data: true }))
    dispatch(setApiSuccess({ data: false }))
    dispatch(setFeildsError({ data: null }));
    try {
        let response = addModuleData(value);

        var data = await response;
        dispatch(setModuleList(data))
        dispatch(setApiLoading({ data: false }))
        dispatch(setApiSuccess({ data: true }))
        // if (data?.success) {
        //   dispatch(setModuleList(data))
        // }
    } catch (error) {
        dispatch(setFeildsError(error.response.data))
        dispatch(setApiLoading({ data: false }))
    }
};

export const updateModule = (value) => async (dispatch) => {
    dispatch(setApiLoading({ data: true }))
    dispatch(setApiSuccess({ data: false }))
    dispatch(setFeildsError({ data: null }));
    try {
        let response = updateModuleData(value);

        var data = await response;
        dispatch(setModuleList(data))
        dispatch(setApiLoading({ data: false }))
        dispatch(setApiSuccess({ data: true }))
        // if (data?.success) {
        //   dispatch(setModuleList(data))
        // }
    } catch (error) {
        dispatch(setFeildsError(error.response.data))
        dispatch(setApiLoading({ data: false }))
    }
};


export const archiveModule = (value) => async (dispatch) => {
    dispatch(setApiLoading({ data: true }))
    dispatch(apiError({ data: '' }));
    try {
        let response = setModuleArchive(value?.id);

        var data = await response;

        console.log({ data })
        if (data?.success) {
            dispatch(UpdateModuleData(data))
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

        dispatch(apiError({ data: message[0] || message }));
        dispatch(setApiLoading({ data: false }))
    }
};
export const reActivateModule = (value) => async (dispatch) => {
    dispatch(setApiLoading({ data: true }))
    dispatch(apiError({ data: '' }));
    try {
        let response = setModuleActivate(value?.id);

        var data = await response;

        console.log({ data })
        if (data?.success) {
            dispatch(UpdateModuleData(data))
            dispatch(setApiLoading({ data: false }))
            dispatch(setApiSuccess({ data: true }))
        }
    } catch (error) {
        let message = Object.values(error.response.data.data)[0]

        dispatch(apiError({ data: message[0] || message }));
        dispatch(setApiLoading({ data: false }))
    }
};
