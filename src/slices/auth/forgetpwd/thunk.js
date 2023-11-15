import { userForgetPasswordSuccess, userForgetPasswordError, setApiLoading, setApiSuccess } from "./reducer"

import {
  postForgetPassReq,
} from "../../../helpers/backend_helper";


export const userForgetPassword = (email, history) => async (dispatch) => {
  dispatch(setApiLoading({ data: true }))
  dispatch(setApiSuccess({ data: false }))
  try {
    let response = postForgetPassReq(email)

    const data = await response;

    dispatch(setApiLoading({ data: false }))

    if (data) {
      dispatch(setApiSuccess({ data: true }))
      dispatch(userForgetPasswordSuccess(
        "Reset link are sent to your mailbox, Check there"
      ))
    }
  } catch (forgetError) {
    dispatch(setApiLoading({ data: false }))
    dispatch(userForgetPasswordError(forgetError?.response?.data?.message))
  }
}