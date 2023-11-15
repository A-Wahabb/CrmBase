import PropTypes from "prop-types";
import React, { useState } from "react";
import {
    Button, Modal, ModalBody, ModalHeader, Spinner, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane, Label, DropdownMenu, DropdownItem, Dropdown, DropdownToggle,
} from "reactstrap";
import { useEffect } from "react";
import { country } from "../../common/data";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { setApiSuccess } from "../../slices/User/reducer";
import { DesignationData, UserRoleData, countriesList, statesList, citiesList, updateUser, updateUserAdditional, updateUserPassword } from "../../slices/thunks";
import { useTranslation } from 'react-i18next';
import classnames from "classnames";
import SimpleBar from "simplebar-react";
import { DatePicker, Select, Spin } from "antd";
import moment from "moment";
import dayjs from 'dayjs';
import dummyUser from "../../assets/images/users/user-dummy-img.jpg";
import { useRef } from "react";
import { toast } from "react-toastify";
import { convertPhpToJsDateFormat } from "../../Components/Common/Functions/DataFormat";

const EditUserModal = ({ show, SelectedUser, onCancelClick, onCloseClick }) => {
    const { t } = useTranslation();

    const dispatch = useDispatch();
    const selectLayoutState = (state) => state;
    const storeData = createSelector(
        selectLayoutState,
        (state) => ({
            ApiLoading: state.UpdateUserData.ApiLoading,
            ApiSuccess: state.UpdateUserData.ApiSuccess,
            feildsError: state.UpdateUserData.feildsError,
            designationList: state.UpdateDesignationData.designationList,
            userRoleList: state.UpdateUserRoleData.userRoleList,
            countryList: state.UpdateDefaults.countryList,
            stateList: state.UpdateDefaults.stateList,
            cityList: state.UpdateDefaults.cityList,
        })
    );
    // Inside your component
    const {
        ApiLoading,
        ApiSuccess,
        feildsError,
        designationList,
        countryList,
        stateList,
        cityList,
        userRoleList
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
    const [isClassAdded, setIsClassAdded] = useState(false);
    const [phoneDropDown, setPhoneDropDown] = useState(false);
    const [countryDropDown, setCountryDropDown] = useState(false);
    const [stateDropDown, setStateDropDown] = useState(false);
    const [cityDropDown, setCityDropDown] = useState(false);
    const [filterCountry, setFilterCountry] = useState(countryList);
    const [filterState, setFilterState] = useState(stateList);
    const [filterCity, setFilterCity] = useState(stateList);
    const [passwordShow, setPasswordShow] = useState(false);
    const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
    const [allError, setAllError] = useState(null)
    const [activeTab, setactiveTab] = useState(1);
    const fileInputRef = useRef(null)


    const phoneDropdownToggle = () => setPhoneDropDown((prevState) => !prevState);
    const countryDropdownToggle = () => setCountryDropDown((prevState) => !prevState);
    const stateDropdownToggle = () => setStateDropDown((prevState) => !prevState);
    const cityDropdownToggle = () => setCityDropDown((prevState) => !prevState);

    let loggedInCompany = JSON.parse(localStorage.getItem('loggedInCompany'))
    useEffect(() => {
        // dispatch(singleCompanyData(user.login_company))

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
            const findCompanyCountry = countries.find(x => x.id == loggedInCompany.country_id);
            let Country = findCompanyCountry;
            let State = null;
            let City = null;
            if (SelectedUser?.user_meta) {
                if (SelectedUser?.user_meta?.country_id) {
                    Country = countries.find(x => x.id == JSON.parse(SelectedUser?.user_meta?.country_id));
                }
                dispatch(statesList(Country.id)).then(res => {
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
        changeTab()
        console.log({ SelectedUser })

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


    useEffect(() => {
        dispatch(statesList(formData?.Country?.id))

    }, [formData.Country])

    useEffect(() => {
        if (formData.State) {
            dispatch(citiesList(formData?.State?.id))
        }
    }, [formData.State])


    // Reset list when modal is open

    useEffect(() => {
        setFilterCountry(countryList)
        setFilterCity(cityList)
        setFilterState(stateList)
    }, [countryDropDown, stateDropDown, cityDropDown, phoneDropDown, stateList, cityList])

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target

        if (e.target.type == 'file') {
            if (files && files?.length) {
                if (files[0]?.size < 1024 * 1024) {
                    const reader = new FileReader();

                    reader.onloadend = () => {
                        setFormData({
                            ...formData,
                            profile_photo: reader.result,
                            img: files[0]
                        });
                    };

                    if (files) {
                        reader.readAsDataURL(files[0]);
                    }
                }
                else {
                    toast.error(t('msg_file_size_exceed'), { autoClose: 3000 })
                    setTimeout(() => { toast.clearWaitingQueue(); }, 3000)
                }
            }
        }
        else if (type === 'checkbox') {
            setFormData({
                ...formData,
                [name]: checked
            })
        }
        else {
            setFormData({
                ...formData,
                [name]: value
            })
        }
    }

    const resetImg = () => {
        setFormData({
            ...formData,
            profile_photo: '',
            img: ''
        });
        // Reset the file input field
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }
    }

    const handleButtonClick = () => {
        if (!isClassAdded) {
            setIsClassAdded(true);
        }
    };

    const countrySearch = (e) => {
        let str = e.target.value.toLowerCase();
        if (str !== '') {
            setFilterCountry(countryList.filter(x => x.name.toLowerCase().includes(str)))
        }
        else {
            setFilterCountry(countryList)
        }
    }

    const stateSearch = (e) => {
        let str = e.target.value.toLowerCase();
        if (str !== '') {
            setFilterState(stateList.filter(x => x.name.toLowerCase().includes(str)))
        }
        else {
            setFilterState(stateList)
        }
    }

    const citySearch = (e) => {
        let str = e.target.value.toLowerCase();
        if (str !== '') {
            setFilterCity(cityList.filter(x => x.name.toLowerCase().includes(str)))
        }
        else {
            setFilterCity(cityList)
        }
    }

    function toggleTab(tab) {
        if (activeTab !== tab) {

            if (tab >= 1 && tab <= 4) {
                setactiveTab(tab);
            }
        }
    }

    const dateChange = (date, dateString) => {
        setFormData({ ...formData, dob: dateString })
    }

    const handleInvalid = (event) => {
        event.preventDefault()
        if (event.target.validity.valueMissing) {
            setAllError({ ...allError, [event.target.name]: 'mandatory_feild' })
        }
        if (event.target.validity.typeMismatch) {
            setAllError({ ...allError, [event.target.name]: 'pattren_mismatch' })
        }
        if (event.target.validity.tooShort || event.target.validity.rangeUnderflow) {
            setAllError({ ...allError, [event.target.name]: 'min_8_required' })
        }
    };
    const onSubmit = (e) => {
        e.preventDefault()
        if (activeTab == 1) {
            if (formData?.dob) {
                setAllError({ ...allError, dob: '' })
                let date = moment(formData.dob, convertPhpToJsDateFormat('d-m-Y'))
                let data = new FormData();
                data.append('id', SelectedUser?.id);
                data.append('first_name', formData?.first_name);
                data.append('middle_name', formData?.middle_name);
                data.append('last_name', formData?.last_name);
                data.append('display_name', formData?.name);
                data.append('country_code', formData?.phone_country?.phonecode);
                data.append('phone', formData?.phone);
                data.append('dob', date._i);
                data.append('gender', formData?.gender);
                data.append('designation_id', JSON.parse(formData?.user_designation_id));
                data.append('role_id', JSON.parse(formData?.user_role_id));

                if (formData?.img) {
                    data.append('photo', formData.img);
                    data.append('remove_logo_url', 1);
                }
                else if (!formData.img && !formData.profile_photo) {
                    data.append('remove_logo_url', 1);
                }
                else {
                    data.append('remove_logo_url', 0);
                }

                const returning = dispatch(updateUser(data))
                returning.then(res => {
                    if (res && e.nativeEvent.submitter.id == 'save_next') {
                        changeTab()
                        toggleTab(activeTab + 1);
                    }
                })
            }
            else {
                setAllError({ ...allError, dob: 'mandatory_feild' })
            }
        }
        if (activeTab == 2) {
            let data = new FormData();
            data.append('id', SelectedUser?.id);


            data.append('country_id', formData?.Country?.id);
            data.append('state_id', formData?.State?.id);
            data.append('city', formData?.City?.id);
            data.append('street_address', formData?.street_address);
            data.append('post_code', formData?.post_code);
            data.append('emergency_contact_name', formData?.emergency_contact_name);
            data.append('emergency_contact_phone', formData?.emergency_contact_phone);
            data.append('emergency_contact_relation', formData?.emergency_contact_relation);


            const returning = dispatch(updateUserAdditional(data))
            returning.then(res => {
                if (res && e.nativeEvent.submitter.id == 'save_next') {
                    changeTab()
                    toggleTab(activeTab + 1);
                }
            })
        }
        if (activeTab == 3) {
            if (formData?.password && formData?.password?.length > 7 && (formData?.password == formData?.password_confirmation)) {
                setAllError({ ...allError, password_confirmation: '', password: '' })
                let data = new FormData();
                data.append('id', SelectedUser?.id);

                data.append('password', formData?.password);
                data.append('password_confirmation', formData?.password_confirmation);


                const returning = dispatch(updateUserPassword(data))
                returning.then(res => {
                    if (res && e.nativeEvent.submitter.id == 'save_next') {
                        onCloseClick()
                    }
                })
            }
            else {
                if (formData?.password?.length < 8) {
                    setAllError({ ...allError, password: 'min_8_required' })
                }
                if (formData?.password && (formData?.password !== formData?.password_confirmation)) {
                    setAllError({ ...allError, password_confirmation: 'paswword_does_not_match' })
                }
            }
        }

    }

    useEffect(() => {
        if (ApiSuccess && show) {
            dispatch(setApiSuccess({ data: false }))
            // onCloseClick()
        }
    }, [ApiSuccess])


    useEffect(() => {

        changeTab()

    }, [activeTab])

    const changeTab = () => {

        setIsClassAdded(false);
        setAllError(null)
    }


    return (
        <Modal size="xl" fade={true} isOpen={show} toggle={onCancelClick} centered={true} className="fullHeight">
            <ModalHeader toggle={onCancelClick} tag="h5" className="p-3 bg-info-subtle modal-title">
                {t('user_edit_btn')}
            </ModalHeader>
            <ModalBody className="py-3 px-5">
                <form onSubmit={onSubmit} className={`vertical-navs-step form-steps ${(isClassAdded || feildsError) ? 'was-validated' : ''}`}>

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
                                <NavItem>
                                    <NavLink
                                        href="#"
                                        className={classnames({
                                            active: activeTab === 3,
                                            done: (activeTab == 3)
                                        })}
                                        onClick={() => {
                                            toggleTab(3);
                                        }}
                                    >
                                        {t('btn_set_password')}
                                    </NavLink>
                                </NavItem>
                                {/* <NavItem>
                                    <NavLink
                                        href="#"
                                        className={classnames({
                                            active: activeTab === 4,
                                            done: (activeTab == 4)
                                        })}
                                        onClick={() => {
                                            toggleTab(4);
                                        }}
                                    >
                                        <span className="step-title me-2">
                                            <i className="ri-close-circle-fill step-icon me-2"></i>
                                            {t('btn_step')}  4
                                        </span>
                                        Finish
                                    </NavLink>
                                </NavItem> */}
                            </Nav>
                        </Col>
                        <Col lg={9}>
                            {!formData.Loading ?
                                <div className="px-lg-4">
                                    < TabContent activeTab={activeTab}>
                                        <TabPane tabId={1}>
                                            <div >

                                                <h5>{t('btn_general_info')}</h5>
                                                <p className="text-muted">
                                                    {t('btn_fill_all_information_below')}
                                                </p>
                                            </div>
                                            {activeTab == 1 &&
                                                <div className="fullHeightDiv">
                                                    <Row className="g-3">
                                                        <div className="col-12 text-center">

                                                            <div className="profile-user position-relative d-inline-block mx-auto">

                                                                {(formData.profile_photo || formData?.img) ?
                                                                    <img src={formData?.profile_photo || dummyUser} width='100px' className="object-fit-cover rounded-circle avatar-xl img-thumbnail user-profile-image" alt='' />
                                                                    : <div className="Custom_Logo bg-info-subtle  rounded-circle">
                                                                        <p className="mb-0 text-center text-info" >{(formData.first_name[0] + '' + formData?.last_name[0]).toUpperCase()}</p>
                                                                    </div>}


                                                                <div className="avatar-xs p-0 rounded-3 profile-photo-edit">
                                                                    <input id="profile-img-file-input" type="file"

                                                                        name='profile'
                                                                        onChange={handleChange}
                                                                        accept='.jpg'
                                                                        className="profile-img-file-input"
                                                                        ref={fileInputRef} />
                                                                    <Label htmlFor="profile-img-file-input"
                                                                        className="avatar-xs">
                                                                        <span className="avatar-title rounded-circle bg-light text-body cursor-pointer">
                                                                            <i className="ri-camera-fill"></i>
                                                                        </span>
                                                                    </Label>
                                                                </div>
                                                                {(formData.profile_photo || formData?.img) && <div className="avatar-xs p-0 rounded-3 profile-photo-rmv cursor-pointer" onClick={resetImg}>
                                                                    <span className="avatar-title rounded-circle bg-light text-body">
                                                                        <i className="ri-close-line"></i>
                                                                    </span>
                                                                </div>}
                                                            </div>
                                                        </div>

                                                        <div className="col-12 col-md-6 col-lg-4">
                                                            <Label htmlFor="first_name" className="form-label"> {t('placeholder_first_name')}</Label>
                                                            <input
                                                                className={`form-control ${feildsError?.first_name && 'is-invalid backend'}`}
                                                                required
                                                                maxLength={100}
                                                                placeholder={t('placeholder_first_name')}
                                                                value={formData?.first_name}
                                                                title={feildsError?.first_name || t(allError?.first_name)}
                                                                onInvalid={handleInvalid}
                                                                name="first_name"
                                                                onChange={handleChange}
                                                            />
                                                            <div className="invalid-feedback">{feildsError?.first_name || t(allError?.first_name) || t('invalid_user_first_name')}</div>
                                                        </div>

                                                        <div className="col-12 col-md-6 col-lg-4">
                                                            <Label htmlFor="middle_name" className="form-label"> {t('placeholder_middle_name')}</Label>
                                                            <input
                                                                className={`form-control ${feildsError?.middle_name && 'is-invalid backend'}`}
                                                                required
                                                                maxLength={100}
                                                                placeholder={t('placeholder_middle_name')}
                                                                value={formData?.middle_name}
                                                                title={feildsError?.middle_name || t(allError?.middle_name)}
                                                                onInvalid={handleInvalid}
                                                                name="middle_name"
                                                                onChange={handleChange}
                                                            />
                                                            <div className="invalid-feedback">{feildsError?.middle_name || t(allError?.middle_name) || t('invalid_user_middle_name')}</div>
                                                        </div>

                                                        <div className="col-12 col-md-6 col-lg-4">
                                                            <Label htmlFor="last_name" className="form-label"> {t('placeholder_last_name')}</Label>
                                                            <input
                                                                className={`form-control ${feildsError?.last_name && 'is-invalid backend'}`}
                                                                required
                                                                maxLength={100}
                                                                placeholder={t('placeholder_last_name')}
                                                                value={formData?.last_name}
                                                                title={feildsError?.last_name || t(allError?.last_name)}
                                                                onInvalid={handleInvalid}
                                                                name="last_name"
                                                                onChange={handleChange}
                                                            />
                                                            <div className="invalid-feedback">{feildsError?.last_name || t(allError?.last_name) || t('invalid_user_last_name')}</div>
                                                        </div>

                                                        <div className="col-12 col-md-6 col-lg-4">
                                                            <Label htmlFor="name" className="form-label"> {t('placeholder_display_name')}</Label>
                                                            <input
                                                                id='name'
                                                                className={`form-control ${feildsError?.display_name && 'is-invalid backend'}`}
                                                                required
                                                                maxLength={100}
                                                                placeholder={t('placeholder_display_name')}
                                                                value={formData?.name}
                                                                title={feildsError?.display_name || t(allError?.name)}
                                                                onInvalid={handleInvalid}
                                                                name="name"
                                                                onChange={handleChange}
                                                            />
                                                            <div className="invalid-feedback">{feildsError?.display_name || t(allError?.name) || t('invalid_user_display_name')}</div>
                                                        </div>

                                                        <div className="col-12 col-md-6 col-lg-4">
                                                            <Label htmlFor="email" className="form-label"> {t('placeholder_email')}</Label>
                                                            <input
                                                                type="email"
                                                                className={`form-control ${feildsError?.email && 'is-invalid backend'}`}
                                                                required
                                                                maxLength={100}
                                                                placeholder={t('placeholder_email')}
                                                                value={formData.email}
                                                                title={feildsError?.email || t(allError?.email)}
                                                                onInvalid={handleInvalid}
                                                                name="email"
                                                                onChange={handleChange}
                                                                readOnly
                                                                disabled
                                                            />
                                                            <div className="invalid-feedback">{feildsError?.email || t(allError?.email) || t('invalid_email')}</div>
                                                        </div>

                                                        <div className="col-12 col-md-6 col-lg-4">
                                                            <Label htmlFor="phone" className="form-label">{t('placeholder_phone')}</Label>
                                                            <Dropdown className='input-group' isOpen={phoneDropDown} toggle={phoneDropdownToggle}>
                                                                <DropdownToggle
                                                                    as="button"
                                                                    className="btn btn-light border arrow-none">
                                                                    <img src={country[formData.phone_country?.iso2?.toLowerCase()]?.flagImg} alt="flag" className="options-flagimg d-lg-none d-xl-inline" height="20" />
                                                                    <span className="countrylist-codeno text-muted"> +{formData.phone_country?.phonecode}</span>
                                                                </DropdownToggle>
                                                                <input type="number"
                                                                    placeholder={t('placeholder_phone')}
                                                                    className={`form-control rounded-end flag-input ${feildsError?.phone && 'is-invalid backend'}`}
                                                                    required
                                                                    min={999999999}
                                                                    value={formData.phone}
                                                                    title={feildsError?.phone || t(allError?.phone)}
                                                                    onInvalid={handleInvalid}
                                                                    name="phone"
                                                                    onChange={handleChange} />
                                                                <div className="invalid-feedback">{feildsError?.phone || t(allError?.phone) || t('invalid_user_phone')}</div>
                                                                <DropdownMenu as='ul' className="list-unstyled w-100 dropdown-menu-list mb-0">
                                                                    <SimpleBar style={{ maxHeight: "220px" }} className="px-3">
                                                                        <div className="px-3 position-fixed bg-white z-3 w-100">
                                                                            <input className="flag-search form-control" placeholder={t('placeholder_search_country')} onChange={countrySearch} />
                                                                        </div>
                                                                        {(filterCountry || []).map((item, key) => (
                                                                            <DropdownItem as='li' onClick={() => setFormData({ ...formData, phone_country: item })} key={key} className={`dropdown-item d-flex ${key == 0 && 'mt-5'}`}>
                                                                                <div className="flex-shrink-0 me-2">
                                                                                    <img src={country[item.iso2.toLowerCase()]?.flagImg} alt={item.iso2.toLowerCase()} className="options-flagimg" height="20" />
                                                                                </div>
                                                                                <div className="flex-grow-1">
                                                                                    <div className="d-flex">
                                                                                        <div className="country-name me-1">{item.name}</div>
                                                                                        <span className="countrylist-codeno text-muted">+{item.phonecode}</span>
                                                                                    </div>
                                                                                </div>
                                                                            </DropdownItem>
                                                                        ))}
                                                                        {filterCountry.length == 0 &&
                                                                            <p key={0} className={`dropdown-item d-flex mt-5`}>
                                                                                {t('msg_no_data_matched')}
                                                                            </p>}
                                                                    </SimpleBar>
                                                                </DropdownMenu>
                                                            </Dropdown>

                                                        </div>

                                                        <div className="col-12 col-md-6 col-lg-4">
                                                            <Label htmlFor="phone" className="form-label">{t('placeholder_dob')}</Label>
                                                            <DatePicker className={`form-control ${isClassAdded && (feildsError?.dob || formData.dob == '' ? 'is-invalid' : 'is-valid')}`}
                                                                defaultValue={formData?.dob ? dayjs(dayjs(formData?.dob).format(dateFormat), dateFormat) : ''}
                                                                value={formData?.dob ? dayjs(dayjs(formData?.dob).format(dateFormat), dateFormat) : ''}
                                                                placeholder={t('placeholder_dob')}
                                                                disabledDate={(current) => current && current >= dayjs().startOf('day')}
                                                                onInvalid={handleInvalid}
                                                                format={dateFormat} onChange={dateChange} />
                                                            <div className="invalid-feedback">{feildsError?.dob || t(allError?.dob) || t('invalid_dob')}</div>
                                                        </div>

                                                        <div className="col-12 col-md-6 col-lg-4">

                                                            <Label htmlFor="phone" className="form-label">{t('placeholder_gender')}</Label>
                                                            <select
                                                                onChange={handleChange}
                                                                name='gender'
                                                                value={formData?.gender}
                                                                required
                                                                onInvalid={handleInvalid}
                                                                className="form-control form-select" aria-label={t('placeholder_gender')}>
                                                                <option value=''>{t('placeholder_gender')} </option>
                                                                <option value={1}>{t('label_male')}</option>
                                                                <option value={2}>{t('label_female')}</option>
                                                                <option value={3}>{t('label_other')}</option>
                                                            </select>
                                                            <div className="invalid-feedback">{feildsError?.gender || t(allError?.gender) || t('invalid_gender')}</div>
                                                        </div>


                                                        <div className="col-12 col-md-6 col-lg-4">
                                                            <Label htmlFor="user_designation_id" className="form-label">{t('label_select_designation')}</Label>
                                                            <select
                                                                onChange={handleChange}
                                                                className={`form-control form-select ${feildsError?.user_designation_id && 'is-invalid backend'}`}
                                                                required
                                                                value={formData.user_designation_id}
                                                                name="user_designation_id"
                                                                title={feildsError?.designation_id || t(allError?.user_designation_id)}
                                                                onInvalid={handleInvalid}
                                                                aria-label={t('label_select_designation')}>
                                                                <option value="">{t('label_select_designation')}</option>
                                                                {designationList?.map(each => (
                                                                    <option key={each.id} value={each.id}>{each.title}</option>

                                                                ))}
                                                            </select>
                                                            <div className="invalid-feedback">{feildsError?.designation_id || t(allError?.user_designation_id) || t('invalid_designation_title')}</div>
                                                        </div>

                                                        <div className="col-12 col-md-6 col-lg-4">
                                                            <Label htmlFor="user_role_id" className="form-label">{t('label_select_user_role')}</Label>
                                                            <select
                                                                onChange={handleChange}
                                                                className={`form-control form-select ${feildsError?.role_id && 'is-invalid backend'}`}
                                                                required
                                                                value={formData.user_role_id}
                                                                name="user_role_id"
                                                                title={feildsError?.role_id || t(allError?.user_role_id)}
                                                                onInvalid={handleInvalid}
                                                                aria-label={t('label_select_user_role')}>
                                                                <option value="">{t('label_select_user_role')}</option>
                                                                {userRoleList?.map(each => (
                                                                    <option key={each.id} value={each.id}>{each.title}</option>

                                                                ))}
                                                            </select>
                                                            <div className="invalid-feedback">{feildsError?.role_id || t(allError?.user_role_id) || t('invalid_user_role')}</div>
                                                        </div>
                                                    </Row>
                                                </div>}

                                            <div className="text-center gap-3 mt-4">

                                                {ApiLoading ? <Spinner color="success" type="grow" > Loading... </Spinner> :
                                                    <Button id='justSave' onClick={handleButtonClick} type="submit" color="success" className="btn-animation text-center mx-2" data-text={t('save')}> <span>{t('save')}</span> </Button>}
                                                <Button onClick={onCancelClick} color="danger" outline className="btn-animation text-center mx-2" disabled={ApiLoading} data-text={t('close')}> <span>{t('close')}</span> </Button>

                                            </div>
                                        </TabPane>

                                        <TabPane tabId={2}>
                                            <div >

                                                <h5>{t('btn_additional_info')}</h5>
                                                <p className="text-muted">
                                                    {t('btn_fill_all_information_below')}
                                                </p>
                                            </div>
                                            {activeTab == 2 &&
                                                <div className="fullHeightDiv">
                                                    <Row className="g-3">
                                                        <div className="col-12 col-md-6 col-lg-4">
                                                            <Label className="form-label">{t('label_country')}</Label>
                                                            <Dropdown isOpen={countryDropDown} toggle={countryDropdownToggle}>
                                                                <DropdownToggle
                                                                    tag="div"
                                                                    caret={false} type="text" style={{ backgroundImage: `url(${country[formData.Country.iso2?.toLowerCase()]?.flagImg})` }} className={`w-100 form-control rounded-end flag-input form-select ${formData.Country && 'selected'} ${isClassAdded && (!formData.Country || feildsError?.country_id) ? 'is-invalid' : ''}`} readOnly defaultValue={formData.Country.countryName} >
                                                                    {formData.Country.name || 'Select country'}
                                                                </DropdownToggle>
                                                                <DropdownMenu as='ul' className="list-unstyled w-100 dropdown-menu-list mb-0">
                                                                    <SimpleBar style={{ maxHeight: "220px" }}>
                                                                        <div className="px-3 position-fixed bg-white z-3 w-100">
                                                                            <input className="flag-search form-control" placeholder={t('placeholder_search_country')} onChange={countrySearch} />
                                                                        </div>
                                                                        {(filterCountry || []).map((item, key) => (
                                                                            <DropdownItem as='li' onClick={() => setFormData({ ...formData, Country: item, State: null, City: null })} key={key} className={`dropdown-item d-flex ${key == 0 && 'mt-5'}`}>
                                                                                <div className="flex-shrink-0 me-2">
                                                                                    <img src={country[item.iso2.toLowerCase()]?.flagImg} alt={item.iso2.toLowerCase()} className="options-flagimg" height="20" />
                                                                                </div>
                                                                                <div className="flex-grow-1">
                                                                                    <div className="d-flex">
                                                                                        <div className="country-name me-1">{item.name}</div>
                                                                                    </div>
                                                                                </div>
                                                                            </DropdownItem>
                                                                        ))}
                                                                        {filterCountry.length == 0 &&
                                                                            <p key={0} className={`dropdown-item d-flex mt-5`}>
                                                                                {t('msg_no_data_matched')}
                                                                            </p>}
                                                                    </SimpleBar>
                                                                </DropdownMenu>
                                                            </Dropdown>
                                                        </div>

                                                        <div className="col-12 col-md-6 col-lg-4">
                                                            <Label className="form-label">{t('label_state')}</Label>
                                                            <Dropdown isOpen={stateDropDown} toggle={stateDropdownToggle}>
                                                                <DropdownToggle
                                                                    tag="div"
                                                                    caret={false} type="text" className={`w-100 form-control rounded-end form-select ${formData.State && 'selected'} ${isClassAdded && (!formData.State || feildsError?.state_id) ? 'is-invalid' : ''}`} readOnly defaultValue={formData?.State?.name} >
                                                                    {formData?.State?.name || 'Select state'}
                                                                </DropdownToggle>
                                                                <DropdownMenu as='ul' className="list-unstyled w-100 dropdown-menu-list mb-0">
                                                                    <SimpleBar style={{ maxHeight: "220px" }}>
                                                                        <div className="px-3 position-fixed bg-white z-3 w-100">
                                                                            <input className="flag-search form-control" placeholder={t('placeholder_search_state')} onChange={stateSearch} />
                                                                        </div>
                                                                        {(filterState || []).map((item, key) => (
                                                                            <DropdownItem as='li' onClick={() => setFormData({ ...formData, State: item, City: null })} key={key} className={`dropdown-item d-flex ${key == 0 && 'mt-5'}`}>
                                                                                <div className="flex-grow-1">
                                                                                    <div className="d-flex">
                                                                                        <div className="state-name me-1">{item.name}</div>
                                                                                    </div>
                                                                                </div>
                                                                            </DropdownItem>
                                                                        ))}
                                                                        {filterState.length == 0 &&
                                                                            <p key={0} className={`dropdown-item d-flex mt-5`}>
                                                                                {t('msg_no_data_matched')}
                                                                            </p>}
                                                                    </SimpleBar>
                                                                </DropdownMenu>
                                                            </Dropdown>
                                                            <div className="invalid-feedback">{feildsError?.state_id || t(allError?.State) || t('invalid_state')}</div>
                                                        </div>

                                                        <div className="col-12 col-md-6 col-lg-4">
                                                            <Label className="form-label">{t('label_city')}</Label>
                                                            <Dropdown isOpen={cityDropDown} toggle={cityDropdownToggle}>
                                                                <DropdownToggle
                                                                    tag="div"
                                                                    caret={false} type="text" className={`w-100 form-control rounded-end form-select ${formData.City && 'selected'} ${isClassAdded && (!formData.City || feildsError?.city) ? 'is-invalid' : ''}`} readOnly defaultValue={formData?.City?.name} >
                                                                    {formData?.City?.name || 'Select city'}
                                                                </DropdownToggle>
                                                                <DropdownMenu as='ul' className="list-unstyled w-100 dropdown-menu-list mb-0">
                                                                    <SimpleBar style={{ maxHeight: "220px" }}>
                                                                        <div className="px-3 position-fixed bg-white z-3 w-100">
                                                                            <input className="flag-search form-control" placeholder={t('placeholder_search_city')} onChange={citySearch} />
                                                                        </div>
                                                                        {(filterCity || []).map((item, key) => (
                                                                            <DropdownItem as='li' onClick={() => setFormData({ ...formData, City: item })} key={key} className={`dropdown-item d-flex ${key == 0 && 'mt-5'}`}>
                                                                                <div className="flex-grow-1">
                                                                                    <div className="d-flex">
                                                                                        <div className="city-name me-1">{item.name}</div>
                                                                                    </div>
                                                                                </div>
                                                                            </DropdownItem>
                                                                        ))}
                                                                        {filterCity.length == 0 &&
                                                                            <p key={0} className={`dropdown-item d-flex mt-5`}>
                                                                                {t('msg_no_data_matched')}
                                                                            </p>}
                                                                    </SimpleBar>
                                                                </DropdownMenu>
                                                            </Dropdown>
                                                            <div className="invalid-feedback">{feildsError?.city || t(allError?.City) || t('invalid_city')}</div>
                                                        </div>

                                                        <div className="col-12 col-lg-8">
                                                            <Label htmlFor="street_address" className="form-label"> {t('placeholder_street_address')}</Label>
                                                            <input
                                                                type="text"
                                                                className={`form-control ${feildsError?.street_address && 'is-invalid backend'}`}
                                                                required
                                                                placeholder={t('placeholder_street_address')}
                                                                value={formData.street_address}
                                                                title={feildsError?.street_address || t(allError?.street_address)}
                                                                onInvalid={handleInvalid}
                                                                name="street_address"
                                                                onChange={handleChange}
                                                            />
                                                            <div className="invalid-feedback">{feildsError?.street_address || t(allError?.street_address) || t('invalid_street_address')}</div>
                                                        </div>

                                                        <div className="col-12 col-md-6 col-lg-4">
                                                            <Label htmlFor="post_code" className="form-label"> {t('placeholder_post_code')}</Label>
                                                            <input
                                                                type="number"
                                                                className={`form-control ${feildsError?.post_code && 'is-invalid backend'}`}
                                                                required
                                                                placeholder={t('placeholder_post_code')}
                                                                value={formData?.post_code}
                                                                title={feildsError?.post_code || t(allError?.post_code)}
                                                                onInvalid={handleInvalid}
                                                                name="post_code"
                                                                onChange={handleChange}
                                                            />
                                                            <div className="invalid-feedback">{feildsError?.post_code || t(allError?.post_code) || t('invalid_post_code')}</div>
                                                        </div>

                                                        <div className="col-12 col-md-6 col-lg-4">
                                                            <Label htmlFor="emergency_contact_name" className="form-label"> {t('placeholder_emergency_contact_name')}</Label>
                                                            <input
                                                                type="text"
                                                                className={`form-control ${feildsError?.emergency_contact_name && 'is-invalid backend'}`}
                                                                required
                                                                placeholder={t('placeholder_emergency_contact_name')}
                                                                value={formData?.emergency_contact_name}
                                                                title={feildsError?.emergency_contact_name || t(allError?.emergency_contact_name)}
                                                                onInvalid={handleInvalid}
                                                                name="emergency_contact_name"
                                                                onChange={handleChange}
                                                            />
                                                            <div className="invalid-feedback">{feildsError?.emergency_contact_name || t(allError?.emergency_contact_name) || t('invalid_emergency_contact_name')}</div>
                                                        </div>

                                                        <div className="col-12 col-md-6 col-lg-4">
                                                            <Label htmlFor="emergency_contact_phone" className="form-label"> {t('placeholder_emergency_contact_phone')}</Label>
                                                            <input
                                                                type="tel"
                                                                className={`form-control ${feildsError?.emergency_contact_phone && 'is-invalid backend'}`}
                                                                required
                                                                placeholder={t('placeholder_emergency_contact_phone')}
                                                                value={formData?.emergency_contact_phone}
                                                                title={feildsError?.emergency_contact_phone || t(allError?.emergency_contact_phone)}
                                                                onInvalid={handleInvalid}
                                                                name="emergency_contact_phone"
                                                                onChange={handleChange}
                                                            />
                                                            <div className="invalid-feedback">{feildsError?.emergency_contact_phone || t(allError?.emergency_contact_phone) || t('invalid_emergency_contact_phone')}</div>
                                                        </div>

                                                        <div className="col-12 col-md-6 col-lg-4">
                                                            <Label htmlFor="emergency_contact_relation" className="form-label"> {t('placeholder_emergency_contact_relation')}</Label>
                                                            <input
                                                                type="text"
                                                                className={`form-control ${feildsError?.emergency_contact_relation && 'is-invalid backend'}`}
                                                                required
                                                                placeholder={t('placeholder_emergency_contact_relation')}
                                                                value={formData?.emergency_contact_relation}
                                                                title={feildsError?.emergency_contact_relation || t(allError?.emergency_contact_relation)}
                                                                onInvalid={handleInvalid}
                                                                name="emergency_contact_relation"
                                                                onChange={handleChange}
                                                            />
                                                            <div className="invalid-feedback">{feildsError?.emergency_contact_relation || t(allError?.emergency_contact_relation) || t('invalid_emergency_contact_relation')}</div>
                                                        </div>

                                                    </Row>
                                                </div>}

                                            <div className="text-center gap-3 mt-4">

                                                {ApiLoading ? <Spinner color="success" type="grow" > Loading... </Spinner> :
                                                    <Button id='justSave' onClick={handleButtonClick} type="submit" color="success" className="btn-animation text-center mx-2" data-text={t('save')}> <span>{t('save')}</span> </Button>}
                                                <Button onClick={onCancelClick} color="danger" outline className="btn-animation text-center mx-2" disabled={ApiLoading} data-text={t('close')}> <span>{t('close')}</span> </Button>

                                            </div>
                                        </TabPane>

                                        <TabPane tabId={3}>
                                            <div>

                                                <h5>{t('additional')}</h5>
                                                <p className="text-muted">
                                                    {t('btn_fill_all_information_below')}
                                                </p>
                                            </div>

                                            {activeTab == 3 &&
                                                <div className="fullHeightDiv">
                                                    <Row className="g-3">

                                                        <div className="col-12 col-md-6">
                                                            <Label htmlFor="password" className="form-label"> {t('label_password')}</Label>
                                                            <div className="position-relative auth-pass-inputgroup">

                                                                <input
                                                                    className={`form-control ${feildsError?.password || allError?.password && 'is-invalid backend'}`}
                                                                    required
                                                                    placeholder={t('label_password')}
                                                                    value={formData.password}
                                                                    name="password"
                                                                    type={passwordShow ? "text" : "password"}
                                                                    minLength={8}
                                                                    title={feildsError?.password || t(allError?.password) || t('invalid_password')}
                                                                    onInvalid={handleInvalid}
                                                                    onChange={handleChange}
                                                                />
                                                                <div className="invalid-feedback">{feildsError?.password || t(allError?.password) || t('invalid_password')}</div>
                                                                <button className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted" type="button" id="password-addon" onClick={() => setPasswordShow(!passwordShow)}><i className="ri-eye-fill align-middle"></i></button>
                                                            </div>

                                                        </div>


                                                        <div className="col-12 col-md-6">
                                                            <Label htmlFor="password_confirmation" className="form-label"> {t('label_cnfrm_password')}</Label>
                                                            <div className="position-relative auth-pass-inputgroup">
                                                                <input
                                                                    className={`form-control ${(feildsError?.password_confirmation || t(allError?.password_confirmation)) && 'is-invalid backend'}`}
                                                                    required
                                                                    placeholder={t('label_cnfrm_password')}
                                                                    value={formData.password_confirmation}
                                                                    name="password_confirmation"
                                                                    type={confirmPasswordShow ? "text" : "password"}
                                                                    minLength={8}
                                                                    title={feildsError?.password_confirmation || t(allError?.password_confirmation) || t('invalid_password')}
                                                                    onInvalid={handleInvalid}
                                                                    onChange={handleChange}
                                                                />
                                                                <div className="invalid-feedback">{feildsError?.password_confirmation || t(allError?.password_confirmation) || t('invalid_cnfrm_password')}</div>
                                                                <button className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted" type="button" id="password-addon" onClick={() => setConfirmPasswordShow(!confirmPasswordShow)}><i className="ri-eye-fill align-middle"></i></button>
                                                            </div>
                                                        </div>
                                                    </Row>
                                                </div>}



                                            <div className="text-center gap-3 mt-4">

                                                {ApiLoading ? <Spinner color="success" type="grow" > Loading... </Spinner> :
                                                    <Button id='justSave' onClick={handleButtonClick} type="submit" color="success" className="btn-animation text-center mx-2" data-text={t('save')}> <span>{t('save')}</span> </Button>}
                                                <Button onClick={onCancelClick} color="danger" outline className="btn-animation text-center mx-2" disabled={ApiLoading} data-text={t('close')}> <span>{t('close')}</span> </Button>

                                            </div>
                                        </TabPane>

                                        <TabPane tabId={4}>
                                            <div className="text-center pt-4 pb-2">
                                                <div className="mb-4">
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/lupuorrc.json"
                                                        trigger="loop"
                                                        colors="primary:#0ab39c,secondary:#405189"
                                                        style={{ width: "120px", height: "120px" }}
                                                    ></lord-icon>
                                                </div>
                                                <h5>Your Order is Completed !</h5>
                                                <p className="text-muted">
                                                    You Will receive an order confirmation email
                                                    with details of your order.
                                                </p>
                                            </div>
                                        </TabPane>
                                    </TabContent>
                                </div> :
                                <div className="d-flex justify-content-center align-items-center h-100 fullHeightDiv">

                                    <Spin />
                                </div>}

                        </Col>

                    </Row>



                    {/* 

 */}

                    {/* <div className="text-center">

                        {ApiLoading ? <Spinner color="success" type="grow" > Loading... </Spinner> :
                            <Button onClick={handleButtonClick} type="submit" color="success" className="btn-animation text-center mx-2" data-text={t('save')}> <span>{t('save')}</span> </Button>}
                        <Button onClick={onCancelClick} color="danger" outline className="btn-animation text-center mx-2" disabled={ApiLoading} data-text={t('close')}> <span>{t('close')}</span> </Button>

                    </div> */}
                </form>

            </ModalBody>
        </Modal >
    );
};

EditUserModal.propTypes = {
    onCloseClick: PropTypes.func,
    onCancelClick: PropTypes.func,
    onDeleteClick: PropTypes.func,
    show: PropTypes.any,
};

export default EditUserModal;