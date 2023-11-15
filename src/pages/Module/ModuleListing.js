import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, Container } from 'reactstrap';
import ModuleTable from './ModuleTable';
import AddEditModuleModal from './AddEditModuleModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//redux
import { useSelector, useDispatch } from "react-redux";
import { ModuleData, archiveModule, reActivateModule } from '../../slices/Module/thunk';
import { createSelector } from 'reselect';

import { loadAnimation } from "lottie-web";
import { defineElement } from "lord-icon-element";

//i18n
import { useTranslation } from 'react-i18next';
import { setApiSuccess, setFeildsError } from '../../slices/Module/reducer';
import ArchiveActiveModal from '../../Components/Common/ArchiveActivateModal';
import { useNavigate } from 'react-router-dom';
const ModuleListing = () => {
    const { t } = useTranslation();

    document.title = "All Modules | softbrix - Admin & Dashboard";

    // register lottie and define custom element
    defineElement(loadAnimation);

    const dispatch = useDispatch();
    let navigate = useNavigate()
    const selectLayoutState = (state) => state;
    const UpdateModuleData = createSelector(
        selectLayoutState,
        (state) => {
            return ({
                moduleList: state.UpdateModuleData.moduleList,
                user: state.Profile.user,
                ApiLoading: state.UpdateModuleData.ApiLoading,
                ApiSuccess: state.UpdateModuleData.ApiSuccess,
                ApiError: state.UpdateModuleData.ApiError,
            })
        }
    );
    // Inside your component
    const {
        user,
        moduleList,
        ApiSuccess,
        ApiError,
        ApiLoading,
    } = useSelector(UpdateModuleData);

    useEffect(() => {
        setModuleDataArr(assignUniqueKeys(moduleList))
    }, [moduleList])

    useEffect(() => {
        if (!user.is_super_admin) {   //Only for super admins
            navigate('/home')
        }
    }, [user])


    const [AddModule, setAddModule] = useState(false);
    const [TypeModule, setTypeModule] = useState(false);
    const [SeletedModule, setSeletedModule] = useState({});
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);
    // data
    const [ModuleDataArr, setModuleDataArr] = useState(moduleList);
    // archive
    const [archiveModal, setArchiveModal] = useState(false);
    const [activateModal, setActivateModal] = useState(false);
    const [selectedModule, setSelectedModule] = useState();

    const AddModuleToggle = () => {
        dispatch(setFeildsError({ data: null }))
        setAddModule(true)
        setTypeModule('Add')
    }
    const EditModuleToggle = (data) => {
        dispatch(setFeildsError({ data: null }))
        setTypeModule('Edit')
        setSeletedModule(data)
        setAddModule(true)
    }

    //actions
    const openArchiveModal = (Data) => {
        setSelectedModule(Data)
        setArchiveModal(true)
    };
    const openActivateModal = (Data) => {
        setSelectedModule(Data)
        setActivateModal(true)
    };

    //fetch All Modules
    useEffect(() => {
        dispatch(ModuleData());
    }, [])

    const modalArchived = () => {
        toastSuccess(archiveModal ? 'msg_module_archived' : 'msg_module_activated')
        setArchiveModal(false)
        setActivateModal(false)
        dispatch(setApiSuccess({ data: false }))
    }

    const toastSuccess = (msg) => {
        toast.success(t(msg), { autoClose: 3000 });
        setTimeout(() => { toast.clearWaitingQueue(); }, 3000);
    }

    function assignUniqueKeys(data) {
        const arr = []
        const assignKeyAndRemoveEmptyChildren = (obj) => {
            if (obj.children && Array.isArray(obj.children)) {
                if (obj.children.length === 0) {
                    delete obj.children; // Remove the children attribute if it's an empty array
                } else {
                    arr.push(obj.id)
                    obj.children.forEach(assignKeyAndRemoveEmptyChildren);
                }
            }
        };

        const newData = JSON.parse(JSON.stringify(data)); // Create a deep copy of the original data
        newData.forEach(assignKeyAndRemoveEmptyChildren);
        setExpandedRowKeys(arr)
        return newData;
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>

                    <Card>
                        <CardBody>
                            <div className="gap-2 m-0 d-flex flex-wrap justify-content-between">
                                <div className='d-flex gap-2 justify-content-start flex-wrap align-content-center'>

                                    <h4 className="mb-0 fs-15 text-uppercase fw-bold lh-unset mt-1">{t('module_page_title')}</h4>

                                </div>
                                <div className='d-flex gap-2 justify-content-end'>
                                    <div className="my-auto">

                                        <Button color="success" onClick={() => AddModuleToggle()}>
                                            <i className="ri-add-fill me-1 align-bottom"></i>{t('module_add_btn')}</Button>


                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                    <div>

                        <ModuleTable
                            openActivateModal={openActivateModal}
                            openArchiveModal={openArchiveModal}
                            EditModuleToggle={EditModuleToggle}
                            ModuleDataArr={ModuleDataArr}
                            expandedRowKeys={expandedRowKeys}
                            setExpandedRowKeys={setExpandedRowKeys} />
                    </div>

                </Container>
            </div>

            <AddEditModuleModal
                show={AddModule}
                TypeModule={TypeModule}
                SeletedModule={SeletedModule}
                ModuleDataArr={ModuleDataArr}
                onCancelClick={() => setAddModule(false)}
                onCloseClick={() => {
                    toastSuccess(TypeModule == 'Add' ? 'msg_module_added_successfully' : 'msg_module_updated_successfully')
                    setAddModule(false)
                }}
            />
            <ArchiveActiveModal
                activateModal={activateModal}
                show={archiveModal || activateModal}
                selectedItem={selectedModule}
                onArchiveClick={modalArchived}
                onCloseClick={() => {
                    setArchiveModal(false)
                    setActivateModal(false)
                }}
                ApiLoading={ApiLoading}
                ApiSuccess={ApiSuccess}
                ApiError={ApiError}
                reActivateModule={reActivateModule}
                archiveModule={archiveModule}
                module_name={'module'}
            />

            <ToastContainer closeButton={false} limit={1} />
        </React.Fragment>
    );
};

export default ModuleListing