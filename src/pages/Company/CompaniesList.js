import React, { useState } from 'react';
import { Alert, Button, ButtonGroup, Card, CardBody, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Input, Row, UncontrolledButtonDropdown, UncontrolledDropdown } from 'reactstrap';
import EditCompanyModal from './EditCompanyModal';
import AddCompanyModal from './AddCompanyModal';
import { useEffect } from 'react';
//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { archiveCompany, archivecompanyData, companyData, modulePermision, reActivateCompany, setDefaultCompany, setLoggedInCompany } from '../../slices/thunks';
import { apiError, setApiSuccess, setFeildsError } from '../../slices/CompanyData/reducer';

import dummyUser from "../../assets/images/users/user-dummy-img.jpg";
import { Link } from 'react-router-dom';


import { loadAnimation } from "lottie-web";
import { defineElement } from "lord-icon-element";
import { ToastContainer, toast } from "react-toastify";
//i18n
import { useTranslation } from "react-i18next";
import TooltipComp from '../../Components/Common/Tooltip';
import { Spin } from 'antd';
import ArchiveActiveModal from '../../Components/Common/ArchiveActivateModal';
import { moduleIds } from '../../Components/constants/modulesIds';
import DeniedAccess from '../../Components/Common/DeniedAccess';

const CompanyListing = (props) => {
    document.title = "All Companies | softbrix - Admin & Dashboard";
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const selectLayoutState = (state) => state;
    const UpdateCompanyData = createSelector(
        selectLayoutState,
        (state) => {
            return ({
                modulePermissions: state.UpdateDefaults.modulePermissions,
                companyList: state.UpdateCompanyData.companyList,
                ApiLoading: state.UpdateCompanyData.ApiLoading,
                archiveCompanyList: state.UpdateCompanyData.archiveCompanyList,
                user: state.Profile.user,
                ApiSuccess: state.UpdateCompanyData.ApiSuccess,
                ApiError: state.UpdateCompanyData.ApiError,
            })
        }
    );
    // Inside your component
    const {
        modulePermissions,
        companyList,
        ApiLoading,
        archiveCompanyList,
        user,
        ApiSuccess,
        ApiError,
    } = useSelector(UpdateCompanyData);

    useEffect(() => {
        dispatch(apiError({ data: '' }));
        // dispatch(setApiLoading({ data: false }))
    }, [])


    const [permissions, setPermissions] = useState()
    // archive
    const [archiveModal, setArchiveModal] = useState(false);
    const [activateModal, setActivateModal] = useState(false);
    //view/update
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [IsArchivedToggle, setIsArchivedToggle] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState();
    const [Loading, setLoading] = useState(true);
    const [count, setCount] = useState(0)
    const [allowed, setAllowed] = useState(true)

    // data
    const [DataArray, setDataArray] = useState(companyList);

    //fetch All Companies
    useEffect(() => {
        dispatch(modulePermision())
        dispatch(companyData());
        dispatch(archivecompanyData());
        setCount(1)
    }, [])
    useEffect(() => {
        if (count !== 0) {
            if (IsArchivedToggle) {
                dispatch(archivecompanyData());
            }
            else {
                dispatch(companyData())
            }
        }
    }, [IsArchivedToggle])

    useEffect(() => {
        if (modulePermissions) {
            let module = findModuleById(modulePermissions, moduleIds.company, null)
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
    //update Listing
    useEffect(() => {
        if (!IsArchivedToggle) {
            setDataArray(companyList)
        }
        else {
            setDataArray(archiveCompanyList)
        }
    }, [companyList, archiveCompanyList, IsArchivedToggle])

    const [userColors, setUserColors] = useState({});

    useEffect(() => {
        const colors = {};

        // Initialize the colors for each user
        DataArray.forEach((company) => {
            company.first_three_users.forEach((user) => {
                if (!user.profile_photo) {
                    colors[user.first_name[0]] = getRandomIndex();
                }
            });
        });

        setUserColors(colors);
    }, [companyList, archiveCompanyList, IsArchivedToggle]);

    const colors = [
        'primary',
        'secondary',
        'success',
        'info',
        'warning',
        'danger',
        'dark',
    ]
    function getRandomIndex() {
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    }

    const setDatabfrModal = (Data, modal) => {
        dispatch(apiError({ data: '' }));
        dispatch(setFeildsError({ data: null }))
        setSelectedCompany(Data)
        modal(true);
    }

    const AddCompany = () => {
        dispatch(setFeildsError({ data: null }))
        setAddModal(true)
    }

    const searchList = (value) => {
        let list = IsArchivedToggle ? archiveCompanyList : companyList
        if (value !== '') {
            setDataArray(list.filter(x => x.title.toLowerCase().includes(value.toLowerCase()) || x.description.toLowerCase().includes(value.toLowerCase())))
        }
        else {
            setDataArray(list)
        }

    }

    const handleLoggedInCompany = (e, company) => {
        const { name, value, checked } = e.target
        if (checked) {
            dispatch(setLoggedInCompany(parseInt(name), company))
        }
    }

    const handleDefault = (id) => {
        dispatch(setDefaultCompany(id))
    }

    useEffect(() => {
        if (!ApiLoading && count !== 0) {
            setLoading(false)
        }
    }, [ApiLoading])

    const modalArchived = () => {
        toastSuccess(activateModal ? 'msg_company_activated' : 'msg_company_archived')
        setArchiveModal(false)
        setActivateModal(false)
        dispatch(setApiSuccess({ data: false }))
    }

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
                    <Card className=''>
                        <CardBody>
                            <div className="gap-2 m-0 d-flex flex-wrap justify-content-between">
                                <div className='d-flex gap-2 justify-content-start flex-wrap align-content-center'>

                                    <h4 className="mb-0 fs-15 text-uppercase fw-bold lh-unset mt-1">{t('company_page_title')}</h4>

                                    {IsArchivedToggle && <Button color="danger" size='sm' className="w-auto btn-label right rounded-pill h-fitContent "> <i onClick={() => setIsArchivedToggle(!IsArchivedToggle)} className="ri-close-line label-icon align-middle rounded-pill fs-12 ms-2"></i> Archived</Button>}
                                </div>
                                <div className='d-flex gap-2 justify-content-end'>

                                    <div className="search-box hstack">
                                        <input type="text" className="form-control h-100" placeholder={t('search')} onChange={(e) => searchList(e.target.value)} />
                                        <i className="ri-search-line search-icon"></i>
                                    </div>
                                    <div className="my-auto">

                                        <ButtonGroup>
                                            <UncontrolledButtonDropdown>
                                                {permissions?.add ?    //remv dropdown btn when add permission is not available
                                                    <Button color="success" className='text-nowrap' onClick={() => AddCompany()}>
                                                        <i className="ri-add-fill me-1 align-bottom"></i>{t('add')}{' '}<span className='d-none d-lg-inline'>{t('company_singular')}</span> </Button> : <></>}
                                                <DropdownToggle tag="button" className="btn btn-success" split>
                                                </DropdownToggle>
                                                <DropdownMenu >
                                                    <DropdownItem onClick={() => setIsArchivedToggle(!IsArchivedToggle)}>{IsArchivedToggle ? t('active_company_btn') : t('archive_company_btn')}</DropdownItem>
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
                    {!allowed ? <DeniedAccess show={true} /> : <Row className='gx-3'>

                        {Loading ? <Spin /> : DataArray?.map((each, index) => (

                            <Col className='p-2' key={index} xs={12} sm={6} lg={4} xl={3}>
                                <Card className={` h-100 card-animate`}>
                                    <div className={`p-3 bg-${IsArchivedToggle ? 'danger' : (user?.login_company == each?.id) ? 'success' : 'primary'}-subtle  rounded-top`}>
                                        <div className="d-flex align-items-center">
                                            <div className="flex-grow-1">
                                                <h5 className="mb-0 fs-14 text-truncate w-75">{each.title}</h5>
                                            </div>
                                            <div className="flex-shrink-0">
                                                <div className="d-flex align-items-center my-n2">
                                                    {!IsArchivedToggle && <TooltipComp tooltip={user?.login_company == each?.id ? t('switched_company') : t('switch_company')} >
                                                        <div className="form-check form-switch form-switch-success mb-2 mb-md-0">
                                                            <Input
                                                                className="form-check-input"
                                                                name={each.id}
                                                                onChange={(e) => handleLoggedInCompany(e, each)}
                                                                type="checkbox"
                                                                role="switch" id="SwitchCheck4"
                                                                disabled={user?.login_company == each?.id}
                                                                checked={user?.login_company == each?.id} />
                                                        </div>
                                                    </TooltipComp>}

                                                    {(permissions?.edit || permissions?.delete) ? <UncontrolledDropdown direction='start'>
                                                        <DropdownToggle tag="button" className="btn btn-link float-end text-muted p-1 py-0 text-decoration-none fs-15">
                                                            <i className={` ri-more-fill fs-22`}></i>
                                                        </DropdownToggle>

                                                        <DropdownMenu className="dropdown-menu-end">
                                                            {!IsArchivedToggle ?
                                                                <>
                                                                    {permissions?.edit && <DropdownItem onClick={() => setDatabfrModal(each, setEditModal)} ><i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{t('view')}/{t('edit')}</DropdownItem>}

                                                                    {!(user?.default_company == each?.id) && <DropdownItem onClick={() => handleDefault(each?.id)} ><i className="ri-home-gear-line align-bottom me-2 text-muted"></i>{t('set_as_default')}</DropdownItem>}

                                                                    {(permissions?.delete && permissions?.edit) ? <><div className="dropdown-divider"></div>
                                                                        <DropdownItem onClick={() => setDatabfrModal(each, setArchiveModal)} data-bs-toggle="modal" data-bs-target="#archiveProjectModal"><i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{t('archive')}</DropdownItem></> : <></>}
                                                                </> :
                                                                permissions?.delete ? <DropdownItem onClick={() => setDatabfrModal(each, setActivateModal)} data-bs-toggle="modal" data-bs-target="#activateProjectModal"><i className="ri-restart-line align-bottom me-2 text-muted" />{t('re_activate')}</DropdownItem> : <></>
                                                            }
                                                        </DropdownMenu>
                                                    </UncontrolledDropdown> : <></>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <CardBody className="p-3 text-center ribbon-box right">
                                        {(user?.default_company == each?.id) && <div className="ribbon ribbon-info round-shape">{t('default')}</div>}

                                        <div className="d-flex mb-2">
                                            <div className="flex-shrink-0 me-3">
                                                <div className="avatar-sm">
                                                    <span className={"avatar-title rounded bg-info-subtle"}>
                                                        {each.logo_url ? <img src={each.logo_url || dummyUser} alt="" className="img-fluid rounded-3 h-100 object-fit-cover" /> : <p className="mb-0 text-center text-info" >{each.title?.split(' ').slice(0, 2).map(x => x[0].toUpperCase())}</p>}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex-grow-1">
                                                <h5 className="mb-1 fs-15 text-start">{each.title}</h5>
                                                <p className="text-muted text-start text-truncate-two-lines mb-3">{each.description}</p>
                                            </div>
                                        </div>


                                    </CardBody>


                                    <div className="card-footer bg-transparent border-top-dashed py-2">
                                        <div className="d-flex align-items-center">
                                            <div className="flex-grow-1">
                                                <div className="avatar-group">
                                                    {each?.first_three_users.slice(0, 3)?.map((item, key) => (
                                                        <React.Fragment key={key}>
                                                            {item.profile_photo ? <Link to="#" className="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" >
                                                                <TooltipComp tooltip={item?.first_name}>
                                                                    <div className="avatar-xxs">
                                                                        <img src={item.profile_photo} alt="" className="rounded-circle img-fluid h-100" />
                                                                    </div>
                                                                </TooltipComp>
                                                            </Link> : <Link to="#" className="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" >
                                                                <TooltipComp tooltip={item?.first_name}>
                                                                    <div className="avatar-xxs">
                                                                        <div className={`avatar-title rounded-circle bg-${userColors[item.first_name[0]]}`}>
                                                                            {item.first_name[0]}
                                                                        </div>
                                                                    </div>
                                                                </TooltipComp>
                                                            </Link>}
                                                        </React.Fragment>
                                                    ))}
                                                    {(each?.first_three_users?.slice(3, each?.first_three_users.length).length + each?.remaning_user) ? <Link to="#" className="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top">
                                                        <div className="avatar-xxs">
                                                            <div className={"avatar-title rounded-circle bg-light border-dashed border text-primary fs-10 "}>
                                                                +{each?.first_three_users?.slice(3, each?.first_three_users.length).length + each?.remaning_user}
                                                            </div>
                                                        </div>
                                                    </Link> : <></>}
                                                </div>
                                            </div>
                                            <div className="flex-shrink-0">
                                                <div className="text-muted">
                                                    <TooltipComp tooltip={t('created_date')}>
                                                        <i className="ri-calendar-event-fill me-1 align-bottom"></i> {each.created_at}
                                                    </TooltipComp>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </Card>
                            </Col>
                        ))}
                        {(!Loading && DataArray.length < 1) && <p className='text-center mt-5 pt-5' >{t('msg_no_data_available')}</p>}
                    </Row>}

                </Container>
            </div>

            {addModal && <AddCompanyModal
                props={props}
                show={addModal}
                onCloseClick={() => setAddModal(false)}
            />}

            {editModal && <EditCompanyModal
                props={props}
                isLoggedInCompany={user?.login_company == selectedCompany?.id}
                show={editModal}
                selectedCompany={selectedCompany}
                onCancelClick={() => setEditModal(false)}
                onCloseClick={() => {
                    toastSuccess('msg_company_updated_successfully');
                    setEditModal(false)
                }}
            />}

            <ArchiveActiveModal
                activateModal={activateModal}
                show={archiveModal || activateModal}
                selectedItem={selectedCompany}
                onArchiveClick={modalArchived}
                onCloseClick={() => {
                    setArchiveModal(false)
                    setActivateModal(false)
                }}
                ApiLoading={ApiLoading}
                ApiSuccess={ApiSuccess}
                ApiError={ApiError}
                reActivateModule={reActivateCompany}
                archiveModule={archiveCompany}
                module_name={'company'}
            />

            <ToastContainer closeButton={false} limit={1} />
        </React.Fragment>
    );
};

export default CompanyListing