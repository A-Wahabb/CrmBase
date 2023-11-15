import { useDispatch } from "react-redux";
import { logoutUserSuccess } from "../../slices/auth/login/reducer";
import { logoutProfile } from "../../slices/auth/profile/reducer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const UnAuthorizeUser = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    toast.error("Session Timeout");
    dispatch(logoutProfile())
    localStorage.clear();
    dispatch(logoutUserSuccess(true));
    useEffect(() => {
        navigate('/login')
    }, [])
    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                Session Expire

                Logging Out...
            </div>
        </>
    );
}

export default UnAuthorizeUser;