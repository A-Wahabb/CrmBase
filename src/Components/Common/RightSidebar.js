import React, { useEffect, useState } from 'react';
import {
    Offcanvas,
    OffcanvasHeader,
    OffcanvasBody,
    Collapse,
} from "reactstrap";
import withRouter from './withRouter';

//redux
import {
    changeLayout,
    changeSidebarTheme,
    changeLayoutMode,
    changeLayoutWidth,
    changeLayoutPosition,
    changeTopbarTheme,
    changeLeftsidebarSizeType,
    changeLeftsidebarViewType,
    changeSidebarImageType,
    changePreLoader,
    changeSidebarVisibility,
    updateSetting
    // resetValue
} from "../../slices/thunks";

import { useSelector, useDispatch } from "react-redux";

//import Constant
import {
    layoutTypes,
    leftSidebarTypes,
    layoutModeTypes,
    layoutWidthTypes,
    layoutPositionTypes,
    topbarThemeTypes,
    leftsidbarSizeTypes,
    leftSidebarViewTypes,
    leftSidebarImageTypes,
    preloaderTypes,
    sidebarVisibilitytypes
} from "../constants/layout";

//SimpleBar
import SimpleBar from "simplebar-react";
import classnames from "classnames";

//import Images
import img01 from "../../assets/images/sidebar/img-1.jpg";
import img02 from "../../assets/images/sidebar/img-2.jpg";
import img03 from "../../assets/images/sidebar/img-3.jpg";
import img04 from "../../assets/images/sidebar/img-4.jpg";
import { createSelector } from 'reselect';
import { t } from 'i18next';

const RightSidebar = (props) => {
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);

    function tog_show() {
        // setShow(!show);
        update('left_sidebar_type', 'gradient', changeSidebarTheme);
    }

    useEffect(() => {
        if (show && document.getElementById("sidebar-color-dark") && document.getElementById("sidebar-color-light")) {
            document.getElementById("sidebar-color-dark").checked = false;
            document.getElementById("sidebar-color-light").checked = false;
        }
    });


    const selectLayoutState = (state) => state.Layout;
    const selectLayoutProperties = createSelector(
        selectLayoutState,
        (layout) => ({
            layoutType: layout.layoutType,
            leftSidebarType: layout.leftSidebarType,
            layoutModeType: layout.layoutModeType,
            layoutWidthType: layout.layoutWidthType,
            layoutPositionType: layout.layoutPositionType,
            topbarThemeType: layout.topbarThemeType,
            leftsidbarSizeType: layout.leftsidbarSizeType,
            leftSidebarViewType: layout.leftSidebarViewType,
            leftSidebarImageType: layout.leftSidebarImageType,
            preloader: layout.preloader,
            sidebarVisibilitytype: layout.sidebarVisibilitytype,
        })
    );
    // Inside your component
    const {
        layoutType,
        leftSidebarType,
        layoutModeType,
        layoutWidthType,
        layoutPositionType,
        topbarThemeType,
        leftsidbarSizeType,
        leftSidebarViewType,
        leftSidebarImageType,
        preloader,
        sidebarVisibilitytype
    } = useSelector(selectLayoutProperties);

    // open offcanvas
    const [open, setOpen] = useState(false);
    const toggleLeftCanvas = () => {
        setOpen(!open);
    };

    window.onscroll = function () {
        scrollFunction();
    };

    const scrollFunction = () => {
        const element = document.getElementById("back-to-top");
        if (element) {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                element.style.display = "block";
            } else {
                element.style.display = "none";
            }
        }
    };

    const toTop = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };

    const pathName = props.router.location.pathname;

    useEffect(() => {
        const preloader = document.getElementById("preloader");
        if (preloader) {
            document.getElementById("preloader").style.opacity = "1";
            document.getElementById("preloader").style.visibility = "visible";
            setTimeout(function () {
                document.getElementById("preloader").style.opacity = "0";
                document.getElementById("preloader").style.visibility = "hidden";
            }, 1000);
        }
    }, [preloader, pathName]);

    const update = (name, newValue, func) => {
        let data = JSON.parse(localStorage.getItem('SiteSetting'));

        dispatch(func(newValue))

        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            if (key !== name && key && !(name === 'layout_width_type' && key === 'left_sidebar_size_type')) {
                formData.append(key, value);
            }
            else if (name === 'layout_width_type' && key === 'left_sidebar_size_type') {
                if (newValue === 'boxed') {
                    data.left_sidebar_size_type = "sm-hover"
                    dispatch(changeLeftsidebarSizeType("sm-hover"))
                    formData.append('left_sidebar_size_type', "sm-hover")
                }
                else {
                    data.left_sidebar_size_type = "lg"
                    dispatch(changeLeftsidebarSizeType("lg"))
                    formData.append('left_sidebar_size_type', "lg")
                }
            }
            else {
                data[key] = newValue
                formData.append(key, newValue)
            }
        });
        localStorage.setItem('SiteSetting', JSON.stringify(data));

        dispatch(updateSetting(formData))
    }



    return (
        <React.Fragment>
            <button
                onClick={() => toTop()}
                className="btn btn-danger btn-icon" id="back-to-top">
                <i className="ri-arrow-up-line"></i>
            </button>

            {preloader === "enable" && <div id="preloader">
                <div id="status">
                    <div className="spinner-border text-primary avatar-sm" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>}

            <div>
                <div className="customizer-setting d-none d-md-block">
                    <div onClick={toggleLeftCanvas} className="btn-info rounded-pill shadow-lg btn btn-icon btn-lg p-2 rounded-pill">
                        <i className='spin ri-settings-4-line fs-22'></i>
                    </div>
                </div>
                <Offcanvas isOpen={open} toggle={toggleLeftCanvas} direction='end'>
                    <OffcanvasHeader className="d-flex align-items-center bg-primary bg-gradient p-3 offcanvas-header-dark" toggle={toggleLeftCanvas}>
                        <span className="m-0 me-2 text-white">{t('customizer')}</span>
                    </OffcanvasHeader>
                    <OffcanvasBody className="p-0">
                        <SimpleBar className="h-100">
                            <div className="p-4">
                                <h6 className="mb-0 fw-semibold text-uppercase">{t('layout')}</h6>
                                <p className="text-muted">{t('choose_layout')}</p>

                                <div className="row gy-3">
                                    <div className="col-4">
                                        <div className="form-check card-radio">
                                            <input
                                                id="customizer-layout01"
                                                name="data-layout"
                                                type="radio"
                                                value={layoutTypes.VERTICAL}
                                                checked={layoutType === layoutTypes.VERTICAL}
                                                onChange={e => {
                                                    if (e.target.checked) {
                                                        update('layout_type', e.target.value, changeLayout);
                                                    }
                                                }}
                                                className="form-check-input"
                                            />
                                            <label className="form-check-label p-0 avatar-md w-100" htmlFor="customizer-layout01">
                                                <span className="d-flex gap-1 h-100">
                                                    <span className="flex-shrink-0">
                                                        <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                            <span className="d-block p-1 px-2 bg-primary-subtle rounded mb-2"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                        </span>
                                                    </span>
                                                    <span className="flex-grow-1">
                                                        <span className="d-flex h-100 flex-column">
                                                            <span className="bg-light d-block p-1"></span>
                                                            <span className="bg-light d-block p-1 mt-auto"></span>
                                                        </span>
                                                    </span>
                                                </span>
                                            </label>
                                        </div>
                                        <h5 className="fs-13 text-center mt-2">{t('vertical')}</h5>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-check card-radio">
                                            <input
                                                id="customizer-layout02"
                                                name="data-layout"
                                                type="radio"
                                                value={layoutTypes.HORIZONTAL}
                                                checked={layoutType === layoutTypes.HORIZONTAL}
                                                onChange={e => {
                                                    if (e.target.checked) {
                                                        update('layout_type', e.target.value, changeLayout);
                                                    }
                                                }}
                                                className="form-check-input" />
                                            <label className="form-check-label p-0 avatar-md w-100" htmlFor="customizer-layout02">
                                                <span className="d-flex h-100 flex-column gap-1">
                                                    <span className="bg-light d-flex p-1 gap-1 align-items-center">
                                                        <span className="d-block p-1 bg-primary-subtle rounded me-1"></span>
                                                        <span className="d-block p-1 pb-0 px-2 bg-primary-subtle ms-auto"></span>
                                                        <span className="d-block p-1 pb-0 px-2 bg-primary-subtle"></span>
                                                    </span>
                                                    <span className="bg-light d-block p-1"></span>
                                                    <span className="bg-light d-block p-1 mt-auto"></span>
                                                </span>
                                            </label>
                                        </div>
                                        <h5 className="fs-13 text-center mt-2">{t('horizontal')}</h5>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-check card-radio">
                                            <input
                                                id="customizer-layout03"
                                                name="data-layout"
                                                type="radio"
                                                value={layoutTypes.TWOCOLUMN}
                                                checked={layoutType === layoutTypes.TWOCOLUMN}
                                                onChange={e => {
                                                    if (e.target.checked) {
                                                        update('layout_type', e.target.value, changeLayout);
                                                    }
                                                }}
                                                className="form-check-input" />
                                            <label className="form-check-label p-0 avatar-md w-100" htmlFor="customizer-layout03">
                                                <span className="d-flex gap-1 h-100">
                                                    <span className="flex-shrink-0">
                                                        <span className="bg-light d-flex h-100 flex-column gap-1">
                                                            <span className="d-block p-1 bg-primary-subtle mb-2"></span>
                                                            <span className="d-block p-1 pb-0 bg-primary-subtle"></span>
                                                            <span className="d-block p-1 pb-0 bg-primary-subtle"></span>
                                                            <span className="d-block p-1 pb-0 bg-primary-subtle"></span>
                                                        </span>
                                                    </span>
                                                    <span className="flex-shrink-0">
                                                        <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                            <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                        </span>
                                                    </span>
                                                    <span className="flex-grow-1">
                                                        <span className="d-flex h-100 flex-column">
                                                            <span className="bg-light d-block p-1"></span>
                                                            <span className="bg-light d-block p-1 mt-auto"></span>
                                                        </span>
                                                    </span>
                                                </span>
                                            </label>
                                        </div>
                                        <h5 className="fs-13 text-center mt-2">{t('two_column')}</h5>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-check card-radio">
                                            <input id="customizer-layout04" name="data-layout" type="radio" className="form-check-input"
                                                value={layoutTypes.SEMIBOX}
                                                checked={layoutType === layoutTypes.SEMIBOX}
                                                onChange={e => {
                                                    if (e.target.checked) {
                                                        update('layout_type', e.target.value, changeLayout);
                                                    }
                                                }}
                                            />
                                            <label className="form-check-label p-0 avatar-md w-100" htmlFor="customizer-layout04">
                                                <span className="d-flex gap-1 h-100">
                                                    <span className="flex-shrink-0 p-1">
                                                        <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                            <span className="d-block p-1 px-2 bg-primary-subtle rounded mb-2"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                        </span>
                                                    </span>
                                                    <span className="flex-grow-1">
                                                        <span className="d-flex h-100 flex-column pt-1 pe-2">
                                                            <span className="bg-light d-block p-1"></span>
                                                            <span className="bg-light d-block p-1 mt-auto"></span>
                                                        </span>
                                                    </span>
                                                </span>
                                            </label>
                                        </div>
                                        <h5 className="fs-13 text-center mt-2">{t('semi_box')}</h5>
                                    </div>
                                </div>

                                <h6 className="mt-4 mb-0 fw-semibold text-uppercase">{t('color_scheme')}</h6>
                                <p className="text-muted">{t('choose_color_scheme')}</p>

                                <div className="colorscheme-cardradio">
                                    <div className="row">
                                        <div className="col-4">
                                            <div className="form-check card-radio">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="data-bs-theme"
                                                    id="layout-mode-light"
                                                    value={layoutModeTypes.LIGHTMODE}
                                                    checked={layoutModeType === layoutModeTypes.LIGHTMODE}
                                                    onChange={e => {
                                                        if (e.target.checked) {
                                                            update('layout_mode', e.target.value, changeLayoutMode);
                                                        }
                                                    }}
                                                />
                                                <label className="form-check-label p-0 avatar-md w-100" htmlFor="layout-mode-light">
                                                    <span className="d-flex gap-1 h-100">
                                                        <span className="flex-shrink-0">
                                                            <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                                <span className="d-block p-1 px-2 bg-primary-subtle rounded mb-2"></span>
                                                                <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                                <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                                <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                            </span>
                                                        </span>
                                                        <span className="flex-grow-1">
                                                            <span className="d-flex h-100 flex-column">
                                                                <span className="bg-light d-block p-1"></span>
                                                                <span className="bg-light d-block p-1 mt-auto"></span>
                                                            </span>
                                                        </span>
                                                    </span>
                                                </label>
                                            </div>
                                            <h5 className="fs-13 text-center mt-2">{t('light')}</h5>
                                        </div>

                                        <div className="col-4">
                                            <div className="form-check card-radio dark">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="data-bs-theme"
                                                    id="layout-mode-dark"
                                                    value={layoutModeTypes.DARKMODE}
                                                    checked={layoutModeType === layoutModeTypes.DARKMODE}
                                                    onChange={e => {
                                                        if (e.target.checked) {
                                                            update('layout_mode', e.target.value, changeLayoutMode);
                                                        }
                                                    }}
                                                />
                                                <label className="form-check-label p-0 avatar-md w-100 bg-dark" htmlFor="layout-mode-dark">
                                                    <span className="d-flex gap-1 h-100">
                                                        <span className="flex-shrink-0">
                                                            <span className="bg-white bg-opacity-10 d-flex h-100 flex-column gap-1 p-1">
                                                                <span className="d-block p-1 px-2 bg-white bg-opacity-10 rounded mb-2"></span>
                                                                <span className="d-block p-1 px-2 pb-0 bg-white bg-opacity-10"></span>
                                                                <span className="d-block p-1 px-2 pb-0 bg-white bg-opacity-10"></span>
                                                                <span className="d-block p-1 px-2 pb-0 bg-white bg-opacity-10"></span>
                                                            </span>
                                                        </span>
                                                        <span className="flex-grow-1">
                                                            <span className="d-flex h-100 flex-column">
                                                                <span className="bg-white bg-opacity-10 d-block p-1"></span>
                                                                <span className="bg-white bg-opacity-10 d-block p-1 mt-auto"></span>
                                                            </span>
                                                        </span>
                                                    </span>
                                                </label>
                                            </div>
                                            <h5 className="fs-13 text-center mt-2">{t('dark')}</h5>
                                        </div>
                                    </div>
                                </div>
                                {layoutType === layoutTypes.SEMIBOX && <div id="sidebar-visibility">
                                    <h6 className="mt-4 mb-0 fw-semibold text-uppercase">{t('sidebar_visibility')}</h6>
                                    <p className="text-muted">{t('choose_sidebar_visibility')}</p>

                                    <div className="row">
                                        <div className="col-4">
                                            <div className="form-check card-radio">
                                                <input className="form-check-input" type="radio" name="data-sidebar-visibility" id="sidebar-visibility-show"
                                                    value={sidebarVisibilitytypes.SHOW}
                                                    checked={sidebarVisibilitytype === sidebarVisibilitytypes.SHOW}
                                                    onChange={e => {
                                                        if (e.target.checked) {
                                                            update('sidebar_visibility_type', e.target.value, changeSidebarVisibility);
                                                        }
                                                    }} />
                                                <label className="form-check-label p-0 avatar-md w-100" htmlFor="sidebar-visibility-show">
                                                    <span className="d-flex gap-1 h-100">
                                                        <span className="flex-shrink-0 p-1">
                                                            <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                                <span className="d-block p-1 px-2 bg-primary-subtle rounded mb-2"></span>
                                                                <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                                <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                                <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                            </span>
                                                        </span>
                                                        <span className="flex-grow-1">
                                                            <span className="d-flex h-100 flex-column pt-1 pe-2">
                                                                <span className="bg-light d-block p-1"></span>
                                                                <span className="bg-light d-block p-1 mt-auto"></span>
                                                            </span>
                                                        </span>
                                                    </span>
                                                </label>
                                            </div>
                                            <h5 className="fs-13 text-center mt-2">{t('show')}</h5>
                                        </div>
                                        <div className="col-4">
                                            <div className="form-check card-radio">
                                                <input className="form-check-input" type="radio" name="data-sidebar-visibility" id="sidebar-visibility-hidden"
                                                    value={sidebarVisibilitytypes.HIDDEN}
                                                    checked={sidebarVisibilitytype === sidebarVisibilitytypes.HIDDEN}
                                                    onChange={e => {
                                                        if (e.target.checked) {
                                                            update('sidebar_visibility_type', e.target.value, changeSidebarVisibility);
                                                        }
                                                    }}
                                                />
                                                <label className="form-check-label p-0 avatar-md w-100 px-2" htmlFor="sidebar-visibility-hidden">
                                                    <span className="d-flex gap-1 h-100">
                                                        <span className="flex-grow-1">
                                                            <span className="d-flex h-100 flex-column pt-1 px-2">
                                                                <span className="bg-light d-block p-1"></span>
                                                                <span className="bg-light d-block p-1 mt-auto"></span>
                                                            </span>
                                                        </span>
                                                    </span>
                                                </label>
                                            </div>
                                            <h5 className="fs-13 text-center mt-2">{t('hidden')}</h5>
                                        </div>
                                    </div>
                                </div>}
                                {(layoutType !== layoutTypes.TWOCOLUMN) && (
                                    <React.Fragment>
                                        {(layoutType === layoutTypes.VERTICAL || layoutType === layoutTypes.HORIZONTAL) && (<div id="layout-width">
                                            <h6 className="mt-4 mb-0 fw-semibold text-uppercase">{t('layout_width')}</h6>
                                            <p className="text-muted">{t('choose_layout_width')}</p>

                                            <div className="row">
                                                <div className="col-4">
                                                    <div className="form-check card-radio">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="data-layout-width"
                                                            id="layout-width-fluid"
                                                            value={layoutWidthTypes.FLUID}
                                                            checked={layoutWidthType === layoutWidthTypes.FLUID}
                                                            onChange={e => {
                                                                if (e.target.checked) {
                                                                    update('layout_width_type', e.target.value, changeLayoutWidth);
                                                                }
                                                            }}
                                                        />
                                                        <label className="form-check-label p-0 avatar-md w-100" htmlFor="layout-width-fluid">
                                                            <span className="d-flex gap-1 h-100">
                                                                <span className="flex-shrink-0">
                                                                    <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                                        <span className="d-block p-1 px-2 bg-primary-subtle rounded mb-2"></span>
                                                                        <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                                        <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                                        <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                                    </span>
                                                                </span>
                                                                <span className="flex-grow-1">
                                                                    <span className="d-flex h-100 flex-column">
                                                                        <span className="bg-light d-block p-1"></span>
                                                                        <span className="bg-light d-block p-1 mt-auto"></span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <h5 className="fs-13 text-center mt-2">{t('fluid')}</h5>
                                                </div>
                                                <div className="col-4">
                                                    <div className="form-check card-radio">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="data-layout-width"
                                                            id="layout-width-boxed"
                                                            value={layoutWidthTypes.BOXED}
                                                            checked={layoutWidthType === layoutWidthTypes.BOXED}
                                                            onChange={e => {
                                                                if (e.target.checked) {
                                                                    update('layout_width_type', e.target.value, changeLayoutWidth);
                                                                    // dispatch(changeLayoutWidth(e.target.value));
                                                                }
                                                            }}
                                                        />
                                                        <label className="form-check-label p-0 avatar-md w-100 px-2" htmlFor="layout-width-boxed">
                                                            <span className="d-flex gap-1 h-100 border-start border-end">
                                                                <span className="flex-shrink-0">
                                                                    <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                                        <span className="d-block p-1 px-2 bg-primary-subtle rounded mb-2"></span>
                                                                        <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                                        <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                                        <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                                    </span>
                                                                </span>
                                                                <span className="flex-grow-1">
                                                                    <span className="d-flex h-100 flex-column">
                                                                        <span className="bg-light d-block p-1"></span>
                                                                        <span className="bg-light d-block p-1 mt-auto"></span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <h5 className="fs-13 text-center mt-2">{t('boxed')}</h5>
                                                </div>
                                            </div>
                                        </div>)}

                                        <div id="layout-position">
                                            <h6 className="mt-4 mb-0 fw-semibold text-uppercase">{t('layout_position')}</h6>
                                            <p className="text-muted">{t('choose_layout_position')}</p>

                                            <div className="btn-group radio" role="group">
                                                <input
                                                    type="radio"
                                                    className="btn-check"
                                                    name="data-layout-position"
                                                    id="layout-position-fixed"
                                                    value={layoutPositionTypes.FIXED}
                                                    checked={layoutPositionType === layoutPositionTypes.FIXED}
                                                    onChange={e => {
                                                        if (e.target.checked) {
                                                            update('layout_position_type', e.target.value, changeLayoutPosition);
                                                        }
                                                    }}
                                                />
                                                <label className="btn btn-light w-sm" htmlFor="layout-position-fixed">{t('fixed')}</label>

                                                <input
                                                    type="radio"
                                                    className="btn-check"
                                                    name="data-layout-position"
                                                    id="layout-position-scrollable"
                                                    value={layoutPositionTypes.SCROLLABLE}
                                                    checked={layoutPositionType === layoutPositionTypes.SCROLLABLE}
                                                    onChange={e => {
                                                        if (e.target.checked) {
                                                            update('layout_position_type', e.target.value, changeLayoutPosition);
                                                        }
                                                    }}
                                                />
                                                <label className="btn btn-light w-sm ms-0" htmlFor="layout-position-scrollable">{t('scrollable')}</label>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )}

                                <h6 className="mt-4 mb-0 fw-semibold text-uppercase">{t('top_color')}</h6>
                                <p className="text-muted">{t('choose_top_color')}</p>

                                <div className="row">
                                    <div className="col-4">
                                        <div className="form-check card-radio">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="data-topbar"
                                                id="topbar-color-light"
                                                value={topbarThemeTypes.LIGHT}
                                                checked={topbarThemeType === topbarThemeTypes.LIGHT}
                                                onChange={e => {
                                                    if (e.target.checked) {
                                                        update('topbar_theme_type', e.target.value, changeTopbarTheme);
                                                    }
                                                }}
                                            />
                                            <label className="form-check-label p-0 avatar-md w-100" htmlFor="topbar-color-light">
                                                <span className="d-flex gap-1 h-100">
                                                    <span className="flex-shrink-0">
                                                        <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                            <span className="d-block p-1 px-2 bg-primary-subtle rounded mb-2"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                        </span>
                                                    </span>
                                                    <span className="flex-grow-1">
                                                        <span className="d-flex h-100 flex-column">
                                                            <span className="bg-light d-block p-1"></span>
                                                            <span className="bg-light d-block p-1 mt-auto"></span>
                                                        </span>
                                                    </span>
                                                </span>
                                            </label>
                                        </div>
                                        <h5 className="fs-13 text-center mt-2">{t('light')}</h5>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-check card-radio">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="data-topbar"
                                                id="topbar-color-dark"
                                                value={topbarThemeTypes.DARK}
                                                checked={topbarThemeType === topbarThemeTypes.DARK}
                                                onChange={e => {
                                                    if (e.target.checked) {
                                                        update('topbar_theme_type', e.target.value, changeTopbarTheme);
                                                    }
                                                }}
                                            />
                                            <label className="form-check-label p-0 avatar-md w-100" htmlFor="topbar-color-dark">
                                                <span className="d-flex gap-1 h-100">
                                                    <span className="flex-shrink-0">
                                                        <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                            <span className="d-block p-1 px-2 bg-primary-subtle rounded mb-2"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                        </span>
                                                    </span>
                                                    <span className="flex-grow-1">
                                                        <span className="d-flex h-100 flex-column">
                                                            <span className="bg-primary d-block p-1"></span>
                                                            <span className="bg-light d-block p-1 mt-auto"></span>
                                                        </span>
                                                    </span>
                                                </span>
                                            </label>
                                        </div>
                                        <h5 className="fs-13 text-center mt-2">{t('dark')}</h5>
                                    </div>
                                </div>

                                {(layoutType === "vertical" || (layoutType === "semibox" && sidebarVisibilitytype === "show")) && (
                                    <React.Fragment>

                                        <div id="sidebar-size">
                                            <h6 className="mt-4 mb-0 fw-semibold text-uppercase">{t('sidebar_size')}</h6>
                                            <p className="text-muted">{t('choose_sidebar_size')}</p>

                                            <div className="row">
                                                <div className="col-4">
                                                    <div className="form-check sidebar-setting card-radio">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="data-sidebar-size"
                                                            id="sidebar-size-default"
                                                            value={leftsidbarSizeTypes.DEFAULT}
                                                            checked={leftsidbarSizeType === leftsidbarSizeTypes.DEFAULT}
                                                            onChange={e => {
                                                                if (e.target.checked) {
                                                                    update('left_sidebar_size_type', e.target.value, changeLeftsidebarSizeType);
                                                                }
                                                            }}
                                                        />
                                                        <label className="form-check-label p-0 avatar-md w-100" htmlFor="sidebar-size-default">
                                                            <span className="d-flex gap-1 h-100">
                                                                <span className="flex-shrink-0">
                                                                    <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                                        <span className="d-block p-1 px-2 bg-primary-subtle rounded mb-2"></span>
                                                                        <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                                        <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                                        <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                                    </span>
                                                                </span>
                                                                <span className="flex-grow-1">
                                                                    <span className="d-flex h-100 flex-column">
                                                                        <span className="bg-light d-block p-1"></span>
                                                                        <span className="bg-light d-block p-1 mt-auto"></span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <h5 className="fs-13 text-center mt-2">{t('default')}</h5>
                                                </div>

                                                <div className="col-4">
                                                    <div className="form-check sidebar-setting card-radio">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="data-sidebar-size"
                                                            id="sidebar-size-compact"
                                                            value={leftsidbarSizeTypes.COMPACT}
                                                            checked={leftsidbarSizeType === leftsidbarSizeTypes.COMPACT}
                                                            onChange={e => {
                                                                if (e.target.checked) {
                                                                    update('left_sidebar_size_type', e.target.value, changeLeftsidebarSizeType);
                                                                }
                                                            }}
                                                        />
                                                        <label className="form-check-label p-0 avatar-md w-100" htmlFor="sidebar-size-compact">
                                                            <span className="d-flex gap-1 h-100">
                                                                <span className="flex-shrink-0">
                                                                    <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                                        <span className="d-block p-1 bg-primary-subtle rounded mb-2"></span>
                                                                        <span className="d-block p-1 pb-0 bg-primary-subtle"></span>
                                                                        <span className="d-block p-1 pb-0 bg-primary-subtle"></span>
                                                                        <span className="d-block p-1 pb-0 bg-primary-subtle"></span>
                                                                    </span>
                                                                </span>
                                                                <span className="flex-grow-1">
                                                                    <span className="d-flex h-100 flex-column">
                                                                        <span className="bg-light d-block p-1"></span>
                                                                        <span className="bg-light d-block p-1 mt-auto"></span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <h5 className="fs-13 text-center mt-2">{t('compact')}</h5>
                                                </div>

                                                <div className="col-4">
                                                    <div className="form-check sidebar-setting card-radio">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="data-sidebar-size"
                                                            id="sidebar-size-small"
                                                            value={leftsidbarSizeTypes.SMALLICON}
                                                            checked={leftsidbarSizeType === leftsidbarSizeTypes.SMALLICON}
                                                            onChange={e => {
                                                                if (e.target.checked) {
                                                                    update('left_sidebar_size_type', e.target.value, changeLeftsidebarSizeType);
                                                                }
                                                            }}
                                                        />
                                                        <label className="form-check-label p-0 avatar-md w-100" htmlFor="sidebar-size-small">
                                                            <span className="d-flex gap-1 h-100">
                                                                <span className="flex-shrink-0">
                                                                    <span className="bg-light d-flex h-100 flex-column gap-1">
                                                                        <span className="d-block p-1 bg-primary-subtle mb-2"></span>
                                                                        <span className="d-block p-1 pb-0 bg-primary-subtle"></span>
                                                                        <span className="d-block p-1 pb-0 bg-primary-subtle"></span>
                                                                        <span className="d-block p-1 pb-0 bg-primary-subtle"></span>
                                                                    </span>
                                                                </span>
                                                                <span className="flex-grow-1">
                                                                    <span className="d-flex h-100 flex-column">
                                                                        <span className="bg-light d-block p-1"></span>
                                                                        <span className="bg-light d-block p-1 mt-auto"></span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <h5 className="fs-13 text-center mt-2">{t('icon_view')}</h5>
                                                </div>

                                                <div className="col-4">
                                                    <div className="form-check sidebar-setting card-radio">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="data-sidebar-size"
                                                            id="sidebar-size-small-hover"
                                                            value={leftsidbarSizeTypes.SMALLHOVER}
                                                            checked={leftsidbarSizeType === leftsidbarSizeTypes.SMALLHOVER}
                                                            onChange={e => {
                                                                if (e.target.checked) {
                                                                    update('left_sidebar_size_type', e.target.value, changeLeftsidebarSizeType);
                                                                }
                                                            }}

                                                        />
                                                        <label className="form-check-label p-0 avatar-md w-100" htmlFor="sidebar-size-small-hover">
                                                            <span className="d-flex gap-1 h-100">
                                                                <span className="flex-shrink-0">
                                                                    <span className="bg-light d-flex h-100 flex-column gap-1">
                                                                        <span className="d-block p-1 bg-primary-subtle mb-2"></span>
                                                                        <span className="d-block p-1 pb-0 bg-primary-subtle"></span>
                                                                        <span className="d-block p-1 pb-0 bg-primary-subtle"></span>
                                                                        <span className="d-block p-1 pb-0 bg-primary-subtle"></span>
                                                                    </span>
                                                                </span>
                                                                <span className="flex-grow-1">
                                                                    <span className="d-flex h-100 flex-column">
                                                                        <span className="bg-light d-block p-1"></span>
                                                                        <span className="bg-light d-block p-1 mt-auto"></span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <h5 className="fs-13 text-center mt-2">{t('hover_view')}</h5>
                                                </div>
                                            </div>
                                        </div>

                                        {layoutType !== "semibox" && (<div id="sidebar-view">
                                            <h6 className="mt-4 mb-0 fw-semibold text-uppercase">{t('sidebar_view')}</h6>
                                            <p className="text-muted">{t('choose_sidebar_view')}</p>

                                            <div className="row">
                                                <div className="col-4">
                                                    <div className="form-check sidebar-setting card-radio">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="data-layout-style"
                                                            id="sidebar-view-default"
                                                            value={leftSidebarViewTypes.DEFAULT}
                                                            checked={leftSidebarViewType === leftSidebarViewTypes.DEFAULT}
                                                            onChange={e => {
                                                                if (e.target.checked) {
                                                                    update('left_sidebar_view_type', e.target.value, changeLeftsidebarViewType);
                                                                }
                                                            }}

                                                        />
                                                        <label className="form-check-label p-0 avatar-md w-100" htmlFor="sidebar-view-default">
                                                            <span className="d-flex gap-1 h-100">
                                                                <span className="flex-shrink-0">
                                                                    <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                                        <span className="d-block p-1 px-2 bg-primary-subtle rounded mb-2"></span>
                                                                        <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                                        <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                                        <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                                    </span>
                                                                </span>
                                                                <span className="flex-grow-1">
                                                                    <span className="d-flex h-100 flex-column">
                                                                        <span className="bg-light d-block p-1"></span>
                                                                        <span className="bg-light d-block p-1 mt-auto"></span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <h5 className="fs-13 text-center mt-2">{t('default')}</h5>
                                                </div>
                                                <div className="col-4">
                                                    <div className="form-check sidebar-setting card-radio">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="data-layout-style"
                                                            id="sidebar-view-detached"
                                                            value={leftSidebarViewTypes.DETACHED}
                                                            checked={leftSidebarViewType === leftSidebarViewTypes.DETACHED}
                                                            onChange={e => {
                                                                if (e.target.checked) {
                                                                    update('left_sidebar_view_type', e.target.value, changeLeftsidebarViewType);
                                                                }
                                                            }}
                                                        />
                                                        <label className="form-check-label p-0 avatar-md w-100" htmlFor="sidebar-view-detached">
                                                            <span className="d-flex h-100 flex-column">
                                                                <span className="bg-light d-flex p-1 gap-1 align-items-center px-2">
                                                                    <span className="d-block p-1 bg-primary-subtle rounded me-1"></span>
                                                                    <span className="d-block p-1 pb-0 px-2 bg-primary-subtle ms-auto"></span>
                                                                    <span className="d-block p-1 pb-0 px-2 bg-primary-subtle"></span>
                                                                </span>
                                                                <span className="d-flex gap-1 h-100 p-1 px-2">
                                                                    <span className="flex-shrink-0">
                                                                        <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                                            <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                                            <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                                            <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                                        </span>
                                                                    </span>
                                                                </span>
                                                                <span className="bg-light d-block p-1 mt-auto px-2"></span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <h5 className="fs-13 text-center mt-2">{t('detach')}</h5>
                                                </div>
                                            </div>
                                        </div>)}
                                    </React.Fragment>
                                )}

                                {(layoutType === "vertical" || layoutType === "twocolumn" || (layoutType === "semibox" && sidebarVisibilitytype === "show")) && (
                                    <React.Fragment>
                                        <div id="sidebar-color">
                                            <h6 className="mt-4 mb-0 fw-semibold text-uppercase">{t('sidebar_color')}</h6>
                                            <p className="text-muted">{t('choose_sidebar_color')} </p>

                                            <div className="row">
                                                <div className="col-4">
                                                    <div className="form-check sidebar-setting card-radio">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="data-sidebar"
                                                            id="sidebar-color-light"
                                                            value={leftSidebarTypes.LIGHT}
                                                            checked={leftSidebarType === leftSidebarTypes.LIGHT}
                                                            onChange={e => {
                                                                setShow(false);
                                                                if (e.target.checked) {
                                                                    update('left_sidebar_type', e.target.value, changeSidebarTheme);
                                                                }
                                                            }}
                                                        />
                                                        <label className="form-check-label p-0 avatar-md w-100" htmlFor="sidebar-color-light">
                                                            <span className="d-flex gap-1 h-100">
                                                                <span className="flex-shrink-0">
                                                                    <span className="bg-white border-end d-flex h-100 flex-column gap-1 p-1">
                                                                        <span className="d-block p-1 px-2 bg-primary-subtle rounded mb-2"></span>
                                                                        <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                                        <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                                        <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                                    </span>
                                                                </span>
                                                                <span className="flex-grow-1">
                                                                    <span className="d-flex h-100 flex-column">
                                                                        <span className="bg-light d-block p-1"></span>
                                                                        <span className="bg-light d-block p-1 mt-auto"></span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <h5 className="fs-13 text-center mt-2">{t('light')}</h5>
                                                </div>
                                                <div className="col-4">
                                                    <div className="form-check sidebar-setting card-radio">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="data-sidebar"
                                                            id="sidebar-color-dark"
                                                            value={leftSidebarTypes.DARK}
                                                            checked={leftSidebarType === leftSidebarTypes.DARK}
                                                            onChange={e => {
                                                                setShow(false);
                                                                if (e.target.checked) {
                                                                    update('left_sidebar_type', e.target.value, changeSidebarTheme);
                                                                }
                                                            }}
                                                        />
                                                        <label className="form-check-label p-0 avatar-md w-100" htmlFor="sidebar-color-dark">
                                                            <span className="d-flex gap-1 h-100">
                                                                <span className="flex-shrink-0">
                                                                    <span className="bg-primary d-flex h-100 flex-column gap-1 p-1">
                                                                        <span className="d-block p-1 px-2 bg-white bg-opacity-10 rounded mb-2"></span>
                                                                        <span className="d-block p-1 px-2 pb-0 bg-white bg-opacity-10"></span>
                                                                        <span className="d-block p-1 px-2 pb-0 bg-white bg-opacity-10"></span>
                                                                        <span className="d-block p-1 px-2 pb-0 bg-white bg-opacity-10"></span>
                                                                    </span>
                                                                </span>
                                                                <span className="flex-grow-1">
                                                                    <span className="d-flex h-100 flex-column">
                                                                        <span className="bg-light d-block p-1"></span>
                                                                        <span className="bg-light d-block p-1 mt-auto"></span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <h5 className="fs-13 text-center mt-2">{t('dark')}</h5>
                                                </div>

                                                <div className="col-4">
                                                    <button
                                                        className={classnames(
                                                            "btn btn-link avatar-md w-100 p-0 overflow-hidden border ",
                                                            { collapsed: !(leftSidebarType !== leftSidebarTypes.DARK && leftSidebarType !== leftSidebarTypes.LIGHT), active: (leftSidebarType !== leftSidebarTypes.DARK && leftSidebarType !== leftSidebarTypes.LIGHT) === true }
                                                        )}
                                                        type="button"
                                                        data-bs-target="#collapseBgGradient"
                                                        data-bs-toggle="collapse"
                                                        aria-controls="collapseBgGradient"
                                                        onClick={tog_show}
                                                    >
                                                        <span className="d-flex gap-1 h-100">
                                                            <span className="flex-shrink-0">
                                                                <span className="bg-vertical-gradient d-flex h-100 flex-column gap-1 p-1">
                                                                    <span className="d-block p-1 px-2 bg-white bg-opacity-10 rounded mb-2"></span>
                                                                    <span className="d-block p-1 px-2 pb-0 bg-white bg-opacity-10"></span>
                                                                    <span className="d-block p-1 px-2 pb-0 bg-white bg-opacity-10"></span>
                                                                    <span className="d-block p-1 px-2 pb-0 bg-white bg-opacity-10"></span>
                                                                </span>
                                                            </span>
                                                            <span className="flex-grow-1">
                                                                <span className="d-flex h-100 flex-column">
                                                                    <span className="bg-light d-block p-1"></span>
                                                                    <span className="bg-light d-block p-1 mt-auto"></span>
                                                                </span>
                                                            </span>
                                                        </span>
                                                    </button>
                                                    <h5 className="fs-13 text-center mt-2">{t('gradient')}</h5>
                                                </div>
                                            </div>
                                            <Collapse
                                                isOpen={show || (leftSidebarType !== leftSidebarTypes.DARK && leftSidebarType !== leftSidebarTypes.LIGHT)}
                                                className="collapse"
                                                id="collapseBgGradient"
                                            >
                                                <div className="d-flex gap-2 flex-wrap img-switch p-2 px-3 bg-light rounded">
                                                    <div className="form-check sidebar-setting card-radio">
                                                        <input className="form-check-input"
                                                            type="radio"
                                                            name="data-sidebar"
                                                            id="sidebar-color-gradient"
                                                            value={leftSidebarTypes.GRADIENT}
                                                            checked={leftSidebarType === leftSidebarTypes.GRADIENT}
                                                            onChange={e => {
                                                                if (e.target.checked) {
                                                                    update('left_sidebar_type', e.target.value, changeSidebarTheme);
                                                                }
                                                            }}
                                                        />
                                                        <label className="form-check-label p-0 avatar-xs rounded-circle" htmlFor="sidebar-color-gradient">
                                                            <span className="avatar-title rounded-circle bg-vertical-gradient"></span>
                                                        </label>
                                                    </div>
                                                    <div className="form-check sidebar-setting card-radio">
                                                        <input className="form-check-input"
                                                            type="radio"
                                                            name="data-sidebar"
                                                            id="sidebar-color-gradient-2"
                                                            value={leftSidebarTypes.GRADIENT_2}
                                                            checked={leftSidebarType === leftSidebarTypes.GRADIENT_2}
                                                            onChange={e => {
                                                                if (e.target.checked) {
                                                                    update('left_sidebar_type', e.target.value, changeSidebarTheme);
                                                                }
                                                            }}
                                                        />
                                                        <label className="form-check-label p-0 avatar-xs rounded-circle" htmlFor="sidebar-color-gradient-2">
                                                            <span className="avatar-title rounded-circle bg-vertical-gradient-2"></span>
                                                        </label>
                                                    </div>
                                                    <div className="form-check sidebar-setting card-radio">
                                                        <input className="form-check-input"
                                                            type="radio"
                                                            name="data-sidebar"
                                                            id="sidebar-color-gradient-3"
                                                            value={leftSidebarTypes.GRADIENT_3}
                                                            checked={leftSidebarType === leftSidebarTypes.GRADIENT_3}
                                                            onChange={e => {
                                                                if (e.target.checked) {
                                                                    update('left_sidebar_type', e.target.value, changeSidebarTheme);
                                                                }
                                                            }}
                                                        />
                                                        <label className="form-check-label p-0 avatar-xs rounded-circle" htmlFor="sidebar-color-gradient-3">
                                                            <span className="avatar-title rounded-circle bg-vertical-gradient-3"></span>
                                                        </label>
                                                    </div>
                                                    <div className="form-check sidebar-setting card-radio">
                                                        <input className="form-check-input"
                                                            type="radio"
                                                            name="data-sidebar"
                                                            id="sidebar-color-gradient-4"
                                                            value={leftSidebarTypes.GRADIENT_4}
                                                            checked={leftSidebarType === leftSidebarTypes.GRADIENT_4}
                                                            onChange={e => {
                                                                if (e.target.checked) {
                                                                    update('left_sidebar_type', e.target.value, changeSidebarTheme);
                                                                }
                                                            }}
                                                        />
                                                        <label className="form-check-label p-0 avatar-xs rounded-circle" htmlFor="sidebar-color-gradient-4">
                                                            <span className="avatar-title rounded-circle bg-vertical-gradient-4"></span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </Collapse>
                                        </div>
                                        <div id="sidebar-img">
                                            <h6 className="mt-4 mb-0 fw-semibold text-uppercase">{t('sidebar_imgs')}</h6>
                                            <p className="text-muted">{t('choose_sidebar_imgs')}</p>

                                            <div className="d-flex gap-2 flex-wrap img-switch">
                                                <div className="form-check sidebar-setting card-radio">
                                                    <input className="form-check-input"
                                                        type="radio"
                                                        name="data-sidebar-image"
                                                        id="sidebarimg-none"
                                                        value={leftSidebarImageTypes.NONE}
                                                        checked={leftSidebarImageType === leftSidebarImageTypes.NONE}
                                                        onChange={e => {
                                                            if (e.target.checked) {
                                                                update('left_sidebar_image_type', e.target.value, changeSidebarImageType);
                                                            }
                                                        }}
                                                    />
                                                    <label className="form-check-label p-0 avatar-sm h-auto" htmlFor="sidebarimg-none">
                                                        <span className="avatar-md w-auto bg-light d-flex align-items-center justify-content-center">
                                                            <i className="ri-close-fill fs-20"></i>
                                                        </span>
                                                    </label>
                                                </div>

                                                <div className="form-check sidebar-setting card-radio">
                                                    <input className="form-check-input"
                                                        type="radio"
                                                        name="data-sidebar-image"
                                                        id="sidebarimg-01"
                                                        value={leftSidebarImageTypes.IMG1}
                                                        checked={leftSidebarImageType === leftSidebarImageTypes.IMG1}
                                                        onChange={e => {
                                                            if (e.target.checked) {
                                                                update('left_sidebar_image_type', e.target.value, changeSidebarImageType);
                                                            }
                                                        }}
                                                    />
                                                    <label className="form-check-label p-0 avatar-sm h-auto" htmlFor="sidebarimg-01">
                                                        <img src={img01} alt="" className="avatar-md w-auto object-fit-cover" />
                                                    </label>

                                                </div>

                                                <div className="form-check sidebar-setting card-radio">
                                                    <input className="form-check-input"
                                                        type="radio"
                                                        name="data-sidebar-image"
                                                        id="sidebarimg-02"
                                                        value={leftSidebarImageTypes.IMG2}
                                                        checked={leftSidebarImageType === leftSidebarImageTypes.IMG2}
                                                        onChange={e => {
                                                            if (e.target.checked) {
                                                                update('left_sidebar_image_type', e.target.value, changeSidebarImageType);
                                                            }
                                                        }}
                                                    />
                                                    <label className="form-check-label p-0 avatar-sm h-auto" htmlFor="sidebarimg-02">
                                                        <img src={img02} alt="" className="avatar-md w-auto object-fit-cover" />
                                                    </label>
                                                </div>
                                                <div className="form-check sidebar-setting card-radio">
                                                    <input className="form-check-input"
                                                        type="radio"
                                                        name="data-sidebar-image"
                                                        id="sidebarimg-03"
                                                        value={leftSidebarImageTypes.IMG3}
                                                        checked={leftSidebarImageType === leftSidebarImageTypes.IMG3}
                                                        onChange={e => {
                                                            if (e.target.checked) {
                                                                update('left_sidebar_image_type', e.target.value, changeSidebarImageType);
                                                            }
                                                        }}
                                                    />
                                                    <label className="form-check-label p-0 avatar-sm h-auto" htmlFor="sidebarimg-03">
                                                        <img src={img03} alt="" className="avatar-md w-auto object-fit-cover" />
                                                    </label>
                                                </div>
                                                <div className="form-check sidebar-setting card-radio">
                                                    <input className="form-check-input"
                                                        type="radio"
                                                        name="data-sidebar-image"
                                                        id="sidebarimg-04"
                                                        value={leftSidebarImageTypes.IMG4}
                                                        checked={leftSidebarImageType === leftSidebarImageTypes.IMG4}
                                                        onChange={e => {
                                                            if (e.target.checked) {
                                                                update('left_sidebar_image_type', e.target.value, changeSidebarImageType);
                                                            }
                                                        }}
                                                    />
                                                    <label className="form-check-label p-0 avatar-sm h-auto" htmlFor="sidebarimg-04">
                                                        <img src={img04} alt="" className="avatar-md w-auto object-fit-cover" />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )}

                                <div id="preloader-menu">
                                    <h6 className="mt-4 mb-0 fw-semibold text-uppercase">{t('preloader')}</h6>
                                    <p className="text-muted">{t('choose_preloader')}</p>

                                    <div className="row">
                                        <div className="col-4">
                                            <div className="form-check sidebar-setting card-radio">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="data-preloader"
                                                    id="preloader-view-custom"
                                                    value={preloaderTypes.ENABLE}
                                                    checked={preloader === preloaderTypes.ENABLE}
                                                    onChange={e => {
                                                        if (e.target.checked) {
                                                            update('preloader_type', e.target.value, changePreLoader);
                                                        }
                                                    }}
                                                />

                                                <label className="form-check-label p-0 avatar-md w-100" htmlFor="preloader-view-custom">
                                                    <span className="d-flex gap-1 h-100">
                                                        <span className="flex-shrink-0">
                                                            <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                                <span className="d-block p-1 px-2 bg-primary-subtle rounded mb-2"></span>
                                                                <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                                <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                                <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                            </span>
                                                        </span>
                                                        <span className="flex-grow-1">
                                                            <span className="d-flex h-100 flex-column">
                                                                <span className="bg-light d-block p-1"></span>
                                                                <span className="bg-light d-block p-1 mt-auto"></span>
                                                            </span>
                                                        </span>
                                                    </span>
                                                    {/* <!-- <div id="preloader"> --> */}
                                                    <div id="status" className="d-flex align-items-center justify-content-center">
                                                        <div className="spinner-border text-primary avatar-xxs m-auto" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                    </div>
                                                    {/* <!-- </div> --> */}
                                                </label>
                                            </div>
                                            <h5 className="fs-13 text-center mt-2">{t('enable')}</h5>
                                        </div>
                                        <div className="col-4">
                                            <div className="form-check sidebar-setting card-radio">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="data-preloader"
                                                    id="preloader-view-none"
                                                    value={preloaderTypes.DISABLE}
                                                    checked={preloader === preloaderTypes.DISABLE}
                                                    onChange={e => {
                                                        if (e.target.checked) {
                                                            update('preloader_type', e.target.value, changePreLoader);
                                                        }
                                                    }}
                                                />
                                                <label className="form-check-label p-0 avatar-md w-100" htmlFor="preloader-view-none">
                                                    <span className="d-flex gap-1 h-100">
                                                        <span className="flex-shrink-0">
                                                            <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                                <span className="d-block p-1 px-2 bg-primary-subtle rounded mb-2"></span>
                                                                <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                                <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                                <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                            </span>
                                                        </span>
                                                        <span className="flex-grow-1">
                                                            <span className="d-flex h-100 flex-column">
                                                                <span className="bg-light d-block p-1"></span>
                                                                <span className="bg-light d-block p-1 mt-auto"></span>
                                                            </span>
                                                        </span>
                                                    </span>
                                                </label>
                                            </div>
                                            <h5 className="fs-13 text-center mt-2">{t('disable')}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SimpleBar>

                    </OffcanvasBody>

                </Offcanvas>
            </div>
        </React.Fragment>
    );
};

export default withRouter(RightSidebar);