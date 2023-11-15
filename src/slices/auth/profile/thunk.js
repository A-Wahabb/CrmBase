
import { updateUserProfileAdditionalData, updateUserProfileData, updateUserProfilePasswordData } from "../../../helpers/backend_helper";

// action
import { profileSuccess, setApiLoading, setApiSuccess, setFeildsError } from "./reducer";



export const updateUserProfile = (value) => async (dispatch) => {
    dispatch(setApiLoading({ data: true }))
    dispatch(setApiSuccess({ data: false }))
    dispatch(setFeildsError({ data: null }));
    try {
        let response = updateUserProfileData(value);

        var data = await response;
        dispatch(profileSuccess(data))
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



export const updateUserProfileAdditional = (value) => async (dispatch) => {
    dispatch(setApiLoading({ data: true }))
    dispatch(setApiSuccess({ data: false }))
    dispatch(setFeildsError({ data: null }));
    try {
        let response = updateUserProfileAdditionalData(value);

        var data = await response;
        dispatch(profileSuccess(data))
        dispatch(setApiLoading({ data: false }))
        dispatch(setApiSuccess({ data: true }))
        return true
        // if (data?.success) {
        //   dispatch(setUserProfileList(data))
        // }
    } catch (error) {
        dispatch(setFeildsError(error.response.data))
        dispatch(setApiLoading({ data: false }))
        return false
    }
};


export const updateUserProfilePassword = (value) => async (dispatch) => {
    dispatch(setApiLoading({ data: true }))
    dispatch(setApiSuccess({ data: false }))
    dispatch(setFeildsError({ data: null }));
    try {
        let response = updateUserProfilePasswordData(value);

        var data = await response;
        dispatch(setApiLoading({ data: false }))
        dispatch(setApiSuccess({ data: true }))
        return true
        // if (data?.success) {
        //   dispatch(setUserProfileList(data))
        // }
    } catch (error) {
        dispatch(setFeildsError(error.response.data))
        dispatch(setApiLoading({ data: false }))
        return false
    }
};
