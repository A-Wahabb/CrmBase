import React, { useEffect, useState } from 'react';
import { Alert, Button, ButtonGroup, Card, CardBody, Container, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledButtonDropdown } from 'reactstrap';
import UserTable from './UserTable';
import AddUserModal from './AddUserModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//redux
import { useSelector, useDispatch } from "react-redux";
import { UserData, archiveUser, archiveUserData, reActivateUser } from '../../slices/User/thunk';
import { createSelector } from 'reselect';

import { loadAnimation } from "lottie-web";
import { defineElement } from "lord-icon-element";

//i18n
import { useTranslation } from 'react-i18next';
import { apiError, setApiSuccess, setFeildsError } from '../../slices/User/reducer';
import ArchiveActiveModal from '../../Components/Common/ArchiveActivateModal';
import EditUserModal from './EditUserModal';
import ViewUserDetailModal from './ViewUserDetailModal';
import { modulePermision } from '../../slices/thunks';
import { moduleIds } from '../../Components/constants/modulesIds';
import DeniedAccess from '../../Components/Common/DeniedAccess';

const UserListing = () => {
    document.title = "All Users | softbrix - Admin & Dashboard";
    const { t } = useTranslation();

    // register lottie and define custom element
    defineElement(loadAnimation);

    const dispatch = useDispatch();

    const selectLayoutState = (state) => state;
    const UpdateUserData = createSelector(
        selectLayoutState,
        (state) => {
            return ({
                modulePermissions: state.UpdateDefaults.modulePermissions,
                userList: state.UpdateUserData.userList,
                user: state.Profile.user,
                ApiLoading: state.UpdateUserData.ApiLoading,
                ApiSuccess: state.UpdateUserData.ApiSuccess,
                ApiError: state.UpdateUserData.ApiError,
                archiveUserList: state.UpdateUserData.archiveUserList,
            })
        }
    );
    // Inside your component
    const {
        modulePermissions,
        userList,
        user,
        archiveUserList,
        ApiLoading,
        ApiSuccess,
        ApiError
    } = useSelector(UpdateUserData);

    const [permissions, setPermissions] = useState()
    const [AddUser, setAddUser] = useState(false);
    const [EditUser, setEditUser] = useState(false);
    const [ViewUser, setViewUser] = useState(false);
    const [IsArchivedToggle, setIsArchivedToggle] = useState(false);
    // data
    const [UserDataArr, setUserDataArr] = useState(userList);
    // archive
    const [archiveModal, setArchiveModal] = useState(false);
    const [activateModal, setActivateModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState();
    const [Loading, setLoading] = useState(true);
    const [count, setCount] = useState(0)
    const [allowed, setAllowed] = useState(true)


    //fetch All Users
    useEffect(() => {
        dispatch(modulePermision())
        dispatch(UserData());
        dispatch(archiveUserData());
        setCount(1)
    }, [])
    useEffect(() => {
        if (!IsArchivedToggle) {
            setUserDataArr(userList)
        }
        else {
            setUserDataArr(archiveUserList)
        }
    }, [userList, archiveUserList, IsArchivedToggle])

    useEffect(() => {
        if (count !== 0) {
            if (IsArchivedToggle) {
                dispatch(archiveUserData());
            }
            else {
                dispatch(UserData());
            }
        }
    }, [IsArchivedToggle])

    useEffect(() => {
        if (modulePermissions) {
            let module = findModuleById(modulePermissions, moduleIds?.user, null)
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


    const AddUserToggle = () => {
        dispatch(setFeildsError({ data: null }))
        setAddUser(true)
    }
    const EditUserToggle = (data) => {
    }

    //actions
    const toggleArchive = (Data, type) => {
        if (type == 'Archive') {
            setArchiveModal(true)
        }
        else if (type == 'Edit') {
            setEditUser(true)
        }
        else if (type == 'View') {
            setViewUser(true)
        }
        else {
            setActivateModal(true)
        }
        setSelectedUser(Data)
        dispatch(setFeildsError({ data: null }))
        dispatch(apiError({ data: '' }));
    }



    useEffect(() => {
        if (!ApiLoading && count !== 0) {
            setLoading(false)
        }
    }, [ApiLoading])

    const modalArchived = () => {
        toastSuccess(archiveModal ? 'msg_user_archived' : 'msg_user_activated');
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

                                    <h4 className="mb-0 fs-15 text-uppercase fw-bold lh-unset mt-1">{t('user_page_title')}</h4>

                                    {IsArchivedToggle && <Button color="danger" size='sm' className="w-auto btn-label right rounded-pill h-fitContent "> <i onClick={() => setIsArchivedToggle(!IsArchivedToggle)} className="ri-close-line label-icon align-middle rounded-pill fs-12 ms-2"></i> Archived</Button>}
                                </div>
                                <div className='d-flex gap-2 justify-content-end'>
                                    <div className="my-auto">

                                        <ButtonGroup>
                                            <UncontrolledButtonDropdown>
                                                {permissions?.add ? <Button color="success" className='text-nowrap' onClick={() => AddUserToggle()}>
                                                    <i className="ri-add-fill me-1 align-bottom"></i>{t('user_add_btn')}</Button> : <></>}
                                                <DropdownToggle tag="button" className="btn btn-success" split>
                                                </DropdownToggle>
                                                <DropdownMenu >
                                                    <DropdownItem onClick={() => setIsArchivedToggle(!IsArchivedToggle)}>{IsArchivedToggle ? t('active_user_btn') : t('archive_user_btn')}</DropdownItem>
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

                        <UserTable
                            Loading={Loading}
                            toggleArchive={toggleArchive}
                            EditUserToggle={EditUserToggle}
                            UserDataArr={UserDataArr}
                            permissions={permissions} />
                    </div>}

                </Container>
            </div>

            {AddUser && <AddUserModal
                show={AddUser}
                onCancelClick={() => setAddUser(false)}
                onCloseClick={() => {
                    toastSuccess('msg_user_added_successfully')
                    setAddUser(false)
                }}
            />}

            {EditUser && <EditUserModal
                show={EditUser}
                SelectedUser={selectedUser}
                onCancelClick={() => setEditUser(false)}
                onCloseClick={() => {
                    toastSuccess('msg_user_updated_successfully')
                    setEditUser(false)
                }}
            />}

            {ViewUser && <ViewUserDetailModal
                show={ViewUser}
                SelectedUser={selectedUser}
                onCloseClick={() => { setViewUser(false) }}
            />}

            {(archiveModal || activateModal) && <ArchiveActiveModal
                activateModal={activateModal}
                show={archiveModal || activateModal}
                selectedItem={selectedUser}
                onArchiveClick={modalArchived}
                onCloseClick={() => {
                    setArchiveModal(false)
                    setActivateModal(false)
                }}
                ApiLoading={ApiLoading}
                ApiSuccess={ApiSuccess}
                ApiError={ApiError}
                reActivateModule={reActivateUser}
                archiveModule={archiveUser}
                module_name={'user'}
            />
            }
            <ToastContainer closeButton={false} limit={1} />
        </React.Fragment>
    );
};

export default UserListing