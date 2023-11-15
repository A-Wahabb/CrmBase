import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import { Input, Label, Modal, ModalBody, Form, ModalHeader, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Spinner, Button } from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

import { useEffect } from "react";
import SimpleBar from "simplebar-react";
import { country } from "../../common/data";
import { dateFormat, countriesList } from "../../slices/defaults/thunks";

import dummyUser from "../../assets/images/users/user-dummy-img.jpg";
import { updateCompany } from "../../slices/thunks";
import { setApiSuccess } from "../../slices/CompanyData/reducer";
import { toast } from "react-toastify";

import { useTranslation } from 'react-i18next';

const EditCompanyModal = ({ show, selectedCompany, onCancelClick, onCloseClick, isLoggedInCompany }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectLayoutState = (state) => state;
  const storetData = createSelector(
    selectLayoutState,
    (state) => ({
      dateFormats: state.UpdateDefaults.dateFormats,
      countryList: state.UpdateDefaults.countryList,
      ApiLoading: state.UpdateCompanyData.ApiLoading,
      ApiSuccess: state.UpdateCompanyData.ApiSuccess,
      feildsError: state.UpdateCompanyData.feildsError,
    })
  );
  // Inside your component
  const {
    dateFormats,
    countryList,
    ApiLoading,
    ApiSuccess,
    feildsError
  } = useSelector(storetData);
  const initialValues = {
    id: selectedCompany?.id,
    title: selectedCompany?.title,
    Company_Country: selectedCompany?.country,
    date_format: selectedCompany?.date_format,
    time_format: selectedCompany?.time_format,
    description: selectedCompany?.description,
    logo_url: selectedCompany?.logo_url
  }
  const [formData, setFormData] = useState(initialValues)
  const [countryDropDown, setCountryDropDown] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [filterCountry, setFilterCountry] = useState(countryList);
  const [isClassAdded, setIsClassAdded] = useState(false);
  const [allError, setAllError] = useState(null)
  const fileInputRef = useRef(null)
  const contryDropdownToggle = () => setCountryDropDown((prevState) => !prevState);

  const TimeFormat_optn = [
    { value: 'H:i', label: `24 ${t('Hours')}` },
    { value: 'h:i a', label: `12 ${t('Hours')}` },
  ];
  const handleButtonClick = () => {
    if (!isClassAdded) {
      setIsClassAdded(true);
    }
  };

  useEffect(() => {
    if (ApiSuccess && show) {
      dispatch(setApiSuccess({ data: false }))
      onCloseClick()
    }
  }, [ApiSuccess])

  useEffect(() => {
    if (selectedCompany) {
      setFormData({ initialValues })
      setLoading(false)
      setIsClassAdded(false);
    }
  }, [selectedCompany]);

  useEffect(() => {
    const filterSelectedCompany = countryList.find(x => x.id == selectedCompany.country_id)
    setFormData({ ...formData, Company_Country: filterSelectedCompany })
    setFilterCountry(countryList)
  }, [countryList]);

  useEffect(() => {
    setFilterCountry(countryList)
  }, [countryDropDown]);

  useEffect(() => {
    if (!dateFormats.length) {
      dispatch(dateFormat());
    }
    if (!countryList?.length) {
      dispatch(countriesList());
    }
  }, [])

  const onSubmit = () => {
    let data = new FormData();
    data.append('id', formData.id);
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('country_id', formData.Company_Country.id);
    data.append('time_format', formData.time_format);
    data.append('date_format', formData.date_format);
    if (formData.img) {
      data.append('logo_url', formData.img);
      data.append('remove_logo_url', 1);
    }
    else if (!formData.img && !formData.logo_url) {
      data.append('remove_logo_url', 1);
    }
    else {
      data.append('remove_logo_url', 0);
    }

    dispatch(updateCompany(data, isLoggedInCompany));
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target

    if (e.target.type == 'file' && files && files?.length) {
      if (files[0]?.size < 1024 * 1024) {
        const reader = new FileReader();

        reader.onloadend = () => {
          setFormData({
            ...formData,
            logo_url: reader.result,
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
    else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
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
    if (event.target.validity.tooLong || event.target.validity.rangeUnderflow) {
      setAllError({ ...allError, [event.target.name]: 'Maximum 100 characters are allowed' })
    }

  };

  const resetImg = () => {
    setFormData({
      ...formData,
      logo_url: '',
      img: ''
    });
    // Reset the file input field
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
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
  return (
    !Loading ?
      <Modal size="lg" fade={true} isOpen={show} toggle={onCancelClick} centered={true} >

        <ModalHeader toggle={onCancelClick} tag="h5" className="p-3 bg-info-subtle modal-title">
          {t('company_edit_btn')}
        </ModalHeader>
        <ModalBody className="px-5">
          <div className="text-center">
            <div className="profile-user position-relative d-inline-block mx-auto">

              {(formData.logo_url || formData?.img) ?
                <img src={formData?.logo_url || dummyUser} width='100px' className="object-fit-cover rounded-4 avatar-xl img-thumbnail user-profile-image" alt='' />
                : <div className="Custom_Logo bg-info-subtle">
                  <p className="mb-0 text-center text-info" >{formData.title?.split(' ').slice(0, 2).map(x => x[0].toUpperCase())}</p>
                </div>}


              <div className="avatar-xs p-0 rounded-3 profile-photo-edit">
                <Input id="profile-img-file-input" type="file"

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
              {(formData.logo_url || formData?.img) && <div className="avatar-xs p-0 rounded-3 profile-photo-rmv cursor-pointer" onClick={resetImg}>
                <span className="avatar-title rounded-circle bg-light text-body">
                  <i className="ri-close-line"></i>
                </span>
              </div>}
            </div>
          </div>


          <Form
            className={(isClassAdded || feildsError) ? 'was-validated' : ''}
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit()
              return false;
            }}
          >
            <div className="row">

              <div className="col-12 col-md-6 mt-3">
                <Label htmlFor="title" className="form-label">{t('label_company_name')}</Label>
                <input
                  name="title"
                  className={`form-control ${feildsError?.title && 'is-invalid backend'}`}
                  placeholder={t('placeholder_company_name')}
                  type="text"
                  onInvalid={handleInvalid}
                  onChange={handleChange}
                  required
                  maxLength={100}
                  value={formData.title}
                />
                <div className="invalid-feedback">{feildsError?.title || t(allError?.title) || t('invalid_company_name')}</div>
              </div>

              <div className="col-12 col-md-6 mt-3">
                <Label className="form-label">{t('label_country')}</Label>
                <Dropdown isOpen={countryDropDown} toggle={contryDropdownToggle}>
                  <DropdownToggle
                    tag="div"
                    caret={false} type="text" style={{ backgroundImage: `url(${country[formData.Company_Country?.iso2.toLowerCase()]?.flagImg})` }} className={`w-100 form-control rounded-end flag-input form-select ${formData.Company_Country && 'selected'}`} readOnly defaultValue={formData.Company_Country?.name} >
                    {formData.Company_Country?.name || 'Select country'}
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
                              <div className="country-name me-1">{item?.name}</div>
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


              {/* was-validated */}
              <div className="col-12 col-md-6 mt-3">
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

              <div className="col-12 col-md-6 mt-3">
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
              <div className="col-12 mt-3">
                <Label htmlFor="description" className="form-label">{t('label_description')}</Label>
                <textarea
                  maxLength={60000}
                  onChange={handleChange}
                  onInvalid={handleInvalid}
                  required
                  value={formData.description}
                  name="description" className={`form-control ${feildsError?.description && 'is-invalid backend'}`} id="description" rows="4"></textarea>
                <div className="invalid-feedback">{feildsError?.description || t(allError?.description) || t('invalid_description')}</div>
              </div>

            </div>
            <div className="text-center mt-3">

              {ApiLoading ? <Spinner color="success" type="grow" > Loading... </Spinner> :
                <Button onClick={handleButtonClick} type="submit" color="success" className="btn-animation text-center mx-2" data-text={t('save')}> <span>{t('save')}</span> </Button>}
              <Button onClick={onCancelClick} color="danger" outline className="btn-animation text-center mx-2" disabled={ApiLoading} data-text={t('close')}> <span>{t('close')}</span> </Button>

            </div>
          </Form>


        </ModalBody>
      </Modal>
      : <></>
  );
};

EditCompanyModal.propTypes = {
  onCloseClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  show: PropTypes.any,
};

export default EditCompanyModal;