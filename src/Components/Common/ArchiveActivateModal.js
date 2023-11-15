import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Modal, ModalBody, Spinner } from "reactstrap";
import { useTranslation } from 'react-i18next';
import { useDispatch } from "react-redux";

const ArchiveActiveModal = ({ activateModal, selectedItem, show, onArchiveClick, onCloseClick,
    ApiLoading,
    ApiSuccess,
    ApiError,
    reActivateModule,
    archiveModule,
    module_name }) => {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    // const selectLayoutState = (state) => state;
    // const defaultData = createSelector(
    //     selectLayoutState,
    //     (state) => ({
    //         ApiLoading: state.UpdateDesignationData.ApiLoading,
    //         ApiSuccess: state.UpdateDesignationData.ApiSuccess,
    //         ApiError: state.UpdateDesignationData.ApiError,
    //     })
    // );
    // // Inside your component
    // const {
    //     ApiLoading,
    //     ApiSuccess,
    //     ApiError
    // } = useSelector(defaultData);

    // useEffect(() => {
    //     dispatch(apiError({ data: '' }));
    //     dispatch(setApiLoading({ data: false }))
    // }, [])

    useEffect(() => {
        if (ApiSuccess && show) {
            onArchiveClick()
        }
    }, [ApiSuccess])

    const handleArchive = () => {
        if (activateModal) {
            dispatch(reActivateModule(selectedItem))
        }
        else {
            dispatch(archiveModule(selectedItem))
        }
    }


    return (
        <Modal fade={true} isOpen={show} toggle={onCloseClick} centered={true}>
            <ModalBody className="py-3 px-5">
                <div className="mt-2 text-center">
                    {!activateModal ? <lord-icon
                        src="https://cdn.lordicon.com/gsqxdxog.json"
                        trigger="loop"
                        colors="primary:#f7b84b,secondary:#f06548"
                        style={{ width: "100px", height: "100px" }}
                    /> :
                        <lord-icon
                            src="https://cdn.lordicon.com/nxaaasqe.json"
                            trigger="loop"
                            colors="primary:#121331,secondary:#08a88a"
                            style={{ width: "100px", height: "100px" }} />}
                    <div className="mt-3 pt-2 fs-15 mx-4 mx-sm-5">
                        <h4>{t('are_you_sure')}?</h4>
                        <p className="text-muted mx-4 mb-0">
                            {activateModal ? t(`msg_sure_to_active_this_${module_name}`) : t(`msg_sure_to_archive_this_${module_name}`)}?
                        </p>
                    </div>
                </div>
                <div className="d-flex gap-2 justify-content-center mt-4 mb-3">
                    {ApiLoading ? <div className="w-sm text-center"> <Spinner className="" color={activateModal ? 'success' : "danger"} type="grow" > Loading... </Spinner> </div> :
                        <button
                            type="button"
                            className={`btn w-sm btn-${activateModal ? 'success' : 'danger'}`}
                            id="archive-record"
                            onClick={() => handleArchive()}
                        >
                            {activateModal ? t('btn_activate') : t('btn_archive')}
                        </button>}
                    <button
                        type="button"
                        className="btn w-sm btn-light"
                        data-bs-dismiss="modal"
                        disabled={ApiLoading}
                        onClick={onCloseClick}
                    >
                        {t('btn_close')}
                    </button>
                </div>
                <p className="text-center text-danger" >{ApiError}</p>
            </ModalBody>
        </Modal>
    );
};

ArchiveActiveModal.propTypes = {
    onCloseClick: PropTypes.func,
    onArchiveClick: PropTypes.func,
    show: PropTypes.any,
};

export default ArchiveActiveModal;