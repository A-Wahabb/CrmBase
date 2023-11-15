import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    userList: [],
    archiveUserList: [],
    ApiError: '',
    feildsError: null
};

const updateUserDataSlice = createSlice({
    name: "updateUserData",
    initialState,
    reducers: {
        setUserList(state, action) {
            state.userList = action.payload.data || action.payload;
        },

        setArchiveUserList(state, action) {
            state.archiveUserList = action.payload.data || action.payload;
        },

        addUserList(state, action) {
            state.userList = [...state.userList, action.payload.data]
        },

        updateUserList(state, action) {
            // Update the object with id 2
            const updatedArray = state.userList.map(item => {
                if (item.id === action?.payload?.data?.id) {
                    return action?.payload?.data;
                }
                return item;
            });
            state.userList = updatedArray
        },

        RemoveUser(state, action) {
            const filterSelectedUser = state.userList.filter(x => x.id !== action.payload.data.id)
            state.userList = filterSelectedUser;
            state.archiveUserList = [...state.archiveUserList, action.payload.data];
        },
        ReActivateUser(state, action) {
            const filterSelectedUser = state.archiveUserList.filter(x => x.id !== action.payload.data.id)
            state.archiveUserList = filterSelectedUser;
            state.userList = [...state.userList, action.payload.data];
        },

        apiError(state, action) {
            state.ApiError = action.payload.data;
        },

        setFeildsError(state, action) {
            state.feildsError = action.payload.data || action.payload.errors;
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
    setUserList,
    setArchiveUserList,
    addUserList,
    updateUserList,
    RemoveUser,
    ReActivateUser,
    setFeildsError,
    setApiSuccess,
    setApiLoading
} = updateUserDataSlice.actions

export default updateUserDataSlice.reducer;