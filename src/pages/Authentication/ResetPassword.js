import PropTypes from "prop-types";
import React, { useState } from "react";
import { Row, Col, Alert, Card, CardBody, Container, Input, Label, Button, Spinner } from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import withRouter from "../../Components/Common/withRouter";

// action
import { userResetPassword } from "../../slices/thunks";

// import images
// import profile from "../../assets/images/bg.png";
import logoLight from "../../assets/images/logo-light.png";
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import { createSelector } from "reselect";
import { useEffect } from "react";
import { setApiSuccess } from "../../slices/auth/resetpwd/reducer";
import { ToastContainer, toast } from "react-toastify";

const ResetPassword = props => {
    const location = useLocation();
    const navigate = useNavigate();

    // Access the state data from the route
    // const { token, userId } = location.state;
    let token;
    let userId;

    if (location.state !== null) {
        ({ token, userId } = location.state);
    }
    const dispatch = useDispatch();
    const initialValues = {
        password: '',
        password_confirmation: ''
    }

    const [formData, setFormData] = useState(initialValues)
    const [allError, setAllError] = useState(null)
    const [isClassAdded, setIsClassAdded] = useState(false);
    const [passwordShow, setPasswordShow] = useState(false);
    const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);

    const selectLayoutState = (state) => state.ResetPassword;
    const selectLayoutProperties = createSelector(
        selectLayoutState,
        (state) => ({
            resetError: state.resetError,
            resetSuccessMsg: state.resetSuccessMsg,
            ApiLoading: state.ApiLoading,
            ApiSuccess: state.ApiSuccess,
        })
    );
    // Inside your component
    const {
        resetError, resetSuccessMsg, ApiLoading, ApiSuccess
    } = useSelector(selectLayoutProperties);


    useEffect(() => {
        if (ApiSuccess) {

            toast.success('Password Updated Successfully, Redirecting...', { autoClose: 3000 });
            setTimeout(() => { toast.clearWaitingQueue(); navigate('/Login') }, 3000);
            dispatch(setApiSuccess({ data: false }))
        }
    }, [ApiSuccess])


    const handleChange = (e) => {
        setAllError(null)
        setIsClassAdded(false)
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const handleButtonClick = () => {
        if (!isClassAdded) {
            setIsClassAdded(true);
        }
    };

    const handleInvalid = (event) => {
        event.preventDefault()
        if (event.target.validity.valueMissing) {
            setAllError({ ...allError, [event.target.name]: 'This Feild Is Required' })
        }
        if (event.target.validity.tooShort || event.target.validity.rangeUnderflow) {
            setAllError({ ...allError, [event.target.name]: 'Minimum 8 characters are required' })
        }
    };
    const onSubmit = () => {
        if (formData?.password && formData?.password?.length > 7 && (formData?.password == formData?.password_confirmation)) {
            setAllError({ ...allError, password_confirmation: '', password: '' })

            let data = new FormData();
            data.append('token', token);
            data.append('user_id', userId);
            data.append('password', formData?.password);


            dispatch(userResetPassword(data, props.history));
        }
        else {
            if (formData?.password?.length < 8) {
                setAllError({ ...allError, password: 'Minimum 8 characters are required' })
            }
            if (formData?.password && (formData?.password !== formData?.password_confirmation)) {
                setAllError({ ...allError, password_confirmation: 'Paswword Does Not Match' })
            }
        }
    }

    document.title = "Reset Password | softbrix - Admin & Dashboard";
    return (
        <ParticlesAuth>
            {token && userId ?
                <div className="auth-page-content mt-lg-5">

                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="text-center mt-sm-5 mb-4 text-white-50">
                                    <div>
                                        <Link to="/" className="d-inline-block auth-logo">
                                            <img src={logoLight} alt="" height="20" />
                                        </Link>
                                    </div>
                                    <p className="mt-3 fs-15 fw-medium">Admin & Dashboard</p>
                                </div>
                            </Col>
                        </Row>

                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xl={5}>
                                <Card className="mt-4">

                                    <CardBody className="p-4">
                                        <div className="text-center mt-2">
                                            <h5 className="text-primary">Reset Password?</h5>
                                            <p className="text-muted">Reset password with softbrix</p>

                                            <lord-icon
                                                src="https://cdn.lordicon.com/rhvddzym.json"
                                                trigger="loop"
                                                colors="primary:#0ab39c"
                                                className="avatar-xl"
                                                style={{ width: "120px", height: "120px" }}
                                            >
                                            </lord-icon>

                                        </div>

                                        <div className="p-2">
                                            {resetError && resetError ? (
                                                <Alert color="danger" style={{ marginTop: "13px" }}>
                                                    {resetError}
                                                </Alert>
                                            ) : null}
                                            {resetSuccessMsg ? (
                                                <Alert color="success" style={{ marginTop: "13px" }}>
                                                    {resetSuccessMsg}, Redirecting...
                                                </Alert>
                                            ) : null}
                                            <form onSubmit={(e) => {
                                                e.preventDefault()
                                                onSubmit()
                                            }} className={`row ${(isClassAdded) ? 'was-validated' : ''}`}>
                                                <div className="">
                                                    <Label className="form-label" htmlFor="currentPassword">Password</Label>
                                                    <div className="position-relative auth-pass-inputgroup mb-3">
                                                        <Input
                                                            className={`form-control ${allError?.password && 'is-invalid backend'}`}
                                                            required
                                                            placeholder="Enter Current Password"
                                                            value={formData.password}
                                                            name="password"
                                                            type={passwordShow ? "text" : "password"}
                                                            minLength={8}
                                                            title={allError?.password}
                                                            onInvalid={handleInvalid}
                                                            onChange={handleChange}
                                                        />
                                                        <div className="invalid-feedback">{allError?.password}</div>
                                                        <button className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted" type="button" id="password-addon" onClick={() => setPasswordShow(!passwordShow)}><i className="ri-eye-fill align-middle"></i></button>

                                                    </div>
                                                </div>
                                                <div className="">
                                                    <Label className="form-label" htmlFor="newPassword">New Password</Label>
                                                    <div className="position-relative auth-pass-inputgroup mb-3">
                                                        <Input
                                                            className={`form-control ${(allError?.password_confirmation) && 'is-invalid backend'}`}
                                                            required
                                                            placeholder="Enter New Password"
                                                            value={formData.password_confirmation}
                                                            name="password_confirmation"
                                                            type={confirmPasswordShow ? "text" : "password"}
                                                            minLength={8}
                                                            title={allError?.password_confirmation}
                                                            onInvalid={handleInvalid}
                                                            onChange={handleChange}
                                                        />
                                                        <div className="invalid-feedback">{allError?.password_confirmation}</div>
                                                        <button className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted" type="button" id="password-addon" onClick={() => setConfirmPasswordShow(!confirmPasswordShow)}><i className="ri-eye-fill align-middle"></i></button>
                                                    </div>
                                                </div>

                                                <Button color="success" disabled={allError ? null : ApiLoading ? true : false}
                                                    onClick={handleButtonClick} className="btn btn-success w-100" type="submit">
                                                    {ApiLoading ? <Spinner size="sm" className='me-2'> Loading... </Spinner> : null}
                                                    Change Password
                                                </Button>
                                            </form>
                                        </div>
                                    </CardBody>
                                </Card>

                                <div className="mt-4 text-center">
                                    <p className="mb-0">Back to <Link to="/login" className="fw-semibold text-primary text-decoration-underline"> Login </Link> </p>
                                </div>

                            </Col>
                        </Row>
                    </Container>
                    <ToastContainer closeButton={false} limit={1} />
                </div> :
                <Navigate to='/Login' />}
        </ParticlesAuth>
    );
};

ResetPassword.propTypes = {
    history: PropTypes.object,
};

export default withRouter(ResetPassword);
