import axios from "axios";
import { api } from "../config";
import { toast } from "react-toastify";
import UnAuthorizeUser from "../pages/Authentication/UnAuthorizeUser";

// default
axios.defaults.baseURL = api.API_URL;
// content type
axios.defaults.headers.post["Content-Type"] = "multipart/form-data;";

// content type
const token = localStorage.getItem("authUserToken") || null;
if (token)
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;

// intercepting to capture errors
axios.interceptors.response.use(
  function (response) {
    return response.data ? response.data : response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    console.log({ error })
    switch (error.response.status) {
      case 500:
        error.response.toastMessage = "Internal Server Error";
        break;
      case 401:
        error.response.toastMessage = "Session Timeout";
        window.location.href = '/logout-user'
        break;
      case 404:
        error.response.toastMessage = "Sorry! the data you are looking for could not be found";
        break;
      default:
        console.log('.............')
        error.response.toastMessage = 'Something went Wrong';
    }
    return Promise.reject(error);;
  }
);
/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token) => {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
};



class APIClient {
  /**
   * Fetches data from given url
   */

  //  get = (url, params) => {
  //   return axios.get(url, params);
  // };
  get = (url) => {

    return axios.get(url);
  };

  getAlongParam = (url, params) => {

    return axios.get(`${url}/${params}`)
  };
  /**
   * post given data to url
   */
  create = (url, data) => {
    return axios.post(url, data);
  };
  /**
   * Updates data
   */
  update = (url, data) => {
    return axios.patch(url, data);
  };

  put = (url, data) => {
    return axios.put(url, data);
  };
  /**
   * Delete
   */
  delete = (url, config) => {
    return axios.delete(url, { ...config });
  };
}
const getLoggedinUser = () => {
  const user = localStorage.getItem("authUser");
  if (!user) {
    return null;
  } else {
    return JSON.parse(user);
  }
};
const getLoggedinUserToken = () => {
  const user = localStorage.getItem("authUserToken");
  if (!user) {
    return null;
  } else {
    return user;
  }
};

export { APIClient, setAuthorization, getLoggedinUser, getLoggedinUserToken };