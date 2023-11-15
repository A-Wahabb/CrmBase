import PropTypes from "prop-types";
import React, { useState } from "react";
import { Button, Label, Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import { useEffect } from "react";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { setApiSuccess } from "../../slices/UserRole/reducer";
import { addUserRole, updateUserRole } from "../../slices/thunks";
import { useTranslation } from 'react-i18next';


const AddEditUserRoleModal = ({ show, TypeUserRole, SelectedUserRole, onCancelClick, onCloseClick }) => {
    const { t } = useTranslation();

    const dispatch = useDispatch();
    const selectLayoutState = (state) => state;
    const storeData = createSelector(
        selectLayoutState,
        (state) => ({
            ApiLoading: state.UpdateUserRoleData.ApiLoading,
            ApiSuccess: state.UpdateUserRoleData.ApiSuccess,
            feildsError: state.UpdateUserRoleData.feildsError,
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
        description: '',
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
        if (TypeUserRole === 'Edit') {
            setFormData(SelectedUserRole)
        }
        else {
            setFormData(initialValues)
        }
        setIsClassAdded(false)
    }, [SelectedUserRole, TypeUserRole])


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


    const handleInvalid = (event) => {
        event.preventDefault()
        // let err=''
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

    const onSubmit = () => {
        let data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);


        if (TypeUserRole == 'Edit') {
            data.append('id', formData?.id)
            dispatch(updateUserRole(data));
        }
        else {
            dispatch(addUserRole(data))
        }
    }



    return (
        <Modal fade={true} isOpen={show} toggle={onCancelClick} centered={true}>
            <ModalHeader toggle={onCancelClick} tag="h5" className="p-3 bg-info-subtle modal-title">
                {TypeUserRole === 'Edit' ? t('user_role_edit_btn') : t('user_role_add_btn')}
            </ModalHeader>
            <ModalBody className="py-3 px-5">
                <form onSubmit={(e) => {
                    e.preventDefault()
                    onSubmit()
                }} className={`row ${(isClassAdded || feildsError) ? 'was-validated' : ''}`}>



                    <div className="col-12 mt-3">
                        <Label htmlFor="title" className="form-label"> {t('label_user_role_title')}</Label>
                        <input
                            className={`form-control ${feildsError?.title && 'is-invalid backend'}`}
                            required
                            maxLength={100}
                            onInvalid={handleInvalid}
                            placeholder={t('label_user_role_title')}
                            value={formData?.title}
                            name="title"
                            onChange={handleChange}
                        />
                        <div className="invalid-feedback">{feildsError?.title || t(allError?.title) || t('invalid_user_role_title')}</div>
                    </div>
                    <div className="col-12 mt-3">
                        <Label htmlFor="description" className="form-label">{t('label_user_role_description')}</Label>
                        <textarea
                            placeholder={t('label_user_role_description')}
                            className={`form-control ${feildsError?.description && 'is-invalid backend'}`}
                            required
                            maxLength={6000}
                            onInvalid={handleInvalid}
                            value={formData?.description}
                            name="description"
                            onChange={handleChange}
                        />
                        <div className="invalid-feedback">{feildsError?.description || t(allError?.description) || t('invalid_user_role_description')}</div>
                    </div>

                    <div className="d-flex justify-content-center align-content-center">


                        {ApiLoading ? <Spinner color="success" type="grow" > Loading... </Spinner> :
                            <Button onClick={handleButtonClick} type="submit" color="success" className="btn-animation text-center m-2" data-text={t('save')}> <span>Save</span> </Button>}
                        <Button onClick={onCancelClick} color="danger" outline className="btn-animation text-center m-2" data-text={t('close')}> <span>Close</span> </Button>
                    </div>
                </form>

            </ModalBody>
        </Modal>
    );
};

AddEditUserRoleModal.propTypes = {
    onCloseClick: PropTypes.func,
    onCancelClick: PropTypes.func,
    onDeleteClick: PropTypes.func,
    show: PropTypes.any,
};

export default AddEditUserRoleModal;