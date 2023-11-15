import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  forgetSuccessMsg: null,
  forgetError: null,
};

const forgotPasswordSlice = createSlice({
  name: "forgotpwd",
  initialState,
  reducers: {
    userForgetPasswordSuccess(state, action) {
      state.forgetSuccessMsg = action.payload
      state.forgetError = ''
    },
    userForgetPasswordError(state, action) {
      state.forgetSuccessMsg = ''
      state.forgetError = action.payload
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
  userForgetPasswordSuccess,
  userForgetPasswordError,
  setApiLoading,
  setApiSuccess
} = forgotPasswordSlice.actions

export default forgotPasswordSlice.reducer;
