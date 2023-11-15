
import { addUserRoleData, getArchiveUserRoleData, getPermissions, getUserRoleData, setUserRoleActivate, setUserRoleArchive, updatePermissions, updateUserRoleData } from "../../helpers/backend_helper";
import { setUserRoleList, apiError, setApiLoading, setApiSuccess, setFeildsError, addUserRoleList, updateUserRoleList, setArchiveUserRoleList, RemoveUserRole, ReActivateUserRole, setPermissions } from "./reducer";


export const UserRoleData = (user) => async (dispatch) => {
    dispatch(setApiLoading({ data: true }))
    try {
        let response = getUserRoleData();

        var data = await response;
        if (data?.success) {
            dispatch(setUserRoleList(data?.data))
            dispatch(setApiLoading({ data: false }))
        }
    } catch (error) {
        console.log({ error })
        let message = Object.values(error.response.data.data)[0]
        dispatch(setApiLoading({ data: false }))
        dispatch(apiError({ data: message[0] || message }));
        // dispatch(apiError({ data: 'Something Went Wrong' }));
    }
};

export const archiveUserRoleData = (user) => async (dispatch) => {

    try {
        let response = getArchiveUserRoleData();

        var data = await response;
        if (data?.success) {
            dispatch(setArchiveUserRoleList(data?.data))
        }
    } catch (error) {
        // dispatch(apiError({ data: 'Something Went Wrong' }));
    }
};

export const addUserRole = (value) => async (dispatch) => {
    dispatch(setApiLoading({ data: true }))
    dispatch(setApiSuccess({ data: false }))
    dispatch(setFeildsError({ data: null }));
    try {
        let response = addUserRoleData(value);

        var data = await response;
        dispatch(addUserRoleList(data))
        dispatch(setApiLoading({ data: false }))
        dispatch(setApiSuccess({ data: true }))
        // if (data?.success) {
        //   dispatch(setUserRoleList(data))
        // }
    } catch (error) {
        dispatch(setFeildsError(error.response.data))
        dispatch(setApiLoading({ data: false }))
    }
};

export const updateUserRole = (value) => async (dispatch) => {
    dispatch(setApiLoading({ data: true }))
    dispatch(setApiSuccess({ data: false }))
    dispatch(setFeildsError({ data: null }));
    try {
        let response = updateUserRoleData(value);

        var data = await response;
        dispatch(updateUserRoleList(data))
        dispatch(setApiLoading({ data: false }))
        dispatch(setApiSuccess({ data: true }))
        // if (data?.success) {
        //   dispatch(setUserRoleList(data))
        // }
    } catch (error) {
        dispatch(setFeildsError(error.response.data))
        dispatch(setApiLoading({ data: false }))
    }
};


export const archiveUserRole = (value) => async (dispatch) => {
    dispatch(setApiLoading({ data: true }))
    dispatch(apiError({ data: '' }));
    try {
        let response = setUserRoleArchive(value?.id);

        var data = await response;

        console.log({ data })
        if (data?.success) {
            dispatch(RemoveUserRole(data))
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
export const reActivateUserRole = (value) => async (dispatch) => {
    dispatch(setApiLoading({ data: true }))
    dispatch(apiError({ data: '' }));
    try {
        let response = setUserRoleActivate(value?.id);

        var data = await response;

        if (data?.success) {
            dispatch(ReActivateUserRole(data))
            dispatch(setApiLoading({ data: false }))
            dispatch(setApiSuccess({ data: true }))
        }
    } catch (error) {
        let message = Object.values(error.response.data.data)[0]

        dispatch(apiError({ data: message[0] || message }));
        dispatch(setApiLoading({ data: false }))
    }
};

export const PermissionsData = (id) => async (dispatch) => {
    dispatch(setApiLoading({ data: true }))
    try {
        let response = getPermissions(id);
        var data = await response;
        if (data?.success) {
            dispatch(setPermissions(data))
            dispatch(setApiLoading({ data: false }))
        }
    } catch (error) {
        // let message = Object.values(error?.response?.data?.data)[0]
        // dispatch(setApiLoading({ data: false }))
        // dispatch(apiError({ data: message[0] || message }));
        // dispatch(apiError({ data: 'Something Went Wrong' }));
    }
};
export const UpdatePermissionsData = (formdata) => async (dispatch) => {
    dispatch(setApiLoading({ data: true }))
    try {
        let response = updatePermissions(formdata);
        var data = await response;
        if (data?.success) {
            console.log({ data })
            dispatch(setApiLoading({ data: false }))
            dispatch(setApiSuccess({ data: true }))
        }
    } catch (error) {
        dispatch(setApiLoading({ data: false }))
        dispatch(setFeildsError(error.response.data))
        // let message = Object.values(error?.response?.data?.data)[0]
        // dispatch(setApiLoading({ data: false }))
        // dispatch(apiError({ data: message[0] || message }));
        // dispatch(apiError({ data: 'Something Went Wrong' }));
    }
};