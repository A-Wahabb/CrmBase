import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import withRouter from '../Components/Common/withRouter';

//import Components
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import RightSidebar from '../Components/Common/RightSidebar';

//import actions
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
    changeSidebarVisibility,
    changePreLoader,
    updateSetting
} from "../slices/thunks";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from 'reselect';

const Layout = (props) => {
    const [headerClass, setHeaderClass] = useState("");
    const dispatch = useDispatch();

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
        sidebarVisibilitytype
    } = useSelector(selectLayoutProperties);

    /*
    layout settings
    */
    useEffect(() => {
        if (
            layoutType ||
            leftSidebarType ||
            layoutModeType ||
            layoutWidthType ||
            layoutPositionType ||
            topbarThemeType ||
            leftsidbarSizeType ||
            leftSidebarViewType ||
            leftSidebarImageType ||
            sidebarVisibilitytype
        ) {
            window.dispatchEvent(new Event('resize'));
            dispatch(changeLeftsidebarViewType(leftSidebarViewType));
            dispatch(changeLeftsidebarSizeType(leftsidbarSizeType));
            dispatch(changeSidebarTheme(leftSidebarType));
            dispatch(changeLayoutMode(layoutModeType));
            dispatch(changeLayoutWidth(layoutWidthType));
            dispatch(changeLayoutPosition(layoutPositionType));
            dispatch(changeTopbarTheme(topbarThemeType));
            dispatch(changeLayout(layoutType));
            dispatch(changeSidebarImageType(leftSidebarImageType));
            dispatch(changeSidebarVisibility(sidebarVisibilitytype));
        }
    }, [layoutType,
        leftSidebarType,
        layoutModeType,
        layoutWidthType,
        layoutPositionType,
        topbarThemeType,
        leftsidbarSizeType,
        leftSidebarViewType,
        leftSidebarImageType,
        sidebarVisibilitytype,
        dispatch]);
    /*
    call dark/light mode
    */
    const onChangeLayoutMode = (value) => {
        update('layout_mode', value)
    };


    const update = (name, newValue) => {
        let data = JSON.parse(localStorage.getItem('SiteSetting'));

        dispatch(changeLayoutMode(newValue));

        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            if (key !== name && key) {
                formData.append(key, value);
            }
            else {
                data[key] = newValue
                formData.append(key, newValue)
            }
        });
        localStorage.setItem('SiteSetting', JSON.stringify(data));

        dispatch(updateSetting(formData))
    }

    // class add remove in header 
    useEffect(() => {
        window.addEventListener("scroll", scrollNavigation, true);
    }, []);

    function scrollNavigation() {
        var scrollup = document.documentElement.scrollTop;
        if (scrollup > 50) {
            setHeaderClass("topbar-shadow");
        } else {
            setHeaderClass("");
        }
    }

    useEffect(() => {
        if (sidebarVisibilitytype === 'show' || layoutType === "vertical" || layoutType === "twocolumn") {
            document.querySelector(".hamburger-icon").classList.remove('open');
        } else {
            document.querySelector(".hamburger-icon") && document.querySelector(".hamburger-icon").classList.add('open');
        }
    }, [sidebarVisibilitytype, layoutType]);


    useEffect(() => {
        let setting = JSON.parse(localStorage.getItem('SiteSetting'))
        //Layout Setting
        if (setting) {
            dispatch(changeLayout(setting?.layout_type))
            dispatch(changeLayoutMode(setting?.layout_mode))
            dispatch(changeTopbarTheme(setting?.topbar_theme_type))
            dispatch(changePreLoader(setting?.preloader_type))

            if (setting?.layout_type === 'semibox') {
                dispatch(changeSidebarVisibility(setting?.sidebar_visibility_type))
            }

            if (setting?.layout_type === 'vertical' || (setting?.layout_type === 'semibox' && setting?.sidebar_visibility_type === 'show')) {
                dispatch(changeLeftsidebarSizeType(setting?.left_sidebar_size_type))
                if (setting?.layout_type !== 'semibox') {
                    dispatch(changeLeftsidebarViewType(setting?.left_sidebar_view_type))
                }
            }

            if (setting?.layout_type !== "twocolumn") {
                if (['horizontal', 'vertical'].includes(setting?.layout_type)) {
                    dispatch(changeLayoutWidth(setting?.layout_width_type))
                    dispatch(changeLeftsidebarSizeType(setting?.layout_width_type === 'boxed' ? "sm-hover" : "lg"));
                }
                dispatch(changeLayoutPosition(setting?.layout_position_type))
            }

            if (['twocolumn', 'vertical'].includes(setting?.layout_type) || (setting?.layout_type === 'semibox' && setting?.sidebar_visibility_type === 'show')) {
                dispatch(changeSidebarTheme(setting?.left_sidebar_type))
                dispatch(changeSidebarImageType(setting?.left_sidebar_image_type))
            }

        }

    }, [dispatch])
    return (
        <React.Fragment>
            <div id="layout-wrapper">
                <Header
                    headerClass={headerClass}
                    layoutModeType={layoutModeType}
                    onChangeLayoutMode={onChangeLayoutMode} />
                <Sidebar
                    layoutType={layoutType}
                />
                <div className="main-content">
                    {props.children}
                    <Footer />
                </div>
            </div>
            <RightSidebar />
        </React.Fragment>

    );
};

Layout.propTypes = {
    children: PropTypes.object,
};

export default withRouter(Layout);