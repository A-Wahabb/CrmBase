import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    userRoleList: [],
    archiveUserRoleList: [],
    permissions: null,
    ApiError: '',
    feildsError: null
};

const updateUserRoleDataSlice = createSlice({
    name: "updateUserRoleData",
    initialState,
    reducers: {
        setUserRoleList(state, action) {
            state.userRoleList = action.payload.data || action.payload;
        },

        setArchiveUserRoleList(state, action) {
            state.archiveUserRoleList = action.payload.data || action.payload;
        },

        addUserRoleList(state, action) {
            state.userRoleList = [...state.userRoleList, action.payload.data]
        },

        setPermissions(state, action) {
            state.permissions = action.payload.data
        },

        updateUserRoleList(state, action) {
            // Update the object with id 2
            const updatedArray = state.userRoleList.map(item => {
                if (item.id === action?.payload?.data?.id) {
                    return action?.payload?.data;
                }
                return item;
            });
            state.userRoleList = updatedArray
        },

        RemoveUserRole(state, action) {
            const filterSelectedUserRole = state.userRoleList.filter(x => x.id !== action.payload.data.id)
            state.userRoleList = filterSelectedUserRole;
            state.archiveUserRoleList = [...state.archiveUserRoleList, action.payload.data];
        },
        ReActivateUserRole(state, action) {
            const filterSelectedUserRole = state.archiveUserRoleList.filter(x => x.id !== action.payload.data.id)
            state.archiveUserRoleList = filterSelectedUserRole;
            state.userRoleList = [...state.userRoleList, action.payload.data];
        },

        apiError(state, action) {
            state.ApiError = action.payload.data;
        },

        setFeildsError(state, action) {
            state.feildsError = action.payload.data;
        },

        setApiSuccess(state, action) {
            state.ApiSuccess = action.payload.data;
        },

        setApiLoading(state, action) {
            state.ApiLoading = action.payload.data;
        },
    },
});

export const {
    apiError,
    setUserRoleList,
    setArchiveUserRoleList,
    addUserRoleList,
    updateUserRoleList,
    RemoveUserRole,
    ReActivateUserRole,
    setPermissions,
    setFeildsError,
    setApiSuccess,
    setApiLoading
} = updateUserRoleDataSlice.actions

export default updateUserRoleDataSlice.reducer;