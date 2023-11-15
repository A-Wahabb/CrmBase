import PropTypes from "prop-types";
import React, { useState } from "react";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Label, Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import { useEffect } from "react";
import { country } from "../../common/data";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { setApiSuccess } from "../../slices/User/reducer";
import { DesignationData, UserRoleData, addUser, countriesList } from "../../slices/thunks";
import { useTranslation } from 'react-i18next';
import SimpleBar from "simplebar-react";


const AddUserModal = ({ show, onCancelClick, onCloseClick }) => {
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
            countryList: state.UpdateDefaults.countryList
        })
    );
    // Inside your component
    const {
        ApiLoading,
        ApiSuccess,
        feildsError,
        designationList,
        countryList,
        userRoleList
    } = useSelector(storeData);


    const initialValues = {
        first_name: "",
        last_name: '',
        email: '',
        phone: {
            "id": 167,
            "name": "Pakistan",
            "iso2": "PK",
            "phonecode": "92",
            "flag": 1,
        },
        phone_number: '',
        role_id: '',
        designation_id: '',
        set_pass: false,
        send_set_password_link: '',
        password: '',
        password_confirmation: '',
    }

    const [formData, setFormData] = useState(initialValues)
    const [isClassAdded, setIsClassAdded] = useState(false);
    const [phoneDropDown, setPhoneDropDown] = useState(false);
    const [filterCountry, setFilterCountry] = useState(countryList);
    const [passwordShow, setPasswordShow] = useState(false);
    const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
    const [allError, setAllError] = useState(null)
    const phoneDropdownToggle = () => setPhoneDropDown((prevState) => !prevState);

    let loggedInCompany = JSON.parse(localStorage.getItem('loggedInCompany'))
    useEffect(() => {
        // dispatch(singleCompanyData(user.login_company))

        if (!designationList?.length) {
            dispatch(DesignationData());
        }
        if (!userRoleList?.length) {
            dispatch(UserRoleData());
        }

        if (!countryList?.length) {
            dispatch(countriesList());
        }
    }, [])

    useEffect(() => {
        if (loggedInCompany && countryList.length > 0) {
            let userCountry = countryList.find(x => x.id == loggedInCompany.country_id)
            setFormData({ ...formData, phone: userCountry })
        }
    }, [countryList])

    // Reset contry list when modal is open
    useEffect(() => {
        setFilterCountry(countryList)
    }, [phoneDropDown]);


    useEffect(() => {
        if (ApiSuccess && show) {
            dispatch(setApiSuccess({ data: false }))
            onCloseClick()
        }
    }, [ApiSuccess])




    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        if (type === 'checkbox') {
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

    const onSubmit = () => {
        if (!formData.set_pass || (formData?.password && formData?.password?.length > 7 && (formData?.password == formData?.password_confirmation))) {
            setAllError({ ...allError, password_confirmation: '', password: '' })
            let data = new FormData();
            data.append('first_name', formData.first_name);
            data.append('last_name', formData.last_name);
            data.append('email', formData.email);
            data.append('country_code', formData.phone.phonecode);
            data.append('phone', formData.phone_number);
            data.append('role_id', formData.role_id);
            data.append('designation_id', formData.designation_id);
            if (formData.set_pass) {
                data.append('send_set_password_link', 0);
                data.append('password', formData.password);
                data.append('password_confirmation', formData.password_confirmation);
            }
            else {
                data.append('send_set_password_link', 1);
            }

            dispatch(addUser(data))
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

    // useEffect(() => {
    //     const input = document.querySelector('input[name="password"]');

    //     input.addEventListener('invalid', function (event) {
    //         if (event.target.validity.valueMissing) {
    //             event.target.setCustomValidity('Please tell us how we should address you.');
    //         }
    //     })

    //     input.addEventListener('change', function (event) {
    //         event.target.setCustomValidity('');
    //     })
    // }, [])


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


    return (
        <Modal size="lg" fade={true} isOpen={show} toggle={onCancelClick} centered={true}>
            <ModalHeader toggle={onCancelClick} tag="h5" className="p-3 bg-info-subtle modal-title">
                {t('user_add_btn')}
            </ModalHeader>
            <ModalBody className="py-3 px-5">
                <form onSubmit={(e) => {
                    e.preventDefault()
                    onSubmit()
                }} className={`row ${(isClassAdded || feildsError) ? 'was-validated' : ''}`}>



                    <div className="col-12 col-md-6 mb-3">
                        <Label htmlFor="first_name" className="form-label"> {t('label_user_first_name')}</Label>
                        <input
                            className={`form-control ${feildsError?.first_name && 'is-invalid backend'}`}
                            required
                            maxLength={100}
                            placeholder={t('placeholder_first_name')}
                            value={formData.first_name}
                            title={feildsError?.first_name || t(allError?.first_name)}
                            onInvalid={handleInvalid}
                            name="first_name"
                            onChange={handleChange}
                        />
                        <div className="invalid-feedback">{feildsError?.first_name || t(allError?.first_name) || t('invalid_user_first_name')}</div>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                        <Label htmlFor="last_name" className="form-label"> {t('label_user_last_name')}</Label>
                        <input
                            className={`form-control ${feildsError?.last_name && 'is-invalid backend'}`}
                            required
                            maxLength={100}
                            placeholder={t('placeholder_last_name')}
                            value={formData.last_name}
                            title={feildsError?.last_name || t(allError?.last_name)}
                            onInvalid={handleInvalid}
                            name="last_name"
                            onChange={handleChange}
                        />
                        <div className="invalid-feedback">{feildsError?.last_name || t(allError?.last_name) || t('invalid_user_last_name')}</div>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
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
                        />
                        <div className="invalid-feedback">{feildsError?.email || t(allError?.email) || t('invalid_email')}</div>
                    </div>





                    <div className="col-12 col-md-6 mb-3">
                        <Label htmlFor="phone" className="form-label">{t('label_user_phone')}</Label>
                        <Dropdown className='input-group' isOpen={phoneDropDown} toggle={phoneDropdownToggle}>
                            <DropdownToggle
                                as="button"
                                className="btn btn-light border arrow-none">
                                <img src={country[formData?.phone?.iso2?.toLowerCase()]?.flagImg} alt="country flag" className="options-flagimg" height="20" />
                                <span className="countrylist-codeno text-muted"> +{formData?.phone?.phonecode}</span>
                            </DropdownToggle>
                            <input type="number"
                                placeholder={t('placeholder_phone')}
                                className={`form-control rounded-end flag-input ${feildsError?.phone && 'is-invalid backend'}`}
                                required
                                min={999999999}
                                value={formData.phone_number}
                                title={feildsError?.phone || t(allError?.phone_number)}
                                onInvalid={handleInvalid}
                                name="phone_number"
                                onChange={handleChange} />
                            <div className="invalid-feedback">{feildsError?.phone || t(allError?.phone_number) || t('invalid_user_phone')}</div>
                            <DropdownMenu as='ul' className="list-unstyled w-100 dropdown-menu-list mb-0">
                                <SimpleBar style={{ maxHeight: "220px" }} className="px-3">
                                    <div className="px-3 position-fixed bg-white z-3 w-100">
                                        <input className="flag-search form-control" placeholder={t('placeholder_search_country')} onChange={countrySearch} />
                                    </div>
                                    {(filterCountry || []).map((item, key) => (
                                        <DropdownItem as='li' onClick={() => setFormData({ ...formData, phone: item })} key={key} className={`dropdown-item d-flex ${key == 0 && 'mt-5'}`}>
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
                        <div className="invalid-feedback">{feildsError?.phone || t(allError?.phone) || t('invalid_phone')}</div>

                    </div>






                    <div className="col-12 col-md-6 mb-3">
                        <Label htmlFor="designation_id" className="form-label">{t('label_select_designation')}</Label>
                        <select
                            onChange={handleChange}
                            className={`form-control form-select ${feildsError?.designation_id && 'is-invalid backend'}`}
                            required
                            value={formData.designation_id}
                            name="designation_id"
                            title={feildsError?.designation_id || t(allError?.designation_id)}
                            onInvalid={handleInvalid}
                            aria-label={t('label_select_designation')}>
                            <option value="">{t('label_select_designation')}</option>
                            {designationList?.map(each => (
                                <option key={each.id} value={each.id}>{each.title}</option>

                            ))}
                        </select>
                        <div className="invalid-feedback">{feildsError?.designation_id || t(allError?.designation_id) || t('invalid_designation_title')}</div>
                    </div>

                    <div className="col-12 col-md-6 mb-3">
                        <Label htmlFor="role_id" className="form-label">{t('label_select_user_role')}</Label>
                        <select
                            onChange={handleChange}
                            className={`form-control form-select ${feildsError?.role_id && 'is-invalid backend'}`}
                            required
                            value={formData.role_id}
                            name="role_id"
                            title={feildsError?.role_id || t(allError?.role_id)}
                            onInvalid={handleInvalid}
                            aria-label={t('label_select_user_role')}>
                            <option value="">{t('label_select_user_role')}</option>
                            {userRoleList?.map(each => (
                                <option key={each.id} value={each.id}>{each.title}</option>

                            ))}
                        </select>
                        <div className="invalid-feedback">{feildsError?.role_id || t(allError?.role_id) || t('invalid_user_role')}</div>
                    </div>

                    <div className="col-12 col-md-6 mb-3">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            name="set_pass"
                            checked={formData.set_pass}
                            onChange={handleChange}
                            id="set_pass" />
                        <Label htmlFor="set_pass" className="form-label ps-2">{t('label_set_password')}</Label>
                    </div>

                    {
                        formData.set_pass && <>

                            <div className="col-12 mb-3">
                                <Label htmlFor="password" className="form-label"> {t('label_password')}</Label>
                                <div className="position-relative auth-pass-inputgroup">
                                    <input
                                        className={`form-control ${feildsError?.password ? 'is-invalid backend' : ''}`}
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

                            <div className="col-12 mb-3">
                                <Label htmlFor="password_confirmation" className="form-label"> {t('label_cnfrm_password')}</Label>
                                <div className="position-relative auth-pass-inputgroup">
                                    <input
                                        className={`form-control ${(feildsError?.password_confirmation || ((formData.password !== formData.password_confirmation) && formData.password_confirmation)) ? 'is-invalid backend' : ''}`}
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


                        </>
                    }

                    <div className="text-center">

                        {ApiLoading ? <Spinner color="success" type="grow" > Loading... </Spinner> :
                            <Button onClick={handleButtonClick} type="submit" color="success" className="btn-animation text-center mx-2" data-text={t('save')}> <span>{t('save')}</span> </Button>}
                        <Button onClick={onCancelClick} color="danger" outline className="btn-animation text-center mx-2" disabled={ApiLoading} data-text={t('close')}> <span>{t('close')}</span> </Button>

                    </div>
                </form>

            </ModalBody>
        </Modal>
    );
};

AddUserModal.propTypes = {
    onCloseClick: PropTypes.func,
    onCancelClick: PropTypes.func,
    onDeleteClick: PropTypes.func,
    show: PropTypes.any,
};

export default AddUserModal;