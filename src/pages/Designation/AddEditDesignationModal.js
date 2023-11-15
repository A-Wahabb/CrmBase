import PropTypes from "prop-types";
import React, { useState } from "react";
import { Button, Label, Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import { useEffect } from "react";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { setApiSuccess } from "../../slices/Designation/reducer";
import { addDesignation, updateDesignation } from "../../slices/thunks";
import { useTranslation } from 'react-i18next';


const AddEditDesignationModal = ({ show, TypeDesignation, SeletedDesignation, onCancelClick, onCloseClick }) => {
    const { t } = useTranslation();

    const dispatch = useDispatch();
    const selectLayoutState = (state) => state;
    const storeData = createSelector(
        selectLayoutState,
        (state) => ({
            ApiLoading: state.UpdateDesignationData.ApiLoading,
            ApiSuccess: state.UpdateDesignationData.ApiSuccess,
            feildsError: state.UpdateDesignationData.feildsError,
        })
    );
    // Inside your component
    const {
        ApiLoading,
        ApiSuccess,
        feildsError
    } = useSelector(storeData);


    const initialValues = {
        title: "",
        sort_order: '',
    }

    const [formData, setFormData] = useState(initialValues)
    const [allError, setAllError] = useState(null)
    const [isClassAdded, setIsClassAdded] = useState(false);

    useEffect(() => {
        if (ApiSuccess && show) {
            dispatch(setApiSuccess({ data: false }))
            onCloseClick()
        }
    }, [ApiSuccess])

    useEffect(() => {
        if (TypeDesignation === 'Edit') {
            setFormData(SeletedDesignation)
        }
        else {
            setFormData(initialValues)
        }
        setIsClassAdded(false)
    }, [SeletedDesignation, TypeDesignation])


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
        let data = new FormData();
        data.append('title', formData.title);
        data.append('sort_order', formData.sort_order);


        if (TypeDesignation == 'Edit') {
            data.append('id', formData?.id)
            dispatch(updateDesignation(data));
        }
        else {
            dispatch(addDesignation(data))
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

    };

    return (
        <Modal fade={true} isOpen={show} toggle={onCancelClick} centered={true}>
            <ModalHeader toggle={onCancelClick} tag="h5" className="p-3 bg-info-subtle modal-title">
                {TypeDesignation === 'Edit' ? t('designation_edit_btn') : t('designation_add_btn')}
            </ModalHeader>
            <ModalBody className="py-3 px-5">
                <form onSubmit={(e) => {
                    e.preventDefault()
                    onSubmit()
                }} className={`row ${(isClassAdded || feildsError) ? 'was-validated' : ''}`}>



                    <div className="col-12 mb-3">
                        <Label htmlFor="title" className="form-label"> {t('label_designation_title')}</Label>
                        <input
                            className={`form-control ${feildsError?.designation_title && 'is-invalid backend'}`}
                            required
                            placeholder={t('label_designation_title')}
                            value={formData.title}
                            name="title"
                            maxLength={100}
                            onChange={handleChange}
                        />
                        <div className="invalid-feedback">{feildsError?.designation_title || t(allError?.designation_title) || t('invalid_designation_title')}</div>
                    </div>
                    <div className="col-12 mb-3">
                        <Label htmlFor="sort_order" className="form-label">{t('label_designation_sort_order')}</Label>
                        <input
                            type="number"
                            min={0}
                            placeholder={t('label_designation_sort_order')}
                            max={100}
                            className={`form-control ${feildsError?.sort_order && 'is-invalid backend'}`}
                            required
                            value={formData.sort_order}
                            name="sort_order"
                            onChange={handleChange}
                            onInvalid={handleInvalid}
                        />
                        <div className="invalid-feedback">{feildsError?.sort_order || t(allError?.sort_order) || t('invalid_designation_sort_order')}</div>
                    </div>

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

AddEditDesignationModal.propTypes = {
    onCloseClick: PropTypes.func,
    onCancelClick: PropTypes.func,
    onDeleteClick: PropTypes.func,
    show: PropTypes.any,
};

export default AddEditDesignationModal;