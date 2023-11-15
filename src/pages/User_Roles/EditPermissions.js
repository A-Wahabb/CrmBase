import PropTypes from "prop-types";
import React, { useState } from "react";
import { Button, Label, Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import { useEffect } from "react";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { setApiSuccess } from "../../slices/UserRole/reducer";
import { PermissionsData, UpdatePermissionsData } from "../../slices/thunks";
import { useTranslation } from 'react-i18next';
import { Checkbox, Table } from "antd";


const EditPermissions = ({ show, SelectedUserRole, onCancelClick, onCloseClick }) => {
    const { t } = useTranslation();

    const dispatch = useDispatch();
    const selectLayoutState = (state) => state;
    const storeData = createSelector(
        selectLayoutState,
        (state) => ({
            ApiLoading: state.UpdateUserRoleData.ApiLoading,
            ApiSuccess: state.UpdateUserRoleData.ApiSuccess,
            feildsError: state.UpdateUserRoleData.feildsError,
            allpermissions: state.UpdateUserRoleData.permissions,
        })
    );
    // Inside your component
    const {
        ApiLoading,
        ApiSuccess,
        feildsError,
        allpermissions
    } = useSelector(storeData);


    const [allModules, setAllModules] = useState(allpermissions)
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);
    const [isClassAdded, setIsClassAdded] = useState(false);
    const [headerCheckBox, setHeaderCheckBox] = useState({
        view: false,
        edit: false,
        add: false,
        delete: false
    });

    const handlePermissionChange = (moduleId, key, value) => {
        setAllModules(prevModules => {
            const updatedModules = updatePermission(prevModules, moduleId, key, value);
            setHeaderCheckBox(checkAllPermissionsAreOne(updatedModules));
            return updatedModules;
        });
    };

    const updatePermission = (modules, moduleId, key, value) => {
        return modules.map((module) => {
            if (module.module_id === moduleId) {
                let updatedPermission = {
                    ...module.permission,
                    [key]: value ? 1 : 0,
                };
                if (key === 'view' && !value) {
                    updatedPermission = {
                        ...updatedPermission,
                        edit: 0,
                        delete: 0,
                        add: 0,
                    };
                    if (module.children && module.children.length > 0) {

                        const updatedChildrenpermsision = updateChildPermission(module.children);
                        return {
                            ...module,
                            permission: updatedPermission,
                            children: updatedChildrenpermsision
                        }
                    }

                }
                return {
                    ...module,
                    permission: updatedPermission
                }

            } else if (module.children && module.children.length > 0) {
                const updatedChildren = updatePermission(module.children, moduleId, key, value);
                return {
                    ...module,
                    children: updatedChildren,
                };
            }
            return module;
        });
    };

    const updateChildPermission = (childModule) => {
        return childModule.map(each => {
            if (each.type == 2) {
                let updatedPermission = {
                    ...each.permission,
                    view: 0,
                    edit: 0,
                    delete: 0,
                    add: 0,
                };

                if (each.children && each.children.length > 0) {

                    const updatedChildrenpermsision = updateChildPermission(each.children);
                    return {
                        ...each,
                        permission: updatedPermission,
                        children: updatedChildrenpermsision
                    }
                }
                else {
                    return {
                        ...each,
                        permission: updatedPermission
                    }
                }
            }
            return each
        })
    }
    const findModuleById = (allModules, moduleId) => {
        for (const module of allModules) {
            if (module.module_id === moduleId) {
                // console.d({ moduleId, module })
                return module.permission.view;
            }
            if (module.children && module.children.length > 0) {
                const foundModule = findModuleById(module.children, moduleId);
                if (foundModule) {
                    // console.d({ moduleId, foundModule })
                    return foundModule;
                }
            }
        }
        return null;
    };
    const updatePermissionKey = (data, key, value, allowedKey, haveParent, parent) => {
        const newData = data.map((item) => {
            const updatedItem = { ...item };
            if (key === 'view' && !value) {
                updatedItem.permission = {
                    ...updatedItem.permission,
                    view: 0,
                    add: 0,
                    edit: 0,
                    delete: 0,
                };
            }
            else if (key !== 'view' && value) {
                if (updatedItem[allowedKey] && updatedItem.permission.view && ((haveParent && ((updatedItem.type == 2 && parent.permission.view) || updatedItem.type == 1)) || !haveParent)) {
                    updatedItem.permission[key] = value ? 1 : 0;
                }
            }
            else {
                updatedItem.permission[key] = value ? 1 : 0;
            }
            if (updatedItem.children && updatedItem.children.length > 0) {
                updatedItem.children = updatePermissionKey(
                    updatedItem.children,
                    key,
                    value,
                    allowedKey,
                    updatedItem.parent_id,
                    updatedItem
                );
            }
            return updatedItem;
        });

        return newData;
    };

    const updateKey = (key, value, allowedKey) => {
        setHeaderCheckBox({
            ...headerCheckBox,
            [key]: value
        })
        const updatedData = updatePermissionKey(allModules, key, value, allowedKey, false);
        setAllModules(updatedData);
        if (key == 'view') {

            setHeaderCheckBox(checkAllPermissionsAreOne(updatedData))
        }
    };
    useEffect(() => {
        if (ApiSuccess && show) {
            dispatch(setApiSuccess({ data: false }))
            onCloseClick()
        }
    }, [ApiSuccess])


    useEffect(() => {
        if (SelectedUserRole) {
            dispatch(PermissionsData(SelectedUserRole.id))
        }
    }, [SelectedUserRole])

    const handleButtonClick = () => {
    };


    const onSubmit = () => {
        const formData = new FormData();
        createFormData(allModules, formData);
        formData.append('id', SelectedUserRole.id)
        // Accessing the form data
        for (const entry of formData.entries()) {
        }
        dispatch(UpdatePermissionsData(formData))
    }


    const createFormData = (data, formData, parentKey = null) => {


        const permisions = [
            'view',
            'add',
            'edit',
            'delete',
        ]
        data.forEach((module) => {
            const moduleKey = `module[${module.module_id}]`;

            let permission = []
            permisions.map(key =>
                permission.push(module.permission[key])
            )
            formData.append(moduleKey, JSON.stringify(permission));

            if (module.children) {
                createFormData(module.children, formData, moduleKey);
            }
        });
    };

    const checkAllPermissionsAreOne = (data) => {
        let totalCount = 0
        const results = {
            add: true,
            edit: true,
            view: true,
            delete: true
        };

        const falseCount = {
            add: 0,
            edit: 0,
            view: 0,
            delete: 0
        }

        const permisions = [
            { key: 'add', allowedKey: 'writable' },
            { key: 'edit', allowedKey: 'editable' },
            { key: 'view', allowedKey: 'readable' },
            { key: 'delete', allowedKey: 'deletable' }
        ]

        const traverseModules = (modules, haveParent, parent) => {
            for (const module of modules) {
                totalCount++
                if (module.permission) {
                    for (const eachPermission of permisions) {
                        if (checkCondition(module, eachPermission.key, eachPermission.allowedKey, haveParent, parent, falseCount)) {

                            permisions.filter(x => x.key !== eachPermission.key)
                            results[eachPermission.key] = false
                        }

                        if (!results.add && !results.edit && !results.delete && !results.view) {
                            break;
                        }
                    }
                }

                if (module.children && module.children.length > 0) {
                    traverseModules(module.children, module.parent_id !== 0 ? true : false, module);
                }
            }
        };

        traverseModules(data, false);
        const updatedResults = compareResultsWithFalseCount(results, falseCount);
        return updatedResults
    };

    const checkCondition = (module, key, allowedKey, haveParent, parent, falseCount) => {
        if (module.permission[key] !== 1) {
            if (module[allowedKey] && ((key !== 'view' && module.permission.view) || key == 'view') && ((haveParent && ((module.type == 2 && parent.permission.view) || module.type == 1)) ||
                !haveParent)) {
                return true;

            }
        }
        else {
            falseCount[key]++
        }
        return false
    }
    const compareResultsWithFalseCount = (results, falseCount) => {
        const updatedResults = { ...results };

        for (const key in results) {
            if (falseCount[key] == 0) {
                updatedResults[key] = false;
            }
        }

        return updatedResults;
    };

    useEffect(() => {
        if (allpermissions) {
            setAllModules(assignUniqueKeys(allpermissions))
            setHeaderCheckBox(checkAllPermissionsAreOne(allpermissions))
        }

    }, [allpermissions])


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

    const columns = [
        {
            title: 'MODULE NAME',
            dataIndex: 'module_name',
            key: 'module_name',
            width: '35%',
            render: (text, record) => ({
                children: text,
            }),
        },
        {
            title: (
                <div className="d-flex">
                    <Checkbox
                        id='view'
                        checked={headerCheckBox?.view}
                        onChange={(e) => updateKey('view', e.target.checked, 'readable')} />
                    <Label className='mb-0 ps-3' htmlFor="view">VIEW</Label>
                </div>
            ),
            // title: 'View',
            key: 'view',
            render: (text, record) =>
                record.readable === 1 ? (
                    <Checkbox
                        checked={record.permission?.view === 1}
                        disabled={(record.parent_id !== 0 && record.type == 2) ? !findModuleById(allModules, record.parent_id) : false} // Disable checkbox if view is unchecked
                        onChange={(e) => handlePermissionChange(record.module_id, 'view', e.target.checked)} />
                ) : null,
        },
        {
            title: (
                <div className="d-flex">
                    <Checkbox
                        id='edit'
                        checked={headerCheckBox?.edit}
                        onChange={(e) => updateKey('edit', e.target.checked, 'editable')} />
                    <Label className='mb-0 ps-3' htmlFor="edit">EDIT</Label>
                </div>
            ),
            key: 'edit',
            render: (text, record) =>
                record.editable === 1 ? (
                    <Checkbox
                        checked={record.permission?.edit === 1}
                        disabled={record.permission?.view === 0 ? true : (record.parent_id !== 0 && record.type == 2) ? !findModuleById(allModules, record.parent_id) : false} // Disable checkbox if view is unchecked
                        onChange={(e) => handlePermissionChange(record.module_id, 'edit', e.target.checked)}
                    />
                ) : null,
        },
        {
            title: (
                <div className="d-flex">
                    <Checkbox
                        id='delete'
                        checked={headerCheckBox?.delete}
                        onChange={(e) => updateKey('delete', e.target.checked, 'deletable')} />
                    <Label className='mb-0 ps-3' htmlFor="delete">DELETE</Label>
                </div>
            ),
            key: 'delete',
            render: (text, record) =>
                record.deletable === 1 ? (
                    <Checkbox
                        checked={record.permission?.delete === 1}
                        disabled={record.permission?.view === 0 ? true : (record.parent_id !== 0 && record.type == 2) ? !findModuleById(allModules, record.parent_id) : false} // Disable checkbox if view is unchecked
                        onChange={(e) => handlePermissionChange(record.module_id, 'delete', e.target.checked)}
                    />
                ) : null,
        },
        {
            title: (
                <div className="d-flex">
                    <Checkbox
                        id='add'
                        checked={headerCheckBox?.add}
                        onChange={(e) => updateKey('add', e.target.checked, 'writable')} />
                    <Label className='mb-0 ps-3' htmlFor="add">ADD</Label>
                </div>
            ),
            key: 'add',
            render: (text, record) =>
                record.writable === 1 ? (
                    <Checkbox
                        checked={record.permission?.add === 1}
                        disabled={record.permission?.view === 0 ? true : (record.parent_id !== 0 && record.type == 2) ? !findModuleById(allModules, record.parent_id) : false} // Disable checkbox if view is unchecked
                        onChange={(e) => handlePermissionChange(record.module_id, 'add', e.target.checked)}
                    />
                ) : null,
        },
    ];

    return (
        <Modal size='xl' fade={true} className="fullHeight" isOpen={show} toggle={onCancelClick} centered={true}>
            <ModalHeader toggle={onCancelClick} tag="h5" className="p-3 bg-info-subtle modal-title ">
                {t('user_role_edit_permissions_btn')}
            </ModalHeader>
            <ModalBody className="py-3 px-5">
                {/* <button onClick={() => checkAllPermissionsAreOne(allModules)} >View</button> */}
                <form onSubmit={(e) => {
                    e.preventDefault()
                    onSubmit()
                }} className={`row fullHeightDiv ${(isClassAdded || feildsError) ? 'was-validated' : ''}`}>

                    {/* <div style={{ maxHeight: '80vh', overflowY: 'scroll' }}> */}
                    {allModules && <Table dataSource={allModules} columns={columns} pagination={false}
                        rowKey="id"
                        scroll={{
                            y: '70vh',
                        }}
                        expandable={{
                            expandedRowKeys,
                            onExpand: (expandable, record) => {
                                if (expandable) {
                                    setExpandedRowKeys([...expandedRowKeys, record.id]);
                                } else {
                                    setExpandedRowKeys(expandedRowKeys.filter((id) => record.id !== id));
                                }
                            },
                        }} />}
                    {/* </div> */}

                    <div className="d-flex justify-content-center align-content-center mt-auto">


                        {ApiLoading ? <Spinner color="success" type="grow" > Loading... </Spinner> :
                            <Button onClick={handleButtonClick} type="submit" color="success" className="btn-animation text-center m-2" data-text={t('save')}> <span>Save</span> </Button>}
                        <Button onClick={onCancelClick} color="danger" outline className="btn-animation text-center m-2" data-text={t('close')}> <span>Close</span> </Button>
                    </div>
                </form>

            </ModalBody>
        </Modal>
    );
};

EditPermissions.propTypes = {
    onCloseClick: PropTypes.func,
    onCancelClick: PropTypes.func,
    onDeleteClick: PropTypes.func,
    show: PropTypes.any,
};

export default EditPermissions;

