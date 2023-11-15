import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import { Label, Modal, ModalBody, ModalHeader, Row, Col, Card, CardBody, Nav, NavItem, NavLink, TabPane, TabContent, Progress, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Spinner } from "reactstrap";

import classnames from "classnames";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

import { loadAnimation } from "lottie-web";
import { defineElement } from "lord-icon-element";
import { country } from "../../common/data";



import { useEffect } from "react";
import SimpleBar from "simplebar-react";
import AddCompanyStep2 from "./AddCompanyStep2";
import { dateFormat, countriesList, designationsList } from "../../slices/defaults/thunks";
import { ToastContainer, toast } from "react-toastify";
import { addCompanyData } from "../../slices/thunks";
import { setApiSuccess } from "../../slices/CompanyData/reducer";

import { useTranslation } from 'react-i18next';


const AddCompanyModal = ({ show, onCloseClick }) => {
    const { t } = useTranslation();

    const dispatch = useDispatch();
    const selectLayoutState = (state) => state;
    const defaultData = createSelector(
        selectLayoutState,
        (state) => ({
            dateFormats: state.UpdateDefaults.dateFormats,
            ApiLoading: state.UpdateCompanyData.ApiLoading,
            ApiSuccess: state.UpdateCompanyData.ApiSuccess,
            feildsError: state.UpdateCompanyData.feildsError,
            countryList: state.UpdateDefaults.countryList,
            designationList: state.UpdateDefaults.designationList,
        })
    );
    // Inside your component
    const {
        dateFormats,
        countryList,
        designationList,
        ApiLoading,
        ApiSuccess,
        feildsError
    } = useSelector(defaultData);
    const initialValues = {
        Logo: false,
        img: '',
        imgPreview: '',
        title: '',
        Company_Country: {
            "id": 167,
            "name": "Pakistan",
            "iso2": "PK",
            "flag": 1,
        },
        date_format: '',
        time_format: '',
        description: '',
        Company_Designations: [{ id: 1, D_Name: '' }]
    }

    const TimeFormat_optn = [
        { value: 'H:i', label: `24 ${t('Hours')}` },
        { value: 'h:i a', label: `12 ${t('Hours')}` },
    ];

    const [activeTab, setactiveTab] = useState(1);
    const [formData, setFormData] = useState(initialValues)
    const [progressbarvalue, setprogressbarvalue] = useState(0);
    const [passedSteps, setPassedSteps] = useState([1]);
    const [countryDropDown, setCountryDropDown] = useState(false);
    const [filterCountry, setFilterCountry] = useState(countryList);
    const [isClassAdded, setIsClassAdded] = useState(false);
    const [allError, setAllError] = useState(null)
    const fileInputRef = useRef(null)
    const countryDropdownToggle = () => setCountryDropDown((prevState) => !prevState);

    //uneffect the validation when tab changes
    useEffect(() => {
        setIsClassAdded(false)
    }, [activeTab])

    const handleButtonClick = () => {
        if (!isClassAdded) {
            setIsClassAdded(true);
        }
    };

    // Reset contry list when modal is open
    useEffect(() => {
        setFilterCountry(countryList)
    }, [countryDropDown]);

    useEffect(() => {
        let designations = []
        designationList.map(x => designations.push({ id: random_ID(), D_Name: x?.title }))

        setFormData({ ...formData, Company_Designations: designations })
    }, [designationList]);

    useEffect(() => {
        if (!dateFormats.length) {
            dispatch(dateFormat());
        }
        if (!countryList?.length) {
            dispatch(countriesList());
        }
        if (!designationList?.length) {
            dispatch(designationsList());
        }
    }, [])

    useEffect(() => {
        if (feildsError) {
            if (Object.keys(feildsError).some(item => ['title', 'date_format', 'time_format', 'description'].includes(item))) {
                toggleTab(1, 0);
            }
        }
    }, [feildsError])

    const handleChange = (e) => {
        const { name, value, files } = e.target
        if (e.target.type == 'file' && files && files?.length) {
            if (files[0]?.size < 1024 * 1024) {
                const reader = new FileReader();

                reader.onloadend = () => {
                    setFormData({
                        ...formData,
                        imgPreview: reader.result,
                        img: files[0],
                        Logo: true
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
        else {

            setFormData({
                ...formData,
                [name]: value
            })
        }
    }

    const AddRemoveDesignation = (type, id) => {
        if (type == 'Add') {
            let newDes = [...formData.Company_Designations, { id: random_ID(), D_Name: '' }]
            setFormData({ ...formData, Company_Designations: newDes })
        }
        if (type == 'Rmv') {
            let newArr = formData.Company_Designations.filter(x => x.id !== id)
            setFormData({ ...formData, Company_Designations: newArr })
        }
    }
    const random_ID = () => parseInt(Date.now() * Math.random());


    const onSubmit = () => {
        let data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('country_id', formData.Company_Country.id);
        data.append('time_format', formData.time_format);
        data.append('date_format', formData.date_format);
        if (formData.img) {
            data.append('logo_url', formData.img);
        }

        formData.Company_Designations.map((x, index) => data.append(`designation[${index}]`, x.D_Name))
        dispatch(addCompanyData(data));
    }

    function toggleTab(tab, value) {
        if (activeTab !== tab) {
            var modifiedSteps = [...passedSteps, tab];

            if (tab >= 1 && tab <= 4) {
                setactiveTab(tab);
                setPassedSteps(modifiedSteps);
            }
        }
        setprogressbarvalue(value);
    }


    const countrySearch = (e) => {
        let str = e.target.value.toLowerCase();
        if (str !== '') {
            setFilterCountry(countryList.filter(x => x.name.toLowerCase().includes(str)))
        }
        else {
            setFilterCountry(countryList)
        }
    }

    const DesignationControl = (e) => {
        const { name, value } = e.target
        setFormData(prevFormData => {
            const updatedDesignation = prevFormData.Company_Designations.find(designation => designation.id === parseInt(name));
            if (updatedDesignation) {
                updatedDesignation.D_Name = value;
            }
            return { ...prevFormData, Company_Designations: [...prevFormData.Company_Designations] };
        });

    }

    const handleReset = () => {
        setFormData({
            ...formData,
            Logo: false,
            img: '',
            imgPreview: ''
        })
        // Reset the file input field
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }
    }
    useEffect(() => {
        if (ApiSuccess && activeTab > 1) {
            toggleTab(activeTab + 1, 100);
            dispatch(setApiSuccess({ data: false }))
        }
    }, [ApiSuccess])

    const closeModal = () => {
        toggleTab(1, 0)
        onCloseClick()
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

    defineElement(loadAnimation);

    return (
        <Modal
            size="xl" fade={true} isOpen={show} toggle={closeModal} centered={true} >

            <ModalHeader toggle={closeModal} tag="h5" className="p-3 bg-info-subtle modal-title">
                {t('company_add_btn')}
            </ModalHeader>
            <ModalBody className="py-3 px-5">
                <Row>
                    <Col xl={12}>
                        <Card>
                            <CardBody>

                                <div>
                                    <div className="text-center pt-3 pb-4 mb-1">
                                        <h5>{t('add_company_modal_title')}</h5>
                                    </div>

                                    <div className="progress-nav mb-4">
                                        <Progress
                                            value={progressbarvalue}
                                            style={{ height: "1px" }}
                                        />

                                        <Nav
                                            className="nav-pills progress-bar-tab custom-nav"
                                            role="tablist"

                                        >
                                            <NavItem>
                                                <NavLink
                                                    to="#"
                                                    id="pills-gen-info-tab"
                                                    className={classnames(
                                                        {
                                                            active: activeTab === 1,
                                                            done: activeTab <= 4 && activeTab >= 0,
                                                        },
                                                        "rounded-pill"
                                                    )}
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        toggleTab(1, 0);
                                                    }}
                                                    tag="button"
                                                >
                                                    1
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    to="#"
                                                    id="pills-gen-info-tab"
                                                    className={classnames(
                                                        {
                                                            active: activeTab === 2,
                                                            done: activeTab <= 4 && activeTab > 1,
                                                        },
                                                        "rounded-pill"
                                                    )}
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        if (activeTab > 1) {
                                                            toggleTab(2, 50);
                                                        }
                                                    }}
                                                    tag="button"
                                                >
                                                    2
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    to="#"
                                                    id="pills-gen-info-tab"
                                                    className={classnames(
                                                        {
                                                            active: activeTab === 3,
                                                            done: activeTab <= 4 && activeTab > 2,
                                                        },
                                                        "rounded-pill"
                                                    )}
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        if (activeTab > 2) {
                                                            toggleTab(3, 100);
                                                        }
                                                    }}
                                                    tag="button"
                                                >
                                                    3
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                    </div>

                                    <TabContent activeTab={activeTab}>
                                        <TabPane tabId={1}>
                                            <form className={(isClassAdded || feildsError) ? 'was-validated' : ''} onSubmit={(e) => {
                                                e.preventDefault()
                                                toggleTab(activeTab + 1, 50);
                                            }}>
                                                <div>
                                                    <div className="mb-4">
                                                        <div>
                                                            <h5 className="mb-1">{t('company_detail')}</h5>
                                                            <p className="text-muted">
                                                                {t('setup_new_company')}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <Row>
                                                        <div className="col-12 d-flex mb-3">

                                                            {/* <span className={"avatar-title rounded bg-info-subtle"}>
                                                                {formData.Logo ? <img src={each.logo_url || dummyUser} alt="" className="img-fluid rounded-3 h-100 object-fit-cover" /> : <p className="mb-0 text-center text-info" >{each.title?.split(' ').slice(0,2).map(x => x[0])}</p>}
                                                            </span> */}
                                                            {formData.Logo ?
                                                                <img src={formData.imgPreview} width='100px' className="object-fit-cover" alt='' />
                                                                : <div className="Custom_Logo bg-info-subtle">
                                                                    <p className="mb-0 text-center text-info" >{formData.title?.split(' ')?.slice(0, 2)?.map(x => x[0]?.toUpperCase())}</p>
                                                                </div>}

                                                            <div className="col-6 col-lg-2 ps-3 d-flex flex-column gap-2" >
                                                                <input
                                                                    type="file"
                                                                    name='profile'
                                                                    onChange={handleChange}
                                                                    className={`custom-file-input`}
                                                                    accept='.jpg'
                                                                    ref={fileInputRef}
                                                                />
                                                                <button className="btn rounded-3 bg-light text-black w-75" type='button' onClick={handleReset}>Reset</button>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-md-6 mb-3">
                                                            <Label htmlFor="title" className="form-label">{t('label_company_name')}</Label>
                                                            <input
                                                                name="title"
                                                                className={`form-control ${feildsError?.title && 'is-invalid backend'}`}
                                                                placeholder={t('placeholder_company_name')}
                                                                type="text"
                                                                maxLength={100}
                                                                onChange={handleChange}
                                                                onInvalid={handleInvalid}
                                                                value={formData.title}
                                                                required
                                                            />
                                                            <div className="invalid-feedback">{feildsError?.title || t(allError?.title) || t('invalid_company_name')}</div>
                                                        </div>

                                                        <div className="col-12 col-md-6 mb-3">
                                                            <Label className="form-label">{t('label_country')}</Label>
                                                            <Dropdown isOpen={countryDropDown} toggle={countryDropdownToggle}>
                                                                <DropdownToggle
                                                                    tag="div"
                                                                    caret={false} type="text" style={{ backgroundImage: `url(${country[formData.Company_Country.iso2?.toLowerCase()]?.flagImg})` }} className={`w-100 form-control rounded-end flag-input form-select ${formData.Company_Country && 'selected'}`} readOnly defaultValue={formData.Company_Country.countryName} >
                                                                    {formData.Company_Country.name || 'Select country'}
                                                                </DropdownToggle>
                                                                <DropdownMenu as='ul' className="list-unstyled w-100 dropdown-menu-list mb-0">
                                                                    <SimpleBar style={{ maxHeight: "220px" }}>
                                                                        <div className="px-3 position-fixed bg-white z-3 w-100">
                                                                            <input className="flag-search form-control" placeholder={t('placeholder_search_country')} onChange={countrySearch} />
                                                                        </div>
                                                                        {(filterCountry || []).map((item, key) => (
                                                                            <DropdownItem as='li' onClick={() => setFormData({ ...formData, Company_Country: item })} key={key} className={`dropdown-item d-flex ${key == 0 && 'mt-5'}`}>
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
                                                        <div className="col-12 col-md-6 mb-3">
                                                            <Label htmlFor="date_format" className="form-label">{t('label_date_format')}</Label>
                                                            <select
                                                                onChange={handleChange}
                                                                className={`form-control form-select ${feildsError?.date_format && 'is-invalid backend'}`}
                                                                required
                                                                onInvalid={handleInvalid}
                                                                value={formData.date_format}
                                                                name="date_format"
                                                                aria-label={t('placeholder_date_format')}>
                                                                <option value="">{t('placeholder_date_format')}</option>
                                                                {dateFormats?.map(each => (
                                                                    <option key={each.value} value={each.value}>{each.text} (e.g {each.example})</option>

                                                                ))}
                                                            </select>
                                                            <div className="invalid-feedback">{feildsError?.date_format || t(allError?.date_format) || t('invalid_date_format')}</div>
                                                        </div>
                                                        <div className="col-12 col-md-6 mb-3">
                                                            <Label htmlFor="time_format" className="form-label">{t('label_time_format')}</Label>
                                                            <select
                                                                onChange={handleChange}
                                                                onInvalid={handleInvalid}
                                                                className={`form-control form-select ${feildsError?.time_format && 'is-invalid backend'}`}
                                                                required
                                                                value={formData.time_format}
                                                                name="time_format"
                                                                aria-label={t('placeholder_time_format')}>
                                                                <option value="">{t('placeholder_time_format')}</option>
                                                                {TimeFormat_optn?.map(each => (
                                                                    <option key={each.value} value={each.value}>{each.label}</option>

                                                                ))}
                                                            </select>
                                                            <div className="invalid-feedback">{feildsError?.time_format || t(allError?.time_format) || t('invalid_time_format')}</div>
                                                        </div>

                                                        <div className="col-12 mb-3">
                                                            <Label htmlFor="description" className="form-label">{t('label_description')}</Label>
                                                            <textarea
                                                                onChange={handleChange}
                                                                onInvalid={handleInvalid}
                                                                maxLength={60000}
                                                                required
                                                                value={formData.description}
                                                                name="description" className={`form-control ${feildsError?.description && 'is-invalid backend'}`} id="description" rows="4"></textarea>
                                                            <div className="invalid-feedback">{feildsError?.description || t(allError?.description) || t('invalid_description')}</div>
                                                        </div>
                                                    </Row>
                                                </div>
                                                <div className="d-flex align-items-start gap-3 mt-4">
                                                    <button
                                                        type="submit"
                                                        onClick={handleButtonClick}
                                                        className="btn btn-success btn-label right ms-auto nexttab nexttab"

                                                    >
                                                        <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                                                        {t('next')}
                                                    </button>
                                                </div>
                                            </form>
                                        </TabPane>

                                        <TabPane tabId={2}>
                                            <form className={(isClassAdded || feildsError) ? 'was-validated' : ''} onSubmit={(e) => {
                                                e.preventDefault()
                                                // toggleTab(ctiveTab + 1, 100);
                                                onSubmit()
                                            }}>

                                                <div className="mb-4">
                                                    <div>
                                                        <h5 className="mb-1">{t('label_designation_name')}</h5>
                                                        <p className="text-muted">
                                                            {t('label_add_designation')}
                                                        </p>
                                                    </div>
                                                </div>
                                                <Row>

                                                    <AddCompanyStep2 formData={formData}
                                                        handleInvalid={handleInvalid} allError={allError} handleChange={DesignationControl} AddRemoveDesignation={AddRemoveDesignation} />

                                                </Row>
                                                <div className="d-flex align-items-start gap-3 mt-4">
                                                    <button
                                                        type="button"
                                                        className="btn btn-light btn-label previestab"
                                                        onClick={() => {
                                                            toggleTab(activeTab - 1);
                                                        }}
                                                    >
                                                        <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>{" "}
                                                        {t('label_back_to_general')}
                                                    </button>
                                                    {ApiLoading ?
                                                        <Spinner className="right ms-auto" color="success" type="grow" > Loading... </Spinner>
                                                        : <>
                                                            <button
                                                                disabled={ApiLoading}
                                                                onClick={handleButtonClick}
                                                                type="submit"
                                                                className="btn btn-success btn-label right ms-auto nexttab nexttab"
                                                            >
                                                                <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                                                                {t('btn_submit')}
                                                            </button>
                                                        </>}
                                                </div>
                                            </form>
                                        </TabPane>

                                        <TabPane tabId={3}>
                                            <div>
                                                <div className="text-center">
                                                    <div className="mb-4">
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/lupuorrc.json"
                                                            trigger="loop"
                                                            colors="primary:#0ab39c,secondary:#405189"
                                                            style={{ width: "120px", height: "120px" }}
                                                        ></lord-icon>
                                                    </div>
                                                    <h5>{t('msg_well_done')}</h5>
                                                    <p className="text-muted">
                                                        {t('msg_company_added_successfully')}
                                                    </p>
                                                </div>
                                            </div>
                                        </TabPane>
                                    </TabContent>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <ToastContainer closeButton={false} limit={1} />
            </ModalBody>
        </Modal >

    );
};

AddCompanyModal.propTypes = {
    onCloseClick: PropTypes.func,
    onDeleteClick: PropTypes.func,
    show: PropTypes.any,
};

export default AddCompanyModal;