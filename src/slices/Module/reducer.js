import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    moduleList: [],
    ApiLoading: false,
    ApiSuccess: false,
    ApiError: '',
    feildsError: null
};

const updateModuleDataSlice = createSlice({
    name: "updateModuleData",
    initialState,
    reducers: {
        setModuleList(state, action) {
            state.moduleList = action.payload.data || action.payload;
        },

        // AddModule(state, action) {
        //     state.moduleList = [...state.moduleList, action.payload.data];
        // },
        UpdateModuleData(state, action) {

            function replaceObjectInNestedArray(array, replacementObject) {
                return array.map((obj) => {
                    if (obj.id === replacementObject.id) {
                        return replacementObject;
                    } else if (obj.children) {
                        const updatedChildren = replaceObjectInNestedArray(obj.children, replacementObject);
                        return { ...obj, children: updatedChildren };
                    } else {
                        return obj;
                    }
                });
            }
            state.moduleList = replaceObjectInNestedArray(state.moduleList, action.payload.data);
        },

        ReActivateModule(state, action) {
            const filterSelectedModule = state.archiveModuleList.filter(x => x.id !== action.payload.data.id)
            state.archiveModuleList = filterSelectedModule;
            state.moduleList = [...state.moduleList, action.payload.data];
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
    setModuleList,
    setApiLoading,
    setApiSuccess,
    ReActivateModule,
    UpdateModuleData,
    setFeildsError,
} = updateModuleDataSlice.actions

export default updateModuleDataSlice.reducer;