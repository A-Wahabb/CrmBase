import { userResetPasswordSuccess, userResetPasswordError, setApiLoading, setApiSuccess } from "./reducer"

import {
  postResetPass
} from "../../../helpers/backend_helper";


export const userResetPassword = (passData, history) => async (dispatch) => {
  dispatch(setApiLoading({ data: true }))
  dispatch(setApiSuccess({ data: false }))
  try {
    let response = postResetPass(passData)

    const data = await response;

    dispatch(setApiLoading({ data: false }))
    if (data) {
      dispatch(setApiSuccess({ data: true }))
      dispatch(userResetPasswordSuccess(
        "Your Password is reset"
      ))
    }
  } catch (resetError) {
    dispatch(setApiLoading({ data: false }))
    dispatch(userResetPasswordError(resetError?.response?.data?.message))
  }
}