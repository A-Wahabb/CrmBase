import React, { useEffect, useState } from 'react';
import { Alert, Button, ButtonGroup, Card, CardBody, Container, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledButtonDropdown } from 'reactstrap';
import DesignationTable from './DesignationTable';
import AddEditDesignationModal from './AddEditDesignationModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//redux
import { useSelector, useDispatch } from "react-redux";
import { DesignationData, archiveDesignation, archiveDesignationData, reActivateDesignation } from '../../slices/Designation/thunk';
import { createSelector } from 'reselect';

import { loadAnimation } from "lottie-web";
import { defineElement } from "lord-icon-element";

//i18n
import { useTranslation } from 'react-i18next';
import { apiError, setApiSuccess, setFeildsError } from '../../slices/Designation/reducer';
import ArchiveActiveModal from '../../Components/Common/ArchiveActivateModal';
import { modulePermision } from '../../slices/thunks';
import { moduleIds } from '../../Components/constants/modulesIds';
import DeniedAccess from '../../Components/Common/DeniedAccess';

const DesignationListing = () => {
    document.title = "All Designations | softbrix - Admin & Dashboard";
    const { t } = useTranslation();

    // register lottie and define custom element
    defineElement(loadAnimation);

    const dispatch = useDispatch();

    const selectLayoutState = (state) => state;
    const UpdateDesignationData = createSelector(
        selectLayoutState,
        (state) => {
            return ({
                modulePermissions: state.UpdateDefaults.modulePermissions,
                designationList: state.UpdateDesignationData.designationList,
                user: state.Profile.user,
                ApiLoading: state.UpdateDesignationData.ApiLoading,
                ApiSuccess: state.UpdateDesignationData.ApiSuccess,
                ApiError: state.UpdateDesignationData.ApiError,
                archiveDesignationList: state.UpdateDesignationData.archiveDesignationList,
            })
        }
    );
    // Inside your component
    const {
        modulePermissions,
        designationList,
        user,
        archiveDesignationList,
        ApiLoading,
        ApiSuccess,
        ApiError
    } = useSelector(UpdateDesignationData);

    const [permissions, setPermissions] = useState()
    const [AddDesignation, setAddDesignation] = useState(false);
    const [TypeDesignation, setTypeDesignation] = useState(false);
    const [SeletedDesignation, setSeletedDesignation] = useState({});
    const [IsArchivedToggle, setIsArchivedToggle] = useState(false);
    // data
    const [DesignationDataArr, setDesignationDataArr] = useState(designationList);
    // archive
    const [archiveModal, setArchiveModal] = useState(false);
    const [activateModal, setActivateModal] = useState(false);
    const [selectedDesignation, setSelectedDesignation] = useState();
    const [Loading, setLoading] = useState(true);
    const [count, setCount] = useState(0)
    const [allowed, setAllowed] = useState(true)


    //fetch All Designations
    useEffect(() => {
        dispatch(modulePermision())
        dispatch(DesignationData());
        dispatch(archiveDesignationData());
        setCount(1)
    }, [])
    useEffect(() => {
        if (!IsArchivedToggle) {
            setDesignationDataArr(designationList)
        }
        else {
            setDesignationDataArr(archiveDesignationList)
        }
    }, [designationList, archiveDesignationList, IsArchivedToggle])

    useEffect(() => {
        if (count !== 0) {
            if (IsArchivedToggle) {
                dispatch(archiveDesignationData());
            }
            else {
                dispatch(DesignationData());
            }
        }
    }, [IsArchivedToggle])

    useEffect(() => {
        if (modulePermissions) {
            let module = findModuleById(modulePermissions, moduleIds?.designation, null)
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


    const AddDesignationToggle = () => {
        dispatch(setFeildsError({ data: null }))
        setAddDesignation(true)
        setTypeDesignation('Add')
    }
    const EditDesignationToggle = (data) => {
        dispatch(setFeildsError({ data: null }))
        setTypeDesignation('Edit')
        setSeletedDesignation(data)
        setAddDesignation(true)
    }

    //actions
    const toggleArchive = (Data, type) => {
        if (type == 'Archive') {
            setArchiveModal(true)
        }
        else {
            setActivateModal(true)
        }
        setSelectedDesignation(Data)
        dispatch(apiError({ data: '' }));
    }



    useEffect(() => {
        if (!ApiLoading && count !== 0) {
            setLoading(false)
        }
    }, [ApiLoading])

    const modalArchived = () => {
        toastSuccess(archiveModal ? 'msg_designation_archived' : 'msg_designation_activated');
        setArchiveModal(false)
        setActivateModal(false)
        dispatch(setApiSuccess({ data: false }))
    }

    const toastSuccess = (msg) => {
        toast.success(t(msg), { autoClose: 3000 });
        setTimeout(() => { toast.clearWaitingQueue(); }, 3000);
    }
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>

                    <Card>
                        <CardBody>
                            <div className="gap-2 m-0 d-flex flex-wrap justify-content-between">
                                <div className='d-flex gap-2 justify-content-start flex-wrap align-content-center'>

                                    <h4 className="mb-0 fs-15 text-uppercase fw-bold lh-unset mt-1">{t('designation_page_title')}</h4>

                                    {IsArchivedToggle && <Button color="danger" size='sm' className="w-auto btn-label right rounded-pill h-fitContent "> <i onClick={() => setIsArchivedToggle(!IsArchivedToggle)} className="ri-close-line label-icon align-middle rounded-pill fs-12 ms-2"></i> Archived</Button>}
                                </div>
                                <div className='d-flex gap-2 justify-content-end'>
                                    <div className="my-auto">

                                        <ButtonGroup>
                                            <UncontrolledButtonDropdown>
                                                {permissions?.add ? <Button color="success" className='text-nowrap' onClick={() => AddDesignationToggle()}>
                                                    <i className="ri-add-fill me-1 align-bottom"></i>{t('designation_add_btn')}</Button> : <></>}
                                                <DropdownToggle tag="button" className="btn btn-success" split>
                                                </DropdownToggle>
                                                <DropdownMenu >
                                                    <DropdownItem onClick={() => setIsArchivedToggle(!IsArchivedToggle)}>{IsArchivedToggle ? t('active_designation_btn') : t('archive_designation_btn')}</DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledButtonDropdown>
                                        </ButtonGroup>

                                    </div>
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

                        <DesignationTable
                            Loading={Loading}
                            toggleArchive={toggleArchive}
                            EditDesignationToggle={EditDesignationToggle}
                            DesignationDataArr={DesignationDataArr}
                            permissions={permissions} />
                    </div>}

                </Container>
            </div>

            <AddEditDesignationModal
                show={AddDesignation}
                TypeDesignation={TypeDesignation}
                SeletedDesignation={SeletedDesignation}
                DesignationDataArr={DesignationDataArr}
                onCancelClick={() => setAddDesignation(false)}
                onCloseClick={() => {
                    toastSuccess(TypeDesignation == 'Add' ? 'msg_designation_added_successfully' : 'msg_designation_updated_successfully')
                    setAddDesignation(false)
                }}
            />
            <ArchiveActiveModal
                activateModal={activateModal}
                show={archiveModal || activateModal}
                selectedItem={selectedDesignation}
                onArchiveClick={modalArchived}
                onCloseClick={() => {
                    setArchiveModal(false)
                    setActivateModal(false)
                }}
                ApiLoading={ApiLoading}
                ApiSuccess={ApiSuccess}
                ApiError={ApiError}
                reActivateModule={reActivateDesignation}
                archiveModule={archiveDesignation}
                module_name={'designation'}
            />

            <ToastContainer closeButton={false} limit={1} />
        </React.Fragment>
    );
};

export default DesignationListing