import PropTypes from "prop-types";
import React, { useState } from "react";
import { Button, Label, Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import usFlag from '../../assets/images/flags/us.svg'
import frFlag from '../../assets/images/flags/fr.svg'
import esFlag from '../../assets/images/flags/es.svg'
import deFlag from '../../assets/images/flags/de.svg'
import arFlag from '../../assets/images/flags/sa.svg'
import itFlag from '../../assets/images/flags/it.svg'
import cnFlag from '../../assets/images/flags/cn.svg'
import { useEffect } from "react";
import { TreeSelect } from "antd";
import { TreeNode } from "antd/es/tree-select";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { setApiSuccess } from "../../slices/Module/reducer";
import { addModule, updateModule } from "../../slices/thunks";

import { useTranslation } from 'react-i18next';

const AddEditModuleModal = ({ show, TypeModule, SeletedModule, ModuleDataArr, onCancelClick, onCloseClick, props }) => {
    const { t } = useTranslation();

    const dispatch = useDispatch();
    const selectLayoutState = (state) => state;
    const storeData = createSelector(
        selectLayoutState,
        (state) => ({
            ApiLoading: state.UpdateModuleData.ApiLoading,
            ApiSuccess: state.UpdateModuleData.ApiSuccess,
            feildsError: state.UpdateModuleData.feildsError,
        })
    );
    // Inside your component
    const {
        ApiLoading,
        ApiSuccess,
        feildsError
    } = useSelector(storeData);


    const initialValues = {
        parent_id: {
            label: '',
            value: ''
        },
        name: "",
        description: "",
        sort_order: '',
        readable: true,
        writable: false,
        editable: false,
        deletable: false,
        show_in_menu: false,
        module_status: 1,
        type: 1,
        url: "",
        icon: "",
        slug: "",
        created_at: null,
        updated_at: null,
        "singular-de": "",
        "singular-en": "",
        "singular-es": "",
        "singular-fr": "",
        "singular-cn": "",
        "singular-ar": "",
        "singular-it": "",
        "plural-de": "",
        "plural-en": "",
        "plural-es": "",
        "plural-fr": "",
        "plural-cn": "",
        "plural-ar": "",
        "plural-it": ""
    }

    const [formData, setFormData] = useState(initialValues)
    const [isClassAdded, setIsClassAdded] = useState(false);
    const [allError, setAllError] = useState(null)

    useEffect(() => {
        if (ApiSuccess && show) {
            dispatch(setApiSuccess({ data: false }))
            onCloseClick()
        }
    }, [ApiSuccess])

    useEffect(() => {
        if (TypeModule === 'Edit') {
            setFormData({ ...SeletedModule, ...getTranslations(SeletedModule?.get_singular, 'singular-'), ...getTranslations(SeletedModule?.get_plural, 'plural-'), parent_id: setParentId() })
        }
        else {
            setFormData(initialValues)
        }
        setIsClassAdded(false)
    }, [SeletedModule, TypeModule])

    function getTranslations(obj, prefix) {
        const singularTranslations = {};

        for (const key in obj) {
            if (key !== "id" && key !== "sp_type" && key !== "created_at" && key !== "updated_at") {
                const newKey = `${prefix}${key}`;
                singularTranslations[newKey] = obj[key];
            }
        }

        return singularTranslations;
    }

    const setParentId = () => {
        const find = findObjectById(ModuleDataArr, SeletedModule?.parent_id)


        if (find) {
            return { label: find.name, value: find.id }
        }
        else {
            return {
                label: '',
                value: ''
            }
        }

    }

    function findObjectById(arr, id) {
        for (const obj of arr) {
            if (obj.id === id) {
                return obj;
            }

            if (obj.children && Array.isArray(obj.children)) {
                const nestedResult = findObjectById(obj.children, id);
                if (nestedResult) return nestedResult;
            }
        }

        return null;
    }


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        if (type === 'checkbox') {
            setFormData({
                ...formData,
                [name]: checked
            })
        }
        else {
            setFormData({
                ...formData,
                [name]: value
            })
        }
    }

    const selectChange = (name, value) => {
        setFormData({
            ...formData,
            parent_id: { label: value[0], value: name }
        })
    }

    const handleButtonClick = () => {
        if (!isClassAdded) {
            setIsClassAdded(true);
        }
    };

    const handleInvalid = (event) => {
        event.preventDefault()
        // let err=''
        if (event.target.validity.valueMissing) {
            setAllError({ ...allError, [event.target.name]: 'This Feild Is Required' })
        }
        if (event.target.validity.typeMismatch) {
            setAllError({ ...allError, [event.target.name]: 'Email Format Does not match' })
        }
        if (event.target.validity.tooShort || event.target.validity.rangeUnderflow) {
            setAllError({ ...allError, [event.target.name]: 'Minimum 8 characters are required' })
        }

    };

    const onSubmit = () => {
        let data = new FormData();

        if (parseInt(formData.type) == 1) {
            data.append('dynamic', 'on');
        }
        else {
            data.append('static', 'on');
        }
        if (formData.parent_id?.value) {
            data.append('parent_module', parseInt(formData.parent_id?.value));
        }
        else {
            data.append('parent_module', '0');
        }
        if (formData.show_in_menu) { data.append('is_menu', 'on'); }
        if (formData.writable) { data.append('is_writable', 'on') };
        if (formData.editable) { data.append('is_editable', 'on') };
        if (formData.deletable) { data.append('is_deletable', 'on') };
        data.append('module_name', formData.name);
        data.append('module_url', formData.url);
        data.append('module_icon', formData.icon);
        data.append('module_slug', formData.slug);
        data.append('module_description', formData.description);
        data.append('sort_order', formData.sort_order);
        data.append('singular-en', formData['singular-en']);
        data.append('plural-en', formData['plural-en']);
        data.append('singular-fr', formData['singular-fr']);
        data.append('plural-fr', formData['plural-fr']);
        data.append('singular-es', formData['singular-es']);
        data.append('plural-es', formData['plural-es']);
        data.append('singular-de', formData['singular-de']);
        data.append('plural-de', formData['plural-de']);
        data.append('singular-cn', formData['singular-cn']);
        data.append('plural-cn', formData['plural-cn']);
        data.append('singular-ar', formData['singular-ar']);
        data.append('plural-ar', formData['plural-ar']);
        data.append('singular-it', formData['singular-it']);
        data.append('plural-it', formData['plural-it']);


        if (TypeModule == 'Edit') {
            data.append('id', formData?.id)
            dispatch(updateModule(data));
        }
        else {
            dispatch(addModule(data))
        }
    }



    function filterTreeNode(inputValue, treeNode) {
        const title = treeNode.title?.toLowerCase();
        return title.includes(inputValue.toLowerCase());
    }


    return (
        <Modal size="xl" fade={true} isOpen={show} toggle={onCancelClick} centered={true}>
            <ModalHeader toggle={onCancelClick} tag="h5" className="p-3 bg-info-subtle modal-title">
                {TypeModule === 'Edit' ? t('module_edit_btn') : t('module_add_btn')}
            </ModalHeader>
            <ModalBody className="py-3 px-5">
                <form onSubmit={(e) => {
                    e.preventDefault()
                    onSubmit()
                }} className={`row ${(isClassAdded || feildsError) ? 'was-validated' : ''}`}>



                    <div className="col-12 col-md-6 mb-3">
                        <div className="row">
                            <Label htmlFor="parent_id" className="form-label">{t('label_module_type')}</Label>
                            <div className="d-inline-flex">

                                <div className="form-check form-radio-secondary pe-4">
                                    <input className="form-check-input" type="radio" name="type" checked={parseInt(formData.type) === 2} onChange={handleChange}
                                        onInvalid={handleInvalid} id="Static" value={2} />
                                    <Label className="form-check-label" for="Static">
                                        {t('label_static_module')}
                                    </Label>
                                </div>
                                <div className="form-check form-radio-secondary">
                                    <input className="form-check-input" type="radio" name="type" checked={parseInt(formData.type) === 1} onChange={handleChange}
                                        onInvalid={handleInvalid} id="Dynamic" value={1} />
                                    <Label className="form-check-label" for="Dynamic">
                                        {t('label_dynamic_module')}
                                    </Label>
                                </div>
                            </div>
                            <div className="col-12 mt-3">
                                <Label htmlFor="parent_id" className="form-label"> {t('label_parent_module')}</Label>


                                <TreeSelect
                                    showSearch
                                    style={{
                                        width: '100%',
                                    }}
                                    value={formData.parent_id}
                                    dropdownStyle={{
                                        maxHeight: 400,
                                        overflow: 'auto',
                                    }}
                                    placeholder="Select Parent"
                                    allowClear
                                    treeDefaultExpandAll
                                    onChange={selectChange}
                                    filterTreeNode={filterTreeNode}
                                >
                                    {ModuleDataArr.map(par => (
                                        <TreeNode key={par.id} disabled={par.module_status == 2 || par.id == formData.id} value={par.id} title={par.name} >
                                            {par.children?.map(child => (
                                                <TreeNode key={child.id} disabled={child.module_status == 2 || child.id == formData.id || par.id == formData.id} value={child.id} title={child.name}>
                                                    {child.children?.map(grand => (
                                                        <TreeNode key={grand.id} disabled value={grand.id} title={grand.name} />
                                                    ))}
                                                </TreeNode>
                                            ))}
                                        </TreeNode>
                                    ))}

                                </TreeSelect>

                                <div className="invalid-feedback">{feildsError?.parent_module || t(allError?.parent_module) || 'Select the Parent module'}</div>
                            </div>
                            <div className="col-12 col-md-6 mt-3">
                                <Label htmlFor="name" className="form-label"> {t('label_module_name')}</Label>
                                <input
                                    className={`form-control ${feildsError?.module_name && 'is-invalid backend'}`}
                                    required
                                    maxLength={100}
                                    placeholder={t('label_module_name')}
                                    value={formData.name}
                                    name="name"
                                    onChange={handleChange}
                                    onInvalid={handleInvalid}
                                />
                                <div className="invalid-feedback">{feildsError?.module_name || t(allError?.name) || t('invalid_module_name')}</div>
                            </div>
                            <div className="col-12 col-md-6 mt-3">
                                <Label htmlFor="url" className="form-label">{t('label_module_url')}</Label>
                                <input
                                    className={`form-control ${feildsError?.module_url && 'is-invalid backend'}`}
                                    required
                                    maxLength={100}
                                    placeholder={t('label_module_url')}
                                    value={formData.url}
                                    name="url"
                                    onChange={handleChange}
                                    onInvalid={handleInvalid}
                                />
                                <div className="invalid-feedback">{feildsError?.module_url || t(allError?.url) || t('invalid_module_url')}</div>
                            </div>
                            <div className="col-12 col-md-6 mt-3">
                                <Label htmlFor="icon" className="form-label">{t('label_module_icon')}</Label>
                                <input
                                    className={`form-control ${feildsError?.module_icon && 'is-invalid backend'}`}
                                    required
                                    maxLength={100}
                                    placeholder={t('label_module_icon')}
                                    value={formData.icon}
                                    name="icon"
                                    onChange={handleChange}
                                    onInvalid={handleInvalid}
                                />
                                <div className="invalid-feedback">{feildsError?.module_icon || t(allError?.icon) || t('invalid_module_icon')}</div>
                            </div>
                            <div className="col-12 col-md-6 mt-3">
                                <Label htmlFor="slug" className="form-label">{t('label_module_slug')}</Label>
                                <input
                                    className={`form-control ${feildsError?.module_slug && 'is-invalid backend'}`}
                                    required
                                    maxLength={100}
                                    placeholder={t('label_module_slug')}
                                    value={formData.slug}
                                    name="slug"
                                    onChange={handleChange}
                                    onInvalid={handleInvalid}
                                />
                                <div className="invalid-feedback">{feildsError?.module_slug || t(allError?.slug) || t('invalid_module_slug')}</div>
                            </div>
                            <div className="col-12 col-md-6 mt-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="show_in_menu"
                                    checked={formData.show_in_menu}
                                    onChange={handleChange}
                                    onInvalid={handleInvalid}
                                    id="show_in_menu" />
                                <Label htmlFor="show_in_menu" className="form-label ps-2">{t('label_show_menu')}</Label>
                            </div>

                            <div className="col-12 mt-3">
                                <Label htmlFor="description" className="form-label">{t('label_description')}</Label>
                                <textarea
                                    onChange={handleChange}
                                    onInvalid={handleInvalid}
                                    required
                                    maxLength={60000}
                                    placeholder={t('placeholder_description')}
                                    value={formData.description}
                                    name="description" className={`form-control ${feildsError?.module_description && 'is-invalid backend'}`} id="description" rows="4"></textarea>
                                <div className="invalid-feedback">{feildsError?.module_description || t(allError?.description) || t('invalid_escription')}</div>
                            </div>
                            <div className="col-12 mt-3">
                                <Label htmlFor="sort_order" className="form-label">{t('label_sort_order')}</Label>
                                <input
                                    type="number"
                                    min={0}
                                    placeholder={t('label_sort_order')}
                                    max={100}
                                    className={`form-control ${feildsError?.sort_order && 'is-invalid backend'}`}
                                    required
                                    value={formData.sort_order}
                                    name="sort_order"
                                    onChange={handleChange}
                                    onInvalid={handleInvalid}
                                />
                                <div className="invalid-feedback">{feildsError?.sort_order || t(allError?.sort_order) || t('invalid_sort_order')}</div>
                            </div>
                            <div className="col-12 col-md-6 mt-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    disabled
                                    checked={formData.readable}
                                    onChange={handleChange}
                                    onInvalid={handleInvalid}
                                    name="readable"
                                    id="readable" />
                                <Label htmlFor="readable" className="form-check-label ps-2">{t('label_readable')}</Label>
                            </div>
                            <div className="col-12 col-md-6 mt-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={formData?.writable}
                                    onChange={handleChange}
                                    onInvalid={handleInvalid}
                                    name="writable"
                                    id="writable" />
                                <Label htmlFor="writable" className="form-label ps-2">{t('label_editable')}</Label>
                            </div>
                            <div className="col-12 col-md-6 mt-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={formData.editable}
                                    onChange={handleChange}
                                    onInvalid={handleInvalid}
                                    name="editable"
                                    id="editable" />
                                <Label htmlFor="editable" className="form-label ps-2">{t('label_writeable')}</Label>
                            </div>
                            <div className="col-12 col-md-6 mt-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={formData.deletable}
                                    onChange={handleChange}
                                    onInvalid={handleInvalid}
                                    name="deletable"
                                    id="deletable" />
                                <Label htmlFor="deletable" className="form-label ps-2">{t('label_deleteable')}</Label>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                        <div className="row">

                            <div className="col-12 col-md-6 mt-3">
                                <Label htmlFor="singular-en" className="form-label">{t('label_singular_english')}</Label>
                                <div className="input-group">
                                    <span className="input-group-text"><img src={usFlag} alt='usFlag' width='20px' /></span>
                                    <input type="text"
                                        className={`form-control form-control-icon ${feildsError?.hasOwnProperty("singular-en") && 'is-invalid backend'}`}
                                        id="singular-en"
                                        placeholder={t('placeholder_singular_english')}
                                        name="singular-en"
                                        required
                                        maxLength={100}
                                        value={formData["singular-en"]}
                                        onChange={handleChange}
                                        onInvalid={handleInvalid}
                                    />
                                    <div className="invalid-feedback">{feildsError?.hasOwnProperty("singular-en") ? feildsError['singular-en'] : allError?.hasOwnProperty('singular-en') ? allError['singular-en'] : t('invalid_singular_english')}</div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 mt-3">
                                <Label htmlFor="plural-en" className="form-label">{t('label_plural_english')}</Label>
                                <div className="input-group">
                                    <span className="input-group-text"><img src={usFlag} alt='usFlag' width='20px' /></span>
                                    <input type="text"
                                        className={`form-control form-control-icon ${feildsError?.hasOwnProperty("plural-en") && 'is-invalid backend'}`}
                                        id="plural-en"
                                        placeholder={t('placeholder_plural_english')}
                                        name="plural-en"
                                        required
                                        maxLength={100}
                                        value={formData["plural-en"]}
                                        onChange={handleChange}
                                        onInvalid={handleInvalid}
                                    />
                                    <div className="invalid-feedback">{feildsError?.hasOwnProperty("plural-en") ? feildsError['plural-en'] : allError?.hasOwnProperty('plural-en') ? allError['plural-en'] : t('invalid_plural_english')}</div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 mt-3">
                                <Label htmlFor="singular-fr" className="form-label">{t('label_singular_french')}</Label>
                                <div className="input-group">
                                    <span className="input-group-text"><img src={frFlag} alt='frFlag' width='20px' /></span>
                                    <input type="text"
                                        className={`form-control form-control-icon ${feildsError?.hasOwnProperty("singular-fr") && 'is-invalid backend'}`}
                                        id="singular-fr"
                                        placeholder={t('placeholder_singular_french')}
                                        name="singular-fr"
                                        required
                                        maxLength={100}
                                        value={formData["singular-fr"]}
                                        onChange={handleChange}
                                        onInvalid={handleInvalid}
                                    />
                                    <div className="invalid-feedback">{feildsError?.hasOwnProperty("singular-fr") ? feildsError['singular-fr'] : allError?.hasOwnProperty('singular-fr') ? allError['singular-fr'] : t('invalid_singular_french')}</div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 mt-3">
                                <Label htmlFor="plural-fr" className="form-label">{t('label_plural_french')}</Label>
                                <div className="input-group">
                                    <span className="input-group-text"><img src={frFlag} alt='frFlag' width='20px' /></span>
                                    <input type="text"
                                        className={`form-control form-control-icon ${feildsError?.hasOwnProperty("plural-fr") && 'is-invalid backend'}`}
                                        id="plural-fr"
                                        placeholder={t('placeholder_plural_french')}
                                        name="plural-fr"
                                        required
                                        maxLength={100}
                                        value={formData["plural-fr"]}
                                        onChange={handleChange}
                                        onInvalid={handleInvalid}
                                    />
                                    <div className="invalid-feedback">{feildsError?.hasOwnProperty("plural-fr") ? feildsError['plural-fr'] : allError?.hasOwnProperty('plural-fr') ? allError['plural-fr'] : t('invalid_plural_french')}</div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 mt-3">
                                <Label htmlFor="singular-es" className="form-label">{t('label_singular_spanish')}</Label>
                                <div className="input-group">
                                    <span className="input-group-text"><img src={esFlag} alt='esFlag' width='20px' /></span>
                                    <input type="text"
                                        className={`form-control form-control-icon ${feildsError?.hasOwnProperty("singular-es") && 'is-invalid backend'}`}
                                        id="singular-es"
                                        placeholder={t('placeholder_singular_spanish')}
                                        name="singular-es"
                                        required
                                        maxLength={100}
                                        value={formData["singular-es"]}
                                        onChange={handleChange}
                                        onInvalid={handleInvalid}
                                    />
                                    <div className="invalid-feedback">{feildsError?.hasOwnProperty("singular-es") ? feildsError['singular-es'] : allError?.hasOwnProperty('singular-es') ? allError['singular-es'] : t('invalid_singular_spanish')}</div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 mt-3">
                                <Label htmlFor="plural-es" className="form-label">{t('label_plural_spanish')}</Label>
                                <div className="input-group">
                                    <span className="input-group-text"><img src={esFlag} alt='esFlag' width='20px' /></span>
                                    <input type="text"
                                        className={`form-control form-control-icon ${feildsError?.hasOwnProperty("plural-es") && 'is-invalid backend'}`}
                                        id="plural-es"
                                        placeholder={t('placeholder_plural_spanish')}
                                        name="plural-es"
                                        required
                                        maxLength={100}
                                        value={formData["plural-es"]}
                                        onChange={handleChange}
                                        onInvalid={handleInvalid}
                                    />
                                    <div className="invalid-feedback">{feildsError?.hasOwnProperty("plural-es") ? feildsError['plural-es'] : allError?.hasOwnProperty('plural-es') ? allError['plural-es'] : t('invalid_plural_spanish')}</div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 mt-3">
                                <Label htmlFor="singular-de" className="form-label">{t('label_singular_german')}</Label>
                                <div className="input-group">
                                    <span className="input-group-text"><img src={deFlag} alt='deFlag' width='20px' /></span>
                                    <input type="text"
                                        className={`form-control form-control-icon ${feildsError?.hasOwnProperty("singular-de") && 'is-invalid backend'}`}
                                        id="singular-de"
                                        placeholder={t('placeholder_singular_german')}
                                        name="singular-de"
                                        required
                                        maxLength={100}
                                        value={formData["singular-de"]}
                                        onChange={handleChange}
                                        onInvalid={handleInvalid}
                                    />
                                    <div className="invalid-feedback">{feildsError?.hasOwnProperty("singular-de") ? feildsError['singular-de'] : allError?.hasOwnProperty('singular-de') ? allError['singular-de'] : t('invalid_singular_german')}</div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 mt-3">
                                <Label htmlFor="plural-de" className="form-label">{t('label_plural_german')}</Label>
                                <div className="input-group">
                                    <span className="input-group-text"><img src={deFlag} alt='deFlag' width='20px' /></span>
                                    <input type="text"
                                        className={`form-control form-control-icon ${feildsError?.hasOwnProperty("plural-de") && 'is-invalid backend'}`}
                                        id="plural-de"
                                        placeholder={t('placeholder_plural_german')}
                                        name="plural-de"
                                        required
                                        maxLength={100}
                                        value={formData["plural-de"]}
                                        onChange={handleChange}
                                        onInvalid={handleInvalid}
                                    />
                                    <div className="invalid-feedback">{feildsError?.hasOwnProperty("plural-de") ? feildsError['plural-de'] : allError?.hasOwnProperty('plural-de') ? allError['plural-de'] : t('invalid_plural_german')}</div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 mt-3">
                                <Label htmlFor="singular-ar" className="form-label">{t('label_singular_arabic')}</Label>
                                <div className="input-group">
                                    <span className="input-group-text"><img src={arFlag} alt='arFlag' width='20px' /></span>
                                    <input type="text"
                                        className={`form-control form-control-icon ${feildsError?.hasOwnProperty("singular-ar") && 'is-invalid backend'}`}
                                        id="singular-ar"
                                        placeholder={t('placeholder_singular_arabic')}
                                        name="singular-ar"
                                        required
                                        maxLength={100}
                                        value={formData["singular-ar"]}
                                        onChange={handleChange}
                                        onInvalid={handleInvalid}
                                    />
                                    <div className="invalid-feedback">{feildsError?.hasOwnProperty("singular-ar") ? feildsError['singular-ar'] : allError?.hasOwnProperty('singular-ar') ? allError['singular-ar'] : t('invalid_singular_arabic')}</div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 mt-3">
                                <Label htmlFor="plural-ar" className="form-label">{t('label_plural_arabic')}</Label>
                                <div className="input-group">
                                    <span className="input-group-text"><img src={arFlag} alt='arFlag' width='20px' /></span>
                                    <input type="text"
                                        className={`form-control form-control-icon ${feildsError?.hasOwnProperty("plural-ar") && 'is-invalid backend'}`}
                                        id="plural-ar"
                                        placeholder={t('placeholder_plural_arabic')}
                                        name="plural-ar"
                                        required
                                        maxLength={100}
                                        value={formData["plural-ar"]}
                                        onChange={handleChange}
                                        onInvalid={handleInvalid}
                                    />
                                    <div className="invalid-feedback">{feildsError?.hasOwnProperty("plural-ar") ? feildsError['plural-ar'] : allError?.hasOwnProperty('plural-ar') ? allError['plural-ar'] : t('invalid_plural_arabic')}</div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 mt-3">
                                <Label htmlFor="singular-it" className="form-label">{t('label_singular_italian')}</Label>
                                <div className="input-group">
                                    <span className="input-group-text"><img src={itFlag} alt='itFlag' width='20px' /></span>
                                    <input type="text"
                                        className={`form-control form-control-icon ${feildsError?.hasOwnProperty("singular-it") && 'is-invalid backend'}`}
                                        id="singular-it"
                                        placeholder={t('placeholder_singular_italian')}
                                        name="singular-it"
                                        required
                                        maxLength={100}
                                        value={formData["singular-it"]}
                                        onChange={handleChange}
                                        onInvalid={handleInvalid}
                                    />
                                    <div className="invalid-feedback">{feildsError?.hasOwnProperty("singular-it") ? feildsError['singular-it'] : allError?.hasOwnProperty('singular-it') ? allError['singular-it'] : t('invalid_singular_italian')}</div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 mt-3">
                                <Label htmlFor="plural-it" className="form-label">{t('label_plural_italian')}</Label>
                                <div className="input-group">
                                    <span className="input-group-text"><img src={itFlag} alt='itFlag' width='20px' /></span>
                                    <input type="text"
                                        className={`form-control form-control-icon ${feildsError?.hasOwnProperty("plural-it") && 'is-invalid backend'}`}
                                        id="plural-it"
                                        placeholder={t('placeholder_plural_italian')}
                                        name="plural-it"
                                        required
                                        maxLength={100}
                                        value={formData["plural-it"]}
                                        onChange={handleChange}
                                        onInvalid={handleInvalid}
                                    />
                                    <div className="invalid-feedback">{feildsError?.hasOwnProperty("plural-it") ? feildsError['plural-it'] : allError?.hasOwnProperty('plural-it') ? allError['plural-it'] : t('invalid_plural_italian')}</div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 mt-3">
                                <Label htmlFor="singular-cn" className="form-label">{t('label_singular_chinees')}</Label>
                                <div className="input-group">
                                    <span className="input-group-text"><img src={cnFlag} alt='cnFlag' width='20px' /></span>
                                    <input type="text"
                                        className={`form-control form-control-icon ${feildsError?.hasOwnProperty("singular-cn") && 'is-invalid backend'}`}
                                        id="singular-cn"
                                        placeholder={t('placeholder_singular_chinees')}
                                        name="singular-cn"
                                        required
                                        maxLength={100}
                                        value={formData["singular-cn"]}
                                        onChange={handleChange}
                                        onInvalid={handleInvalid}
                                    />
                                    <div className="invalid-feedback">{feildsError?.hasOwnProperty("singular-cn") ? feildsError['singular-cn'] : allError?.hasOwnProperty('singular-cn') ? allError['singular-cn'] : t('invalid_singular_chinees')}</div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 mt-3">
                                <Label htmlFor="plural-cn" className="form-label">{t('label_plural_chinees')}</Label>
                                <div className="input-group">
                                    <span className="input-group-text"><img src={cnFlag} alt='cnFlag' width='20px' /></span>
                                    <input type="text"
                                        className={`form-control form-control-icon ${feildsError?.hasOwnProperty("plural-cn") && 'is-invalid backend'}`}
                                        id="plural-cn"
                                        placeholder={t('placeholder_plural_chinees')}
                                        name="plural-cn"
                                        required
                                        maxLength={100}
                                        value={formData["plural-cn"]}
                                        onChange={handleChange}
                                        onInvalid={handleInvalid}
                                    />
                                    <div className="invalid-feedback">{feildsError?.hasOwnProperty("plural-cn") ? feildsError['plural-cn'] : allError?.hasOwnProperty('plural-cn') ? allError['plural-cn'] : t('invalid_plural_chinees')}</div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="d-flex justify-content-center align-content-center">


                        {ApiLoading ? <Spinner color="success" type="grow" > Loading... </Spinner> :
                            <Button onClick={handleButtonClick} type="submit" color="success" className="btn-animation text-center m-2" data-text={t('save')}> <span>Save</span> </Button>}
                        <Button onClick={onCancelClick} color="danger" outline className="btn-animation text-center m-2" data-text={t('close')}> <span>Close</span> </Button>
                    </div>
                </form>

            </ModalBody>
        </Modal>
    );
};

AddEditModuleModal.propTypes = {
    onCloseClick: PropTypes.func,
    onCancelClick: PropTypes.func,
    onDeleteClick: PropTypes.func,
    show: PropTypes.any,
};

export default AddEditModuleModal;