import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  companyList: [],
  company: null,
  archiveCompanyList: [],
  ApiLoading: false,
  ApiSuccess: false,
  ApiError: '',
  feildsError: null
};

const updateCompanyDataSlice = createSlice({
  name: "updateCompanyData",
  initialState,
  reducers: {
    setCompanyList(state, action) {
      state.companyList = action.payload.data || action.payload;
    },
    setCompany(state, action) {
      state.company = action.payload.data || action.payload;
    },
    setArchiveCompanyList(state, action) {
      state.archiveCompanyList = action.payload.data || action.payload;
    },

    AddCompany(state, action) {
      state.companyList = [...state.companyList, action.payload.data];
    },
    RemoveCompany(state, action) {
      const filterSelectedCompany = state.companyList.filter(x => x.id !== action.payload.data.id)
      state.companyList = filterSelectedCompany;
      state.archiveCompanyList = [...state.archiveCompanyList, action.payload.data];
    },
    ReActivateCompany(state, action) {
      const filterSelectedCompany = state.archiveCompanyList.filter(x => x.id !== action.payload.data.id)
      state.archiveCompanyList = filterSelectedCompany;
      state.companyList = [...state.companyList, action.payload.data];
    },

    UpdateCompany(state, action) {
      const updatedCompanyList = state.companyList.map(obj => {
        if (obj.id === action.payload.data.id) {
          return action.payload.data;
        } else {
          return obj;
        }
      });
      state.companyList = updatedCompanyList;
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
  },
});

export const {
  apiError,
  setCompanyList,
  setCompany,
  setArchiveCompanyList,
  setApiLoading,
  setApiSuccess,
  AddCompany,
  UpdateCompany,
  RemoveCompany,
  ReActivateCompany,
  setFeildsError
} = updateCompanyDataSlice.actions

export default updateCompanyDataSlice.reducer;