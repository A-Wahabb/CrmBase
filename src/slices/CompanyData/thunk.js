
import { convertPhpToJsDateFormat } from "../../Components/Common/Functions/DataFormat";
import {
  getArchiveCompanyData,
  getCompanyData, postCompanyData, setCompanyActivate, setCompanyArchive, setDefault, setLoggedIn, updateCompanyData
} from "../../helpers/backend_helper";
import { profileSuccess } from "../auth/profile/reducer";
import { AddCompany, RemoveCompany, apiError, setApiLoading, setApiSuccess, setArchiveCompanyList, setCompanyList, ReActivateCompany, setFeildsError } from "./reducer";


export const companyData = (user) => async (dispatch) => {
  dispatch(setApiLoading({ data: true }))

  try {
    let response = getCompanyData();

    var data = await response;
    console.log({ data })
    if (data?.success) {
      dispatch(setCompanyList(data?.data?.companies))
      dispatch(profileSuccess({ data: data?.data?.user }))
      dispatch(setApiLoading({ data: false }))
    }
  } catch (error) {
    // dispatch(apiError({ data: 'Something Went Wrong' }));
  }
};

export const archivecompanyData = (user) => async (dispatch) => {

  try {
    let response = getArchiveCompanyData();

    var data = await response;
    console.log({ data })
    if (data?.success) {
      dispatch(setArchiveCompanyList(data?.data?.companies))
      dispatch(profileSuccess({ data: data?.data?.user }))
    }
  } catch (error) {
    // dispatch(apiError({ data: 'Something Went Wrong' }));
  }
};

export const addCompanyData = (value) => async (dispatch) => {
  dispatch(setApiLoading({ data: true }))
  dispatch(setApiSuccess({ data: false }))
  dispatch(setFeildsError({ data: null }));
  try {
    let response = postCompanyData(value);

    var data = await response;
    console.log({ data })
    dispatch(AddCompany(data))
    dispatch(setApiLoading({ data: false }))
    dispatch(setApiSuccess({ data: true }))
    // if (data?.success) {
    //   dispatch(setCompanyList(data))
    // }
  } catch (error) {

    dispatch(setFeildsError(error.response?.data))

    // dispatch(apiError({ data: message[0] || message }));
    dispatch(setApiLoading({ data: false }))
  }
};
export const updateCompany = (value, isLoggedInCompany) => async (dispatch) => {
  dispatch(setApiLoading({ data: true }))
  dispatch(setApiSuccess({ data: false }))
  dispatch(apiError({ data: '' }));
  try {
    let response = updateCompanyData(value);

    var data = await response;


    //To set the date format of current logged in company
    if (isLoggedInCompany) {
      const newData = convertPhpToJsDateFormat(value.get('date_format'))
      // Save newData to local storage
      let country_id = JSON.parse(localStorage.getItem('loggedInCompany')).country_id
      localStorage.setItem('loggedInCompany', JSON.stringify({ date_format: newData, country_id }));
    }



    dispatch(setCompanyList(data))
    dispatch(setApiLoading({ data: false }))
    dispatch(setApiSuccess({ data: true }))
  } catch (error) {
    console.log({ error })
    dispatch(setFeildsError(error.response?.data))
    dispatch(setApiLoading({ data: false }))
  }
};

export const setLoggedInCompany = (value, company) => async (dispatch) => {
  try {
    let response = setLoggedIn(value);

    var data = await response;

    console.log({ data })
    if (data?.success) {

      //To set the date format of current logged in company
      const newData = convertPhpToJsDateFormat(company.date_format)

      // Save newData to local storage
      let country_id = JSON.parse(localStorage.getItem('loggedInCompany')).country_id
      localStorage.setItem('loggedInCompany', JSON.stringify({ date_format: newData, country_id }));


      dispatch(setCompanyList(data?.data?.companies))
      dispatch(profileSuccess({ data: data?.data?.user }))
    }
  } catch (error) {
    console.log('error', error)
    let message = Object.values(error.response?.data?.data)[0]

    dispatch(apiError({ data: message[0] || message }));
  }
};
export const setDefaultCompany = (value) => async (dispatch) => {
  try {
    let response = setDefault(value);

    var data = await response;

    console.log({ data })
    if (data?.success) {
      dispatch(setCompanyList(data?.data?.companies))
      dispatch(profileSuccess({ data: data?.data?.user }))
    }
  } catch (error) {
    let message = Object.values(error.response?.data?.data)[0]

    dispatch(apiError({ data: message[0] || message }));
  }
};
export const archiveCompany = (value) => async (dispatch) => {
  dispatch(setApiLoading({ data: true }))
  dispatch(apiError({ data: '' }));
  try {
    let response = setCompanyArchive(value?.id);

    var data = await response;

    console.log({ data })
    if (data?.success) {
      dispatch(RemoveCompany({ data: value }))
      dispatch(setApiLoading({ data: false }))
      dispatch(setApiSuccess({ data: true }))
    }
  } catch (error) {
    let message
    if (error?.response?.data?.message_values) {
      const words = error?.response?.data?.message?.split('_').map(word => word.toLowerCase().replace(/^\w/, c => c.toUpperCase()));

      if (words[0] === 'Error') {
        words.shift();
      }
      message = words.join(' ');

    }
    else {
      message = Object.values(error.response.data.data)[0]
    }
    dispatch(setApiLoading({ data: false }))
    dispatch(apiError({ data: message[0] || message }));
  }
};
export const reActivateCompany = (value) => async (dispatch) => {
  dispatch(setApiLoading({ data: true }))
  dispatch(apiError({ data: '' }));
  try {
    let response = setCompanyActivate(value?.id);

    var data = await response;

    console.log({ data })
    if (data?.success) {
      dispatch(ReActivateCompany({ data: value }))
      dispatch(setApiLoading({ data: false }))
      dispatch(setApiSuccess({ data: true }))
    }
  } catch (error) {
    dispatch(setApiLoading({ data: false }))
    let message = Object.values(error.response?.data?.data)[0]

    dispatch(apiError({ data: message[0] || message }));
  }
};
