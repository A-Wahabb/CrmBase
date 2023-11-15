import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Container, Input, Label, Row, Button, Form, FormFeedback, Alert, Spinner } from 'reactstrap';
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link, Navigate, useNavigate } from "react-router-dom";
import withRouter from "../../Components/Common/withRouter";
// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

// actions
import { loginUser, resetLoginFlag } from "../../slices/thunks";

import logoLight from "../../assets/images/logo-light.png";
import { createSelector } from 'reselect';
import { ToastContainer } from 'react-toastify';
//import images

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const selectLayoutState = (state) => state;
    const initialValues = {
        email: '',
        password: ''
    }

    const [formData, setFormData] = useState(initialValues)
    const [allError, setAllError] = useState(null)
    const [isClassAdded, setIsClassAdded] = useState(false);
    const loginpageData = createSelector(
        selectLayoutState,
        (state) => ({
            user: state.Profile.user,
            error: state.Login.error,
            loading: state.Login.loading,
            errorMsg: state.Login.errorMsg,
        })
    );
    // Inside your component
    const {
        user, error, loading, errorMsg
    } = useSelector(loginpageData);

    const [passwordShow, setPasswordShow] = useState(false);




    useEffect(() => {
        if (errorMsg) {
            setTimeout(() => {
                dispatch(resetLoginFlag());
            }, 3000);
        }
    }, [dispatch, errorMsg]);


    const handleChange = (e) => {
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

    const onSubmit = () => {

        dispatch(loginUser(formData, navigate));
    }

    const handleInvalid = (event) => {
        event.preventDefault()
        if (event.target.validity.valueMissing) {
            setAllError({ ...allError, [event.target.name]: 'This Feild Is Required' })
        }
        if (event.target.validity.typeMismatch) {
            setAllError({ ...allError, [event.target.name]: 'Email Format Does not match' })
        }
        if (event.target.validity.tooShort || event.target.validity.rangeUnderflow) {
            setAllError({ ...allError, [event.target.name]: 'Minimum 8 characters are required' })
        }

    };


    document.title = "Basic SignIn | softbrix - Admin & Dashboard";
    return (
        <React.Fragment>
            {JSON.stringify(user) == '{}' ?
                <ParticlesAuth>
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
                                        <p className="mt-3 fs-15 fw-medium">softbrix Admin & Dashboard</p>
                                    </div>
                                </Col>
                            </Row>

                            <Row className="justify-content-center">
                                <Col md={8} lg={6} xl={5}>
                                    <Card className="mt-4">
                                        <CardBody className="p-4">
                                            <div className="text-center mt-2">
                                                <h5 className="text-primary">Welcome Back !</h5>
                                                <p className="text-muted">Sign in to continue to softbrix.</p>
                                            </div>
                                            {error && error ? (<Alert color="danger"> {error} </Alert>) : null}
                                            <div className="p-2 mt-4">

                                                <form onSubmit={(e) => {
                                                    e.preventDefault()
                                                    onSubmit()
                                                }} className={`row ${(isClassAdded) ? 'was-validated' : ''}`}>

                                                    <div className="mb-3">
                                                        <Label htmlFor="email" className="form-label">Email</Label>
                                                        <Input
                                                            type="email"
                                                            className={`form-control`}
                                                            required
                                                            placeholder='Enter Email'
                                                            value={formData.email}
                                                            onInvalid={handleInvalid}
                                                            name="email"
                                                            onChange={handleChange}
                                                        />
                                                        <div className="invalid-feedback">{allError?.email}</div>
                                                    </div>

                                                    <div className="mb-3">
                                                        <div className="float-end">
                                                            <Link to="/forgot-password" className="text-muted">Forgot password?</Link>
                                                        </div>
                                                        <Label className="form-label" htmlFor="password-input">Password</Label>
                                                        <div className="position-relative auth-pass-inputgroup mb-3">
                                                            <Input
                                                                className={`form-control`}
                                                                required
                                                                placeholder="Enter Current Password"
                                                                value={formData.password}
                                                                name="password"
                                                                type={passwordShow ? "text" : "password"}
                                                                minLength={6}
                                                                title={allError?.password}
                                                                onInvalid={handleInvalid}
                                                                onChange={handleChange}
                                                            />
                                                            <div className="invalid-feedback">{allError?.password}</div>
                                                            <button className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted" type="button" id="password-addon" onClick={() => setPasswordShow(!passwordShow)}><i className="ri-eye-fill align-middle"></i></button>
                                                        </div>
                                                    </div>

                                                    <div className="form-check">
                                                        <Input className="form-check-input" type="checkbox" value="" id="auth-remember-check" />
                                                        <Label className="form-check-label" htmlFor="auth-remember-check">Remember me</Label>
                                                    </div>

                                                    <div className="mt-4">
                                                        <Button color="success" disabled={error ? null : loading ? true : false}
                                                            onClick={handleButtonClick} className="btn btn-success w-100" type="submit">

                                                            {loading ? <Spinner size="sm" className='me-2'> Loading... </Spinner> : null}
                                                            Sign In
                                                        </Button>
                                                    </div>
                                                </form>
                                            </div>
                                        </CardBody>
                                    </Card>

                                </Col>
                            </Row>
                        </Container>
                    </div>
                    <ToastContainer closeButton={false} limit={1} />
                </ParticlesAuth>
                : <Navigate to='/home' />
            }
        </React.Fragment>
    );
};

export default withRouter(Login);