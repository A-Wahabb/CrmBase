import React, { useEffect, useState } from 'react';
import { Alert, Button, ButtonGroup, Card, CardBody, Container, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledButtonDropdown } from 'reactstrap';
import UserRoleTable from './UserRolesTable';
import AddEditUserRoleModal from './AddEditUserRoleModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//redux
import { useSelector, useDispatch } from "react-redux";
import { UserRoleData, archiveUserRole, archiveUserRoleData, reActivateUserRole } from '../../slices/UserRole/thunk';
import { createSelector } from 'reselect';

import { loadAnimation } from "lottie-web";
import { defineElement } from "lord-icon-element";

//i18n
import { useTranslation } from 'react-i18next';
import { apiError, setApiSuccess, setFeildsError } from '../../slices/UserRole/reducer';
import ArchiveActiveModal from '../../Components/Common/ArchiveActivateModal';
import EditPermissions from './EditPermissions';
import { modulePermision } from '../../slices/thunks';
import { moduleIds } from '../../Components/constants/modulesIds';
import DeniedAccess from '../../Components/Common/DeniedAccess';

const UserRoleListing = () => {
    document.title = "All UserRoles | softbrix - Admin & Dashboard";
    const { t } = useTranslation();

    // register lottie and define custom element
    defineElement(loadAnimation);

    const dispatch = useDispatch();

    const selectLayoutState = (state) => state;
    const UpdateUserRoleData = createSelector(
        selectLayoutState,
        (state) => {
            return ({
                modulePermissions: state.UpdateDefaults.modulePermissions,
                userRoleList: state.UpdateUserRoleData.userRoleList,
                ApiLoading: state.UpdateUserRoleData.ApiLoading,
                ApiSuccess: state.UpdateUserRoleData.ApiSuccess,
                ApiError: state.UpdateUserRoleData.ApiError,
                archiveUserRoleList: state.UpdateUserRoleData.archiveUserRoleList,
            })
        }
    );
    // Inside your component
    const {
        modulePermissions,
        userRoleList,
        archiveUserRoleList,
        ApiLoading,
        ApiSuccess,
        ApiError
    } = useSelector(UpdateUserRoleData);

    const [permissions, setPermissions] = useState()
    const [AddUserRole, setAddUserRole] = useState(false);
    const [TypeUserRole, setTypeUserRole] = useState(false);
    const [SelectedUserRole, setSelectedUserRole] = useState(null);
    const [IsArchivedToggle, setIsArchivedToggle] = useState(false);
    // data
    const [UserRoleDataArr, setUserRoleDataArr] = useState(userRoleList);
    // archive
    const [archiveModal, setArchiveModal] = useState(false);
    const [activateModal, setActivateModal] = useState(false);
    const [permissionModal, setPermissionModal] = useState(false);
    const [Loading, setLoading] = useState(true);
    const [count, setCount] = useState(0)
    const [allowed, setAllowed] = useState(true)


    //fetch All UserRoles
    useEffect(() => {
        dispatch(modulePermision())
        dispatch(UserRoleData());
        dispatch(archiveUserRoleData());
        setCount(1)
    }, [])
    useEffect(() => {
        if (!IsArchivedToggle) {
            setUserRoleDataArr(userRoleList)
        }
        else {
            setUserRoleDataArr(archiveUserRoleList)
        }
    }, [userRoleList, archiveUserRoleList, IsArchivedToggle])

    useEffect(() => {
        if (count !== 0) {
            if (IsArchivedToggle) {
                dispatch(UserRoleData());
            }
            else {
                dispatch(archiveUserRoleData());
            }
        }
    }, [IsArchivedToggle])

    useEffect(() => {
        if (modulePermissions) {
            let module = findModuleById(modulePermissions, moduleIds?.user_role, null)
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


    const AddUserRoleToggle = () => {
        dispatch(setFeildsError({ data: null }))
        setAddUserRole(true)
        setTypeUserRole('Add')
    }
    const EditUserRoleToggle = (data) => {
        dispatch(setFeildsError({ data: null }))
        setTypeUserRole('Edit')
        console.log({ data })
        setSelectedUserRole(data)
        setAddUserRole(true)
    }

    //actions
    const toggleArchive = (Data, type) => {
        console.log({ Data })
        setSelectedUserRole(Data)
        if (type == "permission") {
            setPermissionModal(true)
        }
        else if (type == 'Archive') {
            setArchiveModal(true)
        }
        else {
            setActivateModal(true)
        }
        dispatch(apiError({ data: '' }));
    }

    useEffect(() => {
        if (!ApiLoading && count !== 0) {
            setLoading(false)
        }
    }, [ApiLoading])

    const modalArchived = () => {
        toastSuccess(archiveModal ? 'msg_user_role_archived' : 'msg_user_role_activated');
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

                                    <h4 className="mb-0 fs-15 text-uppercase fw-bold lh-unset mt-1">{t('user_role_page_title')}</h4>

                                    {IsArchivedToggle && <Button color="danger" size='sm' className="w-auto btn-label right rounded-pill h-fitContent "> <i onClick={() => setIsArchivedToggle(!IsArchivedToggle)} className="ri-close-line label-icon align-middle rounded-pill fs-12 ms-2"></i> Archived</Button>}
                                </div>
                                <div className='d-flex gap-2 justify-content-end'>
                                    <div className="my-auto">

                                        <ButtonGroup>
                                            <UncontrolledButtonDropdown>
                                                {permissions?.add ? <Button color="success" className='text-nowrap' onClick={() => AddUserRoleToggle()}>
                                                    <i className="ri-add-fill me-1 align-bottom"></i>{t('user_role_add_btn')}</Button> : <></>}
                                                <DropdownToggle tag="button" className="btn btn-success" split>
                                                </DropdownToggle>
                                                <DropdownMenu >
                                                    <DropdownItem onClick={() => setIsArchivedToggle(!IsArchivedToggle)}>{IsArchivedToggle ? t('active_user_role_btn') : t('archive_user_role_btn')}</DropdownItem>
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

                        <UserRoleTable
                            Loading={Loading}
                            toggleArchive={toggleArchive}
                            EditUserRoleToggle={EditUserRoleToggle}
                            UserRoleDataArr={UserRoleDataArr}
                            permissions={permissions} />
                    </div>}

                </Container>
            </div>
            {permissionModal && <EditPermissions
                show={permissionModal}
                SelectedUserRole={SelectedUserRole}
                onCancelClick={() => setPermissionModal(false)}
                onCloseClick={() => {
                    toastSuccess('msg_user_role_permission_updated_successfully')
                    setPermissionModal(false)
                }}
            />}
            {AddUserRole && <AddEditUserRoleModal
                show={AddUserRole}
                TypeUserRole={TypeUserRole}
                SelectedUserRole={SelectedUserRole}
                onCancelClick={() => setAddUserRole(false)}
                onCloseClick={() => {
                    toastSuccess(TypeUserRole == 'Add' ? 'msg_user_role_added_successfully' : 'msg_user_role_updated_successfully')
                    setAddUserRole(false)
                }}
            />}
            {activateModal && <ArchiveActiveModal
                activateModal={activateModal}
                show={archiveModal || activateModal}
                selectedItem={SelectedUserRole}
                onArchiveClick={modalArchived}
                onCloseClick={() => {
                    setArchiveModal(false)
                    setActivateModal(false)
                }}
                ApiLoading={ApiLoading}
                ApiSuccess={ApiSuccess}
                ApiError={ApiError}
                reActivateModule={reActivateUserRole}
                archiveModule={archiveUserRole}
                module_name={'user_role'}
            />}

            <ToastContainer closeButton={false} limit={1} />
        </React.Fragment>
    );
};

export default UserRoleListing