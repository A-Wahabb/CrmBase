import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    designationList: [],
    archiveDesignationList: [],
    ApiError: '',
    feildsError: null
};

const updateDesignationDataSlice = createSlice({
    name: "updateDesignationData",
    initialState,
    reducers: {
        setDesignationList(state, action) {
            state.designationList = action.payload.data || action.payload;
        },

        setArchiveDesignationList(state, action) {
            state.archiveDesignationList = action.payload.data || action.payload;
        },

        addDesignationList(state, action) {
            state.designationList = [...state.designationList, action.payload.data]
        },

        updateDesignationList(state, action) {
            // Update the object with id 2
            const updatedArray = state.designationList.map(item => {
                if (item.id === action?.payload?.data?.id) {
                    return action?.payload?.data;
                }
                return item;
            });
            state.designationList = updatedArray
        },

        RemoveDesignation(state, action) {
            const filterSelectedDesignation = state.designationList.filter(x => x.id !== action.payload.data.id)
            state.designationList = filterSelectedDesignation;
            state.archiveDesignationList = [...state.archiveDesignationList, action.payload.data];
        },
        ReActivateDesignation(state, action) {
            const filterSelectedDesignation = state.archiveDesignationList.filter(x => x.id !== action.payload.data.id)
            state.archiveDesignationList = filterSelectedDesignation;
            state.designationList = [...state.designationList, action.payload.data];
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
    setDesignationList,
    setArchiveDesignationList,
    addDesignationList,
    updateDesignationList,
    RemoveDesignation,
    ReActivateDesignation,
    setFeildsError,
    setApiSuccess,
    setApiLoading
} = updateDesignationDataSlice.actions

export default updateDesignationDataSlice.reducer;