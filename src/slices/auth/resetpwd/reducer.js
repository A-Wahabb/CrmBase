import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  resetSuccessMsg: null,
  resetError: null,
  ApiLoading: false,
  ApiSuccess: false
};

const resetPasswordSlice = createSlice({
  name: "resetpwd",
  initialState,
  reducers: {
    userResetPasswordSuccess(state, action) {
      state.resetSuccessMsg = action.payload
    },
    userResetPasswordError(state, action) {
      state.resetError = action.payload
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
  userResetPasswordSuccess,
  userResetPasswordError,
  setApiLoading,
  setApiSuccess
} = resetPasswordSlice.actions

export default resetPasswordSlice.reducer;
