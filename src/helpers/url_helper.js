
//Auth
export const POST_LOGIN = "/login";
export const POST_FORGOT_PASS_REQ = "/users/reset-password";
export const RESET_PSSWORD = "/users/update-password";
export const UPDATE_PROFILE_DATA = "/my-settings/save";
export const UPDATE_PROFILE_ADDITIONAL_DATA = "/my-settings/save-contact-info";
export const UPDATE_PASSWORD = "/my-settings/change-password";
export const LOGOUT = "/logout";

//Company Data
export const GET_COMPANY_DATA = "/company/list";
export const GET_SINGLE_COMPANY_DATA = "/company/getSingle";
export const POST_COMPANY_DATA = "/company/save";
export const UPDATE_COMPANY_DATA = "/company/update";
export const SET_LOGGEDIN_COMPANY = "/company/switch-company";
export const SET_DEFAULT_COMPANY = "/company/make-default";
export const SET_ARCHIVE_COMPANY = "/company/archive";
export const GET_ARCHIVE_COMPANY = "/company/get-archive";
export const SET_ACTIVATE_COMPANY = "/company/re-activate";

//Module Data
export const GET_MODULE_DATA = "/modules/list";
export const ADD_MODULE_DATA = "/modules/save";
export const UPDATE_MODULE_DATA = "/modules/update";
export const SET_ARCHIVE_MODULE = "/modules/archive";
export const SET_ACTIVATE_MODULE = "/modules/re-activate";

//Designation Data
export const GET_DESIGNATION_DATA = "/designation/list";
export const GET_ARCHIVED_DESIGNATION_DATA = "/designation/get-archive";
export const ADD_DESIGNATION_DATA = "/designation/save";
export const UPDATE_DESIGNATION_DATA = "/designation/update";
export const SET_ARCHIVE_DESIGNATION = "/designation/archive";
export const SET_ACTIVATE_DESIGNATION = "/designation/re-activate";

//User Roles Data
export const GET_USERROLE_DATA = "/user-role/list";
export const GET_ARCHIVED_USERROLE_DATA = "/user-role/get-archive";
export const ADD_USERROLE_DATA = "/user-role/save";
export const UPDATE_USERROLE_DATA = "/user-role/update";
export const SET_ARCHIVE_USERROLE = "/user-role/archive";
export const SET_ACTIVATE_USERROLE = "/user-role/re-activate";
export const GET_PERMISSION_DATA = "/user-role/get-user-role-permission";
export const UPATE_PERMISSION_DATA = "/user-role/update-user-role-permission";

//User Data
export const GET_USER_DATA = "/users/list";
export const GET_ARCHIVED_USER_DATA = "/users/get-archive";
export const ADD_USER_DATA = "/users/save";
export const UPDATE_USER_DATA = "/users/update";
export const UPDATE_USER_ADDITIONAL_DATA = "/users/update/settings/save-info";
export const UPDATE_USER_PASSWORD_DATA = "/users/update/settings/change-password";
export const SET_ARCHIVE_USER = "/users/archive";
export const SET_ACTIVATE_USER = "/users/re-activate";
export const SET_USER_SETTING = "/users/update/user-layout-setting";
export const SET_USER_LANG = "/users/change_language";


//email temp
export const GET_ALL_EMAIL_TEMP = "/email-templates/list";
export const UPDATE_EMAIL_TEMP = "/email-templates/update";


//default

//Module Permision
export const GET_MODULE_PERMISION = "/user-role/get-user-role-permission";

//DATE FORMAT
export const GET_DATE_FORMAT = "/default-dateformats/list";
//COUNTRY LIST
export const GET_COUNTRY_LIST = "/country/list";
//STATE LIST
export const GET_STATE_LIST = "/state/get-states-by-country_id";
//CITY LIST
export const GET_CITY_LIST = "/city/get-cities-by-state_id";
//DESIGNATION LIST
export const GET_DESIGNATION_LIST = "/default-desingations/list";
//LANGUAGES LIST
export const GET_LANGUAGES_LIST = "/language/system-languages";