import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    allEmails: [],
    error: '',
    ApiLoading: true,
};

const defaultSlice = createSlice({
    name: "default",
    initialState,
    reducers: {
        setAllEmails(state, action) {
            state.allEmails = action.payload.data;
        },
        updateEmailTempList(state, action) {
            // Update the object with id 2
            const updatedArray = state.allEmails.map(item => {
                if (item.id === action?.payload?.data?.id) {
                    return action?.payload?.data;
                }
                return item;
            });
            state.allEmails = updatedArray
        },
        apiError(state, action) {
            state.error = action.payload.data;
        },
        setFeildsError(state, action) {
            state.feildsError = action.payload.data;
        },
        setApiLoading(state, action) {
            state.ApiLoading = action.payload.data;
        },

        setApiSuccess(state, action) {
            state.ApiSuccess = action.payload.data;
        },
    },
});

export const {
    setAllEmails,
    updateEmailTempList,
    setFeildsError,
    apiError,
    setApiLoading,
    setApiSuccess,
} = defaultSlice.actions

export default defaultSlice.reducer;