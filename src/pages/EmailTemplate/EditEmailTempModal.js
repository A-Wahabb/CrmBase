import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Button, Input, Label, Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import { useState, useEffect } from "react";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import TooltipComp from "../../Components/Common/Tooltip";
import { updateEmailTemp } from "../../slices/thunks";
import { setApiSuccess } from "../../slices/EmailTemplates/reducer";


const EditEmailTempModal = ({ show, SeletedEmailTemp, onCancelClick, onClose }) => {


    const dispatch = useDispatch();
    const selectLayoutState = (state) => state;
    const storeData = createSelector(
        selectLayoutState,
        (state) => ({
            ApiLoading: state.UpdateEmailTemp.ApiLoading,
            ApiSuccess: state.UpdateEmailTemp.ApiSuccess,
            feildsError: state.UpdateEmailTemp.feildsError,
        })
    );
    // Inside your component
    const {
        ApiLoading,
        ApiSuccess,
        feildsError,
    } = useSelector(storeData);

    const initialValues = {
        subject: SeletedEmailTemp?.subject,
        is_active: SeletedEmailTemp?.is_active,
    }

    const [formData, setFormData] = useState(initialValues)
    const [allError, setAllError] = useState(null)
    const [editorData, setEditorData] = useState(SeletedEmailTemp?.content);
    const [isClassAdded, setIsClassAdded] = useState(false);

    useEffect(() => {
        setEditorData(SeletedEmailTemp?.content)
        setFormData(SeletedEmailTemp)
        setIsClassAdded(false)
    }, [SeletedEmailTemp])

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setEditorData(data);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        if (type === 'checkbox') {
            setFormData({
                ...formData,
                [name]: !formData[name]
            })
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
            setAllError({ ...allError, [event.target.name]: 'mandatory_feild' })
        }
        if (event.target.validity.typeMismatch) {
            setAllError({ ...allError, [event.target.name]: 'pattren_mismatch' })
        }
        if (event.target.validity.tooShort || event.target.validity.rangeUnderflow) {
            setAllError({ ...allError, [event.target.name]: 'min_8_required' })
        }
    };
    const handleButtonClick = () => {
        if (!isClassAdded) {
            setIsClassAdded(true);
        }
    };

    const onSubmit = () => {
        let data = new FormData();
        data.append('id', formData?.id);
        data.append('subject', formData?.subject);
        data.append('content', editorData);
        data.append('is_active', formData?.is_active ? '1' : '0');

        dispatch(updateEmailTemp(data))

    }

    useEffect(() => {
        if (ApiSuccess && show) {
            dispatch(setApiSuccess({ data: false }))
            onClose()
        }
    }, [ApiSuccess])


    return (
        <>
            <Modal size="lg" fade={true} isOpen={show} toggle={onCancelClick} centered={true}>
                <ModalHeader toggle={onCancelClick} tag="h5" className="p-3 bg-info-subtle modal-title">
                    {t('btn_edit_email_template')}
                </ModalHeader>
                <ModalBody className="py-3 px-5">

                    <h4 className="card-title mb-3">{SeletedEmailTemp?.event}</h4>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        onSubmit()
                    }} className={`row ${(isClassAdded || feildsError) ? 'was-validated' : ''}`}>

                        <div className="col-12 mb-3">
                            <Label htmlFor="subject" className="form-label"> {t('placeholder_subject')}</Label>
                            <input
                                className={`form-control ${feildsError?.subject && 'is-invalid backend'}`}
                                required
                                maxLength={100}
                                placeholder={t('placeholder_subject')}
                                value={formData?.subject}
                                title={feildsError?.subject || t(allError?.subject)}
                                onInvalid={handleInvalid}
                                name="subject"
                                onChange={handleChange}
                            />
                            <div className="invalid-feedback">{feildsError?.subject || t(allError?.subject) || t('invalid_user_subject')}</div>
                        </div>
                        <div className="col-12 mb-3 d-flex">
                            <Label htmlFor="is_active" className="form-label pe-3"> {t('placeholder_status')}</Label>
                            <div className="form-check form-switch form-switch-success mb-2 mb-md-0">
                                <TooltipComp tooltip={formData?.is_active ? t('active') : t('in_active')} >
                                    <Input
                                        className="form-check-input"
                                        placeholder={t('placeholder_status')}
                                        name="is_active"
                                        onChange={handleChange}
                                        type="checkbox"
                                        role="switch" id="SwitchCheck4"
                                        checked={formData?.is_active} />
                                </TooltipComp>
                            </div>
                        </div>

                        <Label htmlFor="variable" className="form-label"> {t('label_variables')}</Label>
                        <p>
                            {SeletedEmailTemp.variable}
                        </p>
                        <Label htmlFor="content" className="form-label"> {t('label_email_temp_content')}</Label>
                        <CKEditor
                            className='form-control'
                            editor={ClassicEditor}
                            // data="<p>Hello from CKEditor 5!</p>"
                            onReady={(editor) => {
                                // You can store the "editor" and use when it is needed.

                            }}
                            data={editorData}
                            onChange={handleEditorChange}
                        />
                        <div className="text-danger">{(isClassAdded && editorData == '') ? feildsError?.subject || t(allError?.subject) || t('invalid_user_subject') : ''}</div>

                        <div className="text-center mt-4">

                            {ApiLoading ? <Spinner color="success" type="grow" > Loading... </Spinner> :
                                <Button onClick={handleButtonClick} type="submit" color="success" className="btn-animation text-center mx-2" data-text={t('save')}> <span>{t('save')}</span> </Button>}
                            <Button onClick={onCancelClick} color="danger" outline className="btn-animation text-center mx-2" disabled={ApiLoading} data-text={t('close')}> <span>{t('close')}</span> </Button>

                        </div>
                    </form>

                </ModalBody>
            </Modal>
        </>
    );
}

export default EditEmailTempModal;