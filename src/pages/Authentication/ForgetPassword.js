import PropTypes from "prop-types";
import React, { useState } from "react";
import { Row, Col, Alert, Card, CardBody, Container, Label, } from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import withRouter from "../../Components/Common/withRouter";

// action
import { userForgetPassword } from "../../slices/thunks";

// import images
// import profile from "../../assets/images/bg.png";
import logoLight from "../../assets/images/logo-light.png";
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import { createSelector } from "reselect";

const ForgetPasswordPage = props => {
  const dispatch = useDispatch();
  const initialValues = {
    email: '',
  }

  const [formData, setFormData] = useState(initialValues)
  const [allError, setAllError] = useState(null)
  const [isClassAdded, setIsClassAdded] = useState(false);


  const selectLayoutState = (state) => state.ForgetPassword;
  const selectLayoutProperties = createSelector(
    selectLayoutState,
    (state) => ({
      forgetError: state.forgetError,
      forgetSuccessMsg: state.forgetSuccessMsg,
    })
  );
  // Inside your component
  const {
    forgetError, forgetSuccessMsg
  } = useSelector(selectLayoutProperties);

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

    dispatch(userForgetPassword(formData?.email, props.history));
  }

  const handleInvalid = (event) => {
    event.preventDefault()
    if (event.target.validity.valueMissing) {
      setAllError({ ...allError, [event.target.name]: 'This Feild Is Required' })
    }
    if (event.target.validity.typeMismatch) {
      setAllError({ ...allError, [event.target.name]: 'Email Format Does not match' })
    }
  };


  document.title = "Reset Password | softbrix - Admin & Dashboard";
  return (
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
                <p className="mt-3 fs-15 fw-medium">Admin & Dashboard</p>
              </div>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="mt-4">

                <CardBody className="p-4">
                  <div className="text-center mt-2">
                    <h5 className="text-primary">Forgot Password?</h5>
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

                  <Alert className="border-0 alert-warning text-center mb-2 mx-2" role="alert">
                    Enter your email and instructions will be sent to you!
                  </Alert>
                  <div className="p-2">
                    {forgetError && forgetError ? (
                      <Alert color="danger" style={{ marginTop: "13px" }}>
                        <strong>Error: </strong>{forgetError}
                      </Alert>
                    ) : null}
                    {forgetSuccessMsg ? (
                      <Alert color="success" style={{ marginTop: "13px" }}>
                        {forgetSuccessMsg}
                      </Alert>
                    ) : null}
                    <form onSubmit={(e) => {
                      e.preventDefault()
                      onSubmit()
                    }} className={`row ${(isClassAdded) ? 'was-validated' : ''}`}>
                      <div className="mb-4">
                        <Label htmlFor="email" className="form-label"> Email</Label>
                        <input
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

                      <div className="text-center mt-4">
                        <button className="btn btn-success w-100"
                          type="submit"
                          onClick={handleButtonClick}>Send Reset Link</button>
                      </div>
                    </form>
                  </div>
                </CardBody>
              </Card>

              <div className="mt-4 text-center">
                <p className="mb-0">Wait, I remember my password... <Link to="/login" className="fw-semibold text-primary text-decoration-underline"> Click here </Link> </p>
              </div>

            </Col>
          </Row>
        </Container>
      </div>
    </ParticlesAuth>
  );
};

ForgetPasswordPage.propTypes = {
  history: PropTypes.object,
};

export default withRouter(ForgetPasswordPage);
