import PropTypes from "prop-types";
import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane, Label } from "reactstrap";
import { useEffect } from "react";
import { country } from "../../common/data";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { DesignationData, UserRoleData, countriesList, statesList, citiesList, } from "../../slices/thunks";
import { useTranslation } from 'react-i18next';
import classnames from "classnames";
import { Spin } from "antd";
import moment from "moment";
import dummyUser from "../../assets/images/users/user-dummy-img.jpg";

const ViewUserDetailModal = ({ show, SelectedUser, onCloseClick }) => {
    const { t } = useTranslation();

    const dispatch = useDispatch();
    const selectLayoutState = (state) => state;
    const storeData = createSelector(
        selectLayoutState,
        (state) => ({
            countryList: state.UpdateDefaults.countryList,
            designationList: state.UpdateDesignationData.designationList,
            userRoleList: state.UpdateUserRoleData.userRoleList,
        })
    );
    // Inside your component
    const {
        countryList,
        designationList,
        userRoleList,
    } = useSelector(storeData);
    const dateFormat = JSON.parse(localStorage.getItem('loggedInCompany') || 'null')?.date_format || 'DD-MM-YYYY'

    const initialValues = {
        first_name: "",
        last_name: '',
        Loading: true,
        email: '',
        phone_country: {
            "id": 167,
            "name": "Pakistan",
            "iso2": "PK",
            "phonecode": "92",
            "flag": 1,
        },
        phone: '',
        user_role_id: '',
        img: '',
        user_designation_id: '',
        dob: moment().format(dateFormat),
        gender: 0,

        Country: {
            "id": 167,
            "name": "Pakistan",
            "iso2": "PK",
            "flag": 1,
        },
        street_address: '',
        post_code: '',
        emergency_contact_name: '',
        emergency_contact_phone: '',
        emergency_contact_relation: '',
        send_set_password_link: '',
        password: '',
        password_confirmation: '',
    }

    const [formData, setFormData] = useState(initialValues)
    const [activeTab, setactiveTab] = useState(1);
    useEffect(() => {

        if (!designationList?.length) {
            dispatch(DesignationData());
        }
        if (!userRoleList?.length) {
            dispatch(UserRoleData());
        }

    }, [])

    const Set_Detail = (countries) => {
        return new Promise((resolve, reject) => {
            const phone_country = countries.find(x => x.phonecode == SelectedUser?.country_code);
            let Country = null
            let State = null;
            let City = null;
            if (SelectedUser?.user_meta) {
                if (SelectedUser?.user_meta?.country_id) {
                    Country = countries.find(x => x.id == JSON.parse(SelectedUser?.user_meta?.country_id));
                }
                dispatch(statesList(Country?.id)).then(res => {
                    if (res.success) {
                        if (SelectedUser?.user_meta?.state_id) {
                            State = res.list.find(x => x.id == JSON.parse(SelectedUser?.user_meta?.state_id));
                            dispatch(citiesList(State.id)).then(res => {
                                if (res.success) {
                                    if (SelectedUser?.user_meta?.city) {
                                        City = res.list.find(x => x.id == JSON.parse(SelectedUser?.user_meta?.city));
                                    }
                                    // return all data everything is here
                                    let data = { phone_country, Country, State, City };
                                    resolve(data);
                                }
                            });
                        } else {
                            // return all data no need to fetch cities
                            let data = { phone_country, Country, State, City };
                            resolve(data);
                        }
                    }
                });
            } else {
                //return Company detail
                let data = { phone_country, Country, State, City };
                resolve(data);
            }
        });
    };

    useEffect(() => {

        if (SelectedUser) {

            if (!countryList?.length) {

                dispatch(countriesList()).then(res => {
                    if (res.success) {
                        Set_Detail(res.list)
                            .then(newData => {
                                setFormData({ ...SelectedUser, ...SelectedUser.user_meta, ...newData, Loading: false })
                            })
                            .catch(error => {
                                console.error(error);
                            });
                    }
                })
            }
            else {
                Set_Detail(countryList)
                    .then(newData => {
                        setFormData({ ...SelectedUser, ...SelectedUser.user_meta, ...newData, Loading: false })
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        }

    }, [SelectedUser])

    function toggleTab(tab) {
        if (activeTab !== tab) {

            if (tab >= 1 && tab <= 4) {
                setactiveTab(tab);
            }
        }
    }





    return (
        <Modal size="xl" fade={true} isOpen={show} toggle={onCloseClick} centered={true} className="fullHeight">
            <ModalHeader toggle={onCloseClick} tag="h5" className="p-3 bg-info-subtle modal-title">
                {t('user_view_btn')}
            </ModalHeader>
            <ModalBody className="py-3 px-5">

                <Row className="gy-5">
                    <Col lg={3}>
                        <Nav
                            className="flex-column custom-nav nav-pills"
                        >
                            <NavItem>
                                <NavLink
                                    href="#"
                                    className={
                                        (classnames({
                                            active: activeTab === 1,
                                            done: (activeTab == 1)
                                        }))
                                    }
                                    onClick={() => {
                                        toggleTab(1);
                                    }}
                                >
                                    {t('btn_general_info')}
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    href="#"
                                    className={
                                        (classnames({
                                            active: activeTab === 2,
                                            done: (activeTab == 2)
                                        }))
                                    }
                                    onClick={() => {
                                        toggleTab(2);
                                    }}
                                >
                                    {t('btn_additional_info')}
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Col>
                    <Col lg={9}>
                        {!formData.Loading ?
                            <div className="px-lg-4">
                                < TabContent activeTab={activeTab}>
                                    <TabPane tabId={1}>
                                        <div >

                                            <h5 className="mb-4">{t('btn_general_info')}</h5>
                                        </div>
                                        {activeTab == 1 &&
                                            <div className="fullHeightDiv">
                                                <Row className="g-3">
                                                    <div className="col-12 col-md-6 col-lg-4 text-center">

                                                        <div className="profile-user position-relative d-inline-block mx-auto">

                                                            {(formData.profile_photo || formData?.img) ?
                                                                <img src={formData?.profile_photo || dummyUser} width='100px' className="object-fit-cover rounded-circle avatar-xl img-thumbnail user-profile-image" alt='' />
                                                                : <div className="Custom_Logo bg-info-subtle  rounded-circle">
                                                                    <p className="mb-0 text-center text-info" >{(formData.first_name[0] + '' + formData?.last_name[0]).toUpperCase()}</p>
                                                                </div>}
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-md-6 col-lg-8 row g-3">

                                                        <div className="col-12 col-sm-6 col-md-12 col-lg-6">
                                                            <Label htmlFor="first_name" className="form-label"> {t('placeholder_first_name')}</Label>
                                                            <p className="mb-0" >{formData?.first_name}</p>
                                                        </div>

                                                        <div className="col-12 col-sm-6 col-md-12 col-lg-6">
                                                            <Label htmlFor="middle_name" className="form-label"> {t('placeholder_middle_name')}</Label>
                                                            <p className="mb-0" >{formData?.middle_name}</p>
                                                        </div>

                                                        <div className="col-12 col-sm-6 col-md-12 col-lg-6 d-none d-sm-block d-md-none d-lg-block">
                                                            <Label htmlFor="last_name" className="form-label"> {t('placeholder_last_name')}</Label>
                                                            <p className="mb-0" >{formData?.last_name}</p>
                                                        </div>

                                                        <div className="col-12 col-sm-6 col-md-12 col-lg-6 d-none d-sm-block d-md-none d-lg-block">
                                                            <Label htmlFor="name" className="form-label"> {t('placeholder_display_name')}</Label>
                                                            <p className="mb-0" >{formData?.name}</p>
                                                        </div>

                                                    </div>


                                                    <div className="col-12 col-sm-6 col-lg-6 d-block d-sm-none d-md-block d-lg-none">
                                                        <Label htmlFor="last_name" className="form-label"> {t('placeholder_last_name')}</Label>
                                                        <p className="mb-0" >{formData?.last_name}</p>
                                                    </div>

                                                    <div className="col-12 col-sm-6 col-lg-6 d-block d-sm-none d-md-block d-lg-none">
                                                        <Label htmlFor="name" className="form-label"> {t('placeholder_display_name')}</Label>
                                                        <p className="mb-0" >{formData?.name}</p>
                                                    </div>

                                                    <div className="col-12 col-sm-6 col-lg-4">
                                                        <Label htmlFor="email" className="form-label"> {t('placeholder_email')}</Label>
                                                        <p className="mb-0" >{formData.email}</p>
                                                    </div>
                                                    {console.log({ formData })}
                                                    <div className="col-12 col-sm-6 col-lg-4">
                                                        <Label htmlFor="phone" className="form-label">{t('placeholder_phone')}</Label>
                                                        {formData.phone && <p><img src={country[formData.phone_country?.iso2?.toLowerCase()]?.flagImg} alt="flag" className="options-flagimg d-lg-none d-xl-inline" height="20" />
                                                            <span className="countrylist-codeno text-muted"> +{formData.phone_country?.phonecode}{formData.phone}</span></p>}
                                                    </div>

                                                    <div className="col-12 col-sm-6 col-lg-4">
                                                        <Label htmlFor="dob" className="form-label">{t('placeholder_dob')}</Label>
                                                        {formData.dob && <p className="mb-0" > {moment(formData.dob, dateFormat)._i}</p>}
                                                    </div>

                                                    <div className="col-12 col-sm-6 col-lg-4">
                                                        <Label htmlFor="gender" className="form-label">{t('label_gender')}</Label>
                                                        <p className="mb-0" >{formData?.gender === null ? "Empty" : formData?.gender === 1 ? "Male" : formData?.gender === 2 ? "Female" : "Other"}</p>
                                                    </div>

                                                    <div className="col-12 col-sm-6 col-lg-4">
                                                        <Label htmlFor="user_designation_id" className="form-label">{t('designation_singular')}</Label>
                                                        <p>{designationList.find(x => x.id == formData.user_designation_id)?.title}</p>
                                                    </div>

                                                    <div className="col-12 col-sm-6 col-lg-4">
                                                        <Label htmlFor="user_role_id" className="form-label">{t('user_role_singular')}</Label>
                                                        <p>{userRoleList.find(x => x.id == formData?.user_role_id)?.title}</p>
                                                    </div>
                                                </Row>
                                            </div>}


                                        <div className="d-flex justify-content-between gap-3 mt-4">
                                            <button
                                                type="button"
                                                onClick={onCloseClick}
                                                className="btn btn-light "

                                            >
                                                {t('close')}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => toggleTab(activeTab + 1)}
                                                className="btn btn-success btn-label right">
                                                <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                                                {t('next')}
                                            </button>
                                        </div>

                                    </TabPane>

                                    <TabPane tabId={2}>
                                        <div >

                                            <h5 className="mb-4">{t('btn_additional_info')}</h5>
                                        </div>
                                        {activeTab == 2 &&
                                            <div className="fullHeightDiv">
                                                <Row className="g-3">
                                                    <div className="col-12 col-md-6 col-lg-4">
                                                        <Label className="form-label">{t('label_country')}</Label>
                                                        {formData?.Country && <p className="mb-0"><img src={country[formData.Country?.iso2?.toLowerCase()]?.flagImg} alt="flag" className="options-flagimg d-inline me-2" height="20" />{formData?.Country?.name}</p>}
                                                    </div>

                                                    <div className="col-12 col-md-6 col-lg-4">
                                                        <Label className="form-label">{t('label_state')}</Label>
                                                        <p className="mb-0">{formData?.State?.name}</p>
                                                    </div>

                                                    <div className="col-12 col-md-6 col-lg-4">
                                                        <Label className="form-label">{t('label_city')}</Label>
                                                        <p className="mb-0">{formData?.City?.name}</p>
                                                    </div>

                                                    <div className="col-12 col-lg-8">
                                                        <Label htmlFor="street_address" className="form-label"> {t('placeholder_street_address')}</Label>
                                                        <p className="mb-0">{formData.street_address}</p>
                                                    </div>

                                                    <div className="col-12 col-md-6 col-lg-4">
                                                        <Label htmlFor="post_code" className="form-label"> {t('placeholder_post_code')}</Label>
                                                        <p className="mb-0">{formData?.post_code}</p>
                                                    </div>

                                                    <div className="col-12 col-md-6 col-lg-4">
                                                        <Label htmlFor="emergency_contact_name" className="form-label"> {t('placeholder_emergency_contact_name')}</Label>
                                                        <p className="mb-0">{formData?.emergency_contact_name}</p>
                                                    </div>

                                                    <div className="col-12 col-md-6 col-lg-4">
                                                        <Label htmlFor="emergency_contact_phone" className="form-label"> {t('placeholder_emergency_contact_phone')}</Label>
                                                        <p className="mb-0">{formData?.emergency_contact_phone}</p>
                                                    </div>

                                                    <div className="col-12 col-md-6 col-lg-4">
                                                        <Label htmlFor="emergency_contact_relation" className="form-label"> {t('placeholder_emergency_contact_relation')}</Label>
                                                        <p className="mb-0">{formData?.emergency_contact_relation}</p>
                                                    </div>

                                                </Row>
                                            </div>}
                                        <div className="d-flex justify-content-between gap-3 mt-4">
                                            <div className="d-flex gap-3">


                                                <button
                                                    type="button"
                                                    onClick={onCloseClick}
                                                    className="btn btn-light "

                                                >
                                                    {t('close')}
                                                </button>
                                            </div>
                                            <button
                                                type="button"
                                                className="btn btn-light btn-label previestab"
                                                onClick={() => {
                                                    toggleTab(activeTab - 1);
                                                }}
                                            >
                                                <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>{" "}
                                                {t('back')}
                                            </button>
                                        </div>
                                    </TabPane>
                                </TabContent>
                            </div> :
                            <div className="d-flex justify-content-center align-items-center h-100">

                                <Spin />
                            </div>}

                    </Col>

                </Row >


            </ModalBody >
        </Modal >
    );
};

ViewUserDetailModal.propTypes = {
    onCloseClick: PropTypes.func,
    onDeleteClick: PropTypes.func,
    show: PropTypes.any,
};

export default ViewUserDetailModal;