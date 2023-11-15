import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  error: "",
  success: "",
  user: JSON.parse(localStorage.getItem("authUser")) || {},
  ApiLoading: false,
  ApiSuccess: false,
  ApiError: '',
  feildsError: null
};

const ProfileSlice = createSlice({
  name: "Profile",
  initialState,
  reducers: {
    profileSuccess(state, action) {
      const { id, added_by, added_by_name, email_verified_at, created_at, updated_at, updated_by, updated_by_name, ...userData } = action.payload.data
      localStorage.setItem("authUser", JSON.stringify(userData));
      state.success = action.payload.status;
      state.user = action.payload.data
    },
    setApiLoading(state, action) {
      state.ApiLoading = action.payload.data;
    },
    setApiSuccess(state, action) {
      state.ApiSuccess = action.payload.data;
    },

    apiError(state, action) {
      state.ApiError = action.payload.data;
    },
    setFeildsError(state, action) {
      state.feildsError = action.payload.data;
    },
    logoutProfile(state, action) {
      state.user = {};
    },
  },
});

export const {
  profileSuccess,
  setApiLoading,
  setApiSuccess,
  setFeildsError,
  logoutProfile,
} = ProfileSlice.actions

export default ProfileSlice.reducer;