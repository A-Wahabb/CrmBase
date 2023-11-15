import { useEffect } from "react";
import { APIClient } from "./api_helper";

import * as url from "./url_helper";

const api = new APIClient();

// Gets the logged in user data from local session
export const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

// //is user is logged in
export const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};
// Login
export const postLogin = data => api.create(url.POST_LOGIN, data);
// ForgetPassReq 
export const postForgetPassReq = data => api.getAlongParam(url.POST_FORGOT_PASS_REQ, data);
// ResetPass
export const postResetPass = data => api.create(url.RESET_PSSWORD, data);

//Profile
export const updateUserProfileData = data => api.create(url.UPDATE_PROFILE_DATA, data);
//Profile
export const updateUserProfileAdditionalData = data => api.create(url.UPDATE_PROFILE_ADDITIONAL_DATA, data);
//Profile
export const updateUserProfilePasswordData = data => api.create(url.UPDATE_PASSWORD, data);
//Profile
export const Logout = data => api.create(url.LOGOUT);

//Module Permissions
export const getModulePermissions = ID => api.getAlongParam(url.GET_MODULE_PERMISION, ID);


//Company Data
//Get Company Data
export const getCompanyData = data => api.get(url.GET_COMPANY_DATA);
//Get Single Company Data
export const getSingleCompanyData = data => api.getAlongParam(url.GET_SINGLE_COMPANY_DATA, data);
//Get Company Data
export const getArchiveCompanyData = data => api.get(url.GET_ARCHIVE_COMPANY);
//post Company Data
export const postCompanyData = data => api.create(url.POST_COMPANY_DATA, data);
//update Company Data
export const updateCompanyData = data => api.create(url.UPDATE_COMPANY_DATA, data);
//set loggedIn Company
export const setLoggedIn = ID => api.getAlongParam(url.SET_LOGGEDIN_COMPANY, ID);
//set Default Company
export const setDefault = ID => api.getAlongParam(url.SET_DEFAULT_COMPANY, ID);
//set Delete Company
export const setCompanyArchive = ID => api.getAlongParam(url.SET_ARCHIVE_COMPANY, ID);
//set Activate Company
export const setCompanyActivate = ID => api.getAlongParam(url.SET_ACTIVATE_COMPANY, ID);


//Module Data
//Get Module Data
export const getModuleData = data => api.get(url.GET_MODULE_DATA);
//add Module Data
export const addModuleData = data => api.create(url.ADD_MODULE_DATA, data);
//update Module Data
export const updateModuleData = data => api.create(url.UPDATE_MODULE_DATA, data);
//set Delete Module
export const setModuleArchive = ID => api.getAlongParam(url.SET_ARCHIVE_MODULE, ID);
//set Activate Module
export const setModuleActivate = ID => api.getAlongParam(url.SET_ACTIVATE_MODULE, ID);



//Designation Data
//Get Designation Data
export const getDesignationData = data => api.get(url.GET_DESIGNATION_DATA);
//Get Designation Data
export const getArchiveDesignationData = data => api.get(url.GET_ARCHIVED_DESIGNATION_DATA);
//Add Designation Data
export const addDesignationData = data => api.create(url.ADD_DESIGNATION_DATA, data);
//Update Designation Data
export const updateDesignationData = data => api.create(url.UPDATE_DESIGNATION_DATA, data);
//set Delete Designation
export const setDesignationArchive = ID => api.getAlongParam(url.SET_ARCHIVE_DESIGNATION, ID);
//set Activate Designation
export const setDesignationActivate = ID => api.getAlongParam(url.SET_ACTIVATE_DESIGNATION, ID);



//UserRole Data

//Get UserRole Data
export const getUserRoleData = data => api.get(url.GET_USERROLE_DATA);
//Get UserRole Data
export const getArchiveUserRoleData = data => api.get(url.GET_ARCHIVED_USERROLE_DATA);
//Add UserRole Data
export const addUserRoleData = data => api.create(url.ADD_USERROLE_DATA, data);
//Update UserRole Data
export const updateUserRoleData = data => api.create(url.UPDATE_USERROLE_DATA, data);
//set Delete UserRole
export const setUserRoleArchive = ID => api.getAlongParam(url.SET_ARCHIVE_USERROLE, ID);
//set Activate UserRole
export const setUserRoleActivate = ID => api.getAlongParam(url.SET_ACTIVATE_USERROLE, ID);
//set Activate UserRole
export const getPermissions = ID => api.getAlongParam(url.GET_PERMISSION_DATA, ID);
//set Activate UserRole
export const updatePermissions = data => api.create(url.UPATE_PERMISSION_DATA, data);

//User Data
//Get User Data
export const getUserData = data => api.get(url.GET_USER_DATA);
//Get User Data
export const getArchiveUserData = data => api.get(url.GET_ARCHIVED_USER_DATA);
//Add User Data
export const addUserData = data => api.create(url.ADD_USER_DATA, data);
//Update User Data
export const updateUserData = data => api.create(url.UPDATE_USER_DATA, data);
//Update User Data
export const updateUserAdditionalData = data => api.create(url.UPDATE_USER_ADDITIONAL_DATA, data);
//Update User Data
export const updateUserPasswordData = data => api.create(url.UPDATE_USER_PASSWORD_DATA, data);
//set Delete User
export const setUserArchive = ID => api.getAlongParam(url.SET_ARCHIVE_USER, ID);
//set Activate User
export const setUserActivate = ID => api.getAlongParam(url.SET_ACTIVATE_USER, ID);
//set update User Setting
export const setUserSetting = data => api.create(url.SET_USER_SETTING, data);
//set update User Lang
export const setLanguage = data => api.create(url.SET_USER_LANG, data);



//Email Templates
export const getAllEmail = data => api.get(url.GET_ALL_EMAIL_TEMP);
export const updateEmailTempData = data => api.create(url.UPDATE_EMAIL_TEMP, data);




//defaults

//Date Formats
export const getDateFormat = data => api.get(url.GET_DATE_FORMAT);
// Country List
export const getCountryList = data => api.get(url.GET_COUNTRY_LIST);
// State List
export const getStateList = ID => api.getAlongParam(url.GET_STATE_LIST, ID);
// City List
export const getCityList = ID => api.getAlongParam(url.GET_CITY_LIST, ID);
// Designations List
export const getDesignationList = data => api.get(url.GET_DESIGNATION_LIST);
// Languages List
export const getLanguagesList = data => api.get(url.GET_LANGUAGES_LIST);


