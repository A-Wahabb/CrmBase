import { combineReducers } from "redux";

// Front
import LayoutReducer from "./layouts/reducer";

// Authentication
import LoginReducer from "./auth/login/reducer";
import ForgetPasswordReducer from "./auth/forgetpwd/reducer";
import ResetPasswordReducer from "./auth/resetpwd/reducer";
import ProfileReducer from "./auth/profile/reducer";

import UpdateCompanyDataReducer from "./CompanyData/reducer";
import UpdateModuleDataReducer from "./Module/reducer";
import UpdateDesignationDataReducer from "./Designation/reducer";
import UpdateUserRoleDataReducer from "./UserRole/reducer";
import UpdateUserDataReducer from "./User/reducer";
import UpdateEmailTemplateReducer from "./EmailTemplates/reducer";
import UpdateDefaultsReducer from "./defaults/reducer";


const rootReducer = combineReducers({
    Layout: LayoutReducer,
    Login: LoginReducer,
    ForgetPassword: ForgetPasswordReducer,
    ResetPassword: ResetPasswordReducer,
    UpdateCompanyData: UpdateCompanyDataReducer,
    UpdateModuleData: UpdateModuleDataReducer,
    UpdateDesignationData: UpdateDesignationDataReducer,
    UpdateUserRoleData: UpdateUserRoleDataReducer,
    UpdateUserData: UpdateUserDataReducer,
    Profile: ProfileReducer,
    UpdateEmailTemp: UpdateEmailTemplateReducer,
    UpdateDefaults: UpdateDefaultsReducer,
});

export default rootReducer;