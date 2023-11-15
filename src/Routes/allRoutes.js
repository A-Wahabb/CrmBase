import React from "react";
import { Navigate } from "react-router-dom";


//login
import Login from "../pages/Authentication/Login";
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import Logout from "../pages/Authentication/Logout";



// User Profile
import ResetPassword from "../pages/Authentication/ResetPassword";
import ResetPassWrapper from "../pages/Authentication/ResetPassWrapper";

import CompanyListing from "../pages/Company/CompaniesList";
import ModuleListing from "../pages/Module/ModuleListing";
import DesignationListing from "../pages/Designation/DesignationListing";
import UserRoleListing from "../pages/User_Roles/UserRolesListing";
import UserListing from "../pages/User/UserListing";
import EmailTemplate from "../pages/EmailTemplate/EmailTempListing";
import Dashboard from "../pages/Dashboard";
import UnAuthorizeUser from "../pages/Authentication/UnAuthorizeUser";

const authProtectedRoutes = [
  { path: "/home", component: <Dashboard /> },
  { path: "/company/list", component: <CompanyListing /> },
  { path: "/module/list", component: <ModuleListing /> },
  { path: "/designation/list", component: <DesignationListing /> },
  { path: "/user-role/list", component: <UserRoleListing /> },
  { path: "/users/list", component: <UserListing /> },
  { path: "/email-templates/list", component: <EmailTemplate /> },




  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: <Navigate to="/home" />,
  },
  { path: "*", component: <Navigate to="/home" /> },
];

const publicRoutes = [
  // Authentication Page
  { path: "/logout-user", component: <UnAuthorizeUser /> },
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/reset_password/:token/:userId", component: <ResetPassWrapper /> },
  { path: "/reset_password", component: <ResetPassword /> },
  { path: "/forgot-password", component: <ForgetPasswordPage /> },


];

export { authProtectedRoutes, publicRoutes };