import { getAllEmail, updateEmailTempData } from "../../helpers/backend_helper";
import { apiError, setAllEmails, setApiLoading, setApiSuccess, setFeildsError, updateEmailTempList, } from "./reducer";

export const getAllEmaitTemp = (user) => async (dispatch) => {
    dispatch(setApiLoading({ data: true }))

    try {
        let response = getAllEmail();

        var data = await response;
        // console.log({ data })
        if (data?.success) {
            dispatch(setAllEmails(data))
            dispatch(setApiLoading({ data: false }))
        }
    } catch (error) {
        if (error.response?.data) {
            let message = Object.values(error.response?.data?.data)[0]

            dispatch(apiError({ data: message[0] || message }));
        }
    }
};

export const updateEmailTemp = (value) => async (dispatch) => {
    dispatch(setApiLoading({ data: true }))
    dispatch(setApiSuccess({ data: false }))
    dispatch(setFeildsError({ data: null }));
    try {
        let response = updateEmailTempData(value);

        var data = await response;
        dispatch(updateEmailTempList(data))
        dispatch(setApiLoading({ data: false }))
        dispatch(setApiSuccess({ data: true }))
        // if (data?.success) {
        //   dispatch(setEmailTempList(data))
        // }
    } catch (error) {
        dispatch(setFeildsError(error.response.data))
        dispatch(setApiLoading({ data: false }))
    }
};