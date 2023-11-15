
import { addDesignationData, getArchiveDesignationData, getDesignationData, setDesignationActivate, setDesignationArchive, updateDesignationData } from "../../helpers/backend_helper";
import { setDesignationList, apiError, setApiLoading, setApiSuccess, setFeildsError, addDesignationList, updateDesignationList, setArchiveDesignationList, RemoveDesignation, ReActivateDesignation } from "./reducer";


export const DesignationData = (user) => async (dispatch) => {
    dispatch(setApiLoading({ data: true }))

    try {
        let response = getDesignationData();

        var data = await response;
        if (data?.success) {
            dispatch(setDesignationList(data?.data))
            dispatch(setApiLoading({ data: false }))
        }
    } catch (error) {
        console.log({ error })
        if (error?.response) {
            let message = Object.values(error?.response?.data?.data)[0]
            dispatch(setApiLoading({ data: false }))

            dispatch(apiError({ data: message[0] || message }));
            // dispatch(apiError({ data: 'Something Went Wrong' }));
        }
    }
};

export const archiveDesignationData = (user) => async (dispatch) => {

    try {
        let response = getArchiveDesignationData();

        var data = await response;
        console.log({ data })
        if (data?.success) {
            dispatch(setArchiveDesignationList(data?.data?.designation))
        }
    } catch (error) {
        // dispatch(apiError({ data: 'Something Went Wrong' }));
    }
};

export const addDesignation = (value) => async (dispatch) => {
    dispatch(setApiLoading({ data: true }))
    dispatch(setApiSuccess({ data: false }))
    dispatch(setFeildsError({ data: null }));
    try {
        let response = addDesignationData(value);

        var data = await response;
        dispatch(addDesignationList(data))
        dispatch(setApiLoading({ data: false }))
        dispatch(setApiSuccess({ data: true }))
        // if (data?.success) {
        //   dispatch(setDesignationList(data))
        // }
    } catch (error) {
        if (error?.response) {
            dispatch(setFeildsError(error.response.data))
            dispatch(setApiLoading({ data: false }))
        }
    }
};

export const updateDesignation = (value) => async (dispatch) => {
    dispatch(setApiLoading({ data: true }))
    dispatch(setApiSuccess({ data: false }))
    dispatch(setFeildsError({ data: null }));
    try {
        let response = updateDesignationData(value);

        var data = await response;
        dispatch(updateDesignationList(data))
        dispatch(setApiLoading({ data: false }))
        dispatch(setApiSuccess({ data: true }))
        // if (data?.success) {
        //   dispatch(setDesignationList(data))
        // }
    } catch (error) {
        if (error?.response) {
            dispatch(setFeildsError(error.response.data))
            dispatch(setApiLoading({ data: false }))
        }
    }
};


export const archiveDesignation = (value) => async (dispatch) => {
    dispatch(setApiLoading({ data: true }))
    dispatch(apiError({ data: '' }));
    try {
        let response = setDesignationArchive(value?.id);

        var data = await response;

        console.log({ data })
        if (data?.success) {
            dispatch(RemoveDesignation({ data: value }))
            dispatch(setApiLoading({ data: false }))
            dispatch(setApiSuccess({ data: true }))
        }
    } catch (error) {
        let message = 'error'
        if (error?.response?.data?.message_values) {
            const words = error?.response?.data?.message?.split('_').map(word => word.toLowerCase().replace(/^\w/, c => c.toUpperCase()));

            if (words[0] === 'Error') {
                words.shift();
            }
            message = words.join(' ');

        }
        else {
            if (error?.response) {
                message = Object.values(error.response.data.data)[0]
            }
        }
        dispatch(apiError({ data: message }));
        dispatch(setApiLoading({ data: false }))
    }
};
export const reActivateDesignation = (value) => async (dispatch) => {
    dispatch(setApiLoading({ data: true }))
    dispatch(apiError({ data: '' }));
    try {
        let response = setDesignationActivate(value?.id);

        var data = await response;

        console.log({ data })
        if (data?.success) {
            dispatch(ReActivateDesignation({ data: value }))
            dispatch(setApiLoading({ data: false }))
            dispatch(setApiSuccess({ data: true }))
        }
    } catch (error) {
        if (error?.response) {
            let message = Object.values(error.response.data.data)[0]

            dispatch(apiError({ data: message[0] || message }));
            dispatch(setApiLoading({ data: false }))
        }
    }
};