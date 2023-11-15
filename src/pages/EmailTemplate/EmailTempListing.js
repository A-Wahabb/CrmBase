import React, { useEffect, useState } from 'react';
import { Alert, Card, CardBody, Container, } from 'reactstrap';
import EmailTempTable from './EmailTempTable';
import EditEmailTempModal from './EditEmailTempModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from 'reselect';


import { loadAnimation } from "lottie-web";
import { defineElement } from "lord-icon-element";
//i18n
import { useTranslation } from 'react-i18next';
import { apiError, setFeildsError } from '../../slices/EmailTemplates/reducer';
import { getAllEmaitTemp, modulePermision } from '../../slices/thunks';
import { moduleIds } from '../../Components/constants/modulesIds';
import DeniedAccess from '../../Components/Common/DeniedAccess';

const EmailTemplateListing = () => {
    document.title = "All Email Templates | softbrix - Admin & Dashboard";
    const { t } = useTranslation();


    const dispatch = useDispatch();

    const selectLayoutState = (state) => state;
    const UpdateEmailTemp = createSelector(
        selectLayoutState,
        (state) => {
            return ({
                modulePermissions: state.UpdateDefaults.modulePermissions,
                allEmails: state.UpdateEmailTemp.allEmails,
                user: state.Profile.user,
                ApiLoading: state.UpdateEmailTemp.ApiLoading,
                ApiSuccess: state.UpdateEmailTemp.ApiSuccess,
                ApiError: state.UpdateEmailTemp.ApiError,
            })
        }
    );
    // Inside your component
    const {
        modulePermissions,
        allEmails,
        user,
        ApiLoading,
    } = useSelector(UpdateEmailTemp);

    const [permissions, setPermissions] = useState()
    const [EditEmailTemp, setEditEmailTemp] = useState(false);
    const [SeletedEmailTemp, setSeletedEmailTemp] = useState({});
    const [Loading, setLoading] = useState(true);
    const [count, setCount] = useState(0)
    const [allowed, setAllowed] = useState(true)


    //fetch All EmailTemps
    useEffect(() => {
        dispatch(modulePermision())
        dispatch(getAllEmaitTemp())
        setCount(1)
    }, [])


    useEffect(() => {
        if (modulePermissions) {
            let module = findModuleById(modulePermissions, moduleIds.email_temp, null)
            if (module) {

                setPermissions({ ...module?.permission, archive: module?.module_status })
            }
            else { setPermissions({ archive: 2 }) }
        }
    }, [modulePermissions])
    function findModuleById(modules, moduleId, parent) {
        for (let module of modules) {
            if (module.module_id === moduleId) {
                if (!(module?.permission?.view && module?.module_status !== 2 && ((!parent || (module?.type == 2 && parent?.permission?.view)) || module?.type == 1))) {
                    setAllowed(false)
                }
                return module;
            } else if (module.children && module.children.length > 0) {
                let foundModule = findModuleById(module.children, moduleId, module);
                if (foundModule) {
                    return foundModule;
                }
            }
        }
        return null;
    }
    useEffect(() => {
        dispatch(apiError({ data: '' }));
    }, [])


    const EditEmailTempToggle = (data) => {
        dispatch(setFeildsError({ data: null }))
        setSeletedEmailTemp(data)
        setEditEmailTemp(true)
    }

    useEffect(() => {
        if (!ApiLoading && count !== 0) {
            setLoading(false)
        }
    }, [ApiLoading])

    const toastSuccess = (msg) => {
        toast.success(t(msg), { autoClose: 3000 });
        setTimeout(() => { toast.clearWaitingQueue(); }, 3000);
    }
    // register lottie and define custom element
    defineElement(loadAnimation);
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>

                    <Card>
                        <CardBody>
                            <div className="gap-2 m-0 d-flex flex-wrap justify-content-between">
                                <div className='d-flex gap-2 justify-content-start flex-wrap align-content-center'>

                                    <h4 className="mb-0 fs-15 text-uppercase fw-bold lh-unset mt-1">{t('email_temp_page_title')}</h4>

                                </div>
                            </div>
                        </CardBody>
                    </Card>
                    {permissions?.archive == 2 ?

                        <Alert color="danger" className='text-center'>
                            This module is currently archived
                        </Alert>
                        : <></>}
                    {!allowed ? <DeniedAccess show={true} /> : <div>
                        <EmailTempTable
                            Loading={Loading}
                            EditEmailTempToggle={EditEmailTempToggle}
                            allEmails={allEmails}
                            permissions={permissions} />
                    </div>}

                </Container>
            </div>
            {SeletedEmailTemp &&
                <EditEmailTempModal
                    show={EditEmailTemp}
                    SeletedEmailTemp={SeletedEmailTemp}
                    onCancelClick={() => setEditEmailTemp(false)}
                    onClose={() => {
                        toastSuccess('msg_email_temp_updated_successfully')
                        setEditEmailTemp(false)
                    }}
                />
            }

            <ToastContainer closeButton={false} limit={1} />
        </React.Fragment>
    );
};

export default EmailTemplateListing