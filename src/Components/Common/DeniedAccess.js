import PropTypes from "prop-types";
import React from "react";
import { Modal, ModalBody } from "reactstrap";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";

const DeniedAccess = ({ show }) => {
    const { t } = useTranslation();
    const navigate = useNavigate()


    return (
        <Modal fade={true} isOpen={show} centered={true}>
            <ModalBody className="py-3 px-5">
                <div className="mt-2 text-center">
                    <lord-icon
                        src="https://cdn.lordicon.com/kjiurikz.json"
                        trigger="loop"
                        colors="primary:#f24c00,secondary:#ebe6ef"
                        style={{ width: "100px", height: "100px" }}
                    />
                    <div className="mt-3 pt-2 fs-15 mx-4 mx-sm-5">
                        {t('access_denied')}
                    </div>
                </div>
                <div className="d-flex gap-2 justify-content-center mt-4 mb-3">
                    <button
                        type="button"
                        className="btn w-sm btn-danger"
                        data-bs-dismiss="modal"
                        onClick={() => navigate('/home')}
                    >
                        {t('go_to_dashboard')}
                    </button>
                </div>
            </ModalBody>
        </Modal>
    );
};

DeniedAccess.propTypes = {
    show: PropTypes.any,
};

export default DeniedAccess;