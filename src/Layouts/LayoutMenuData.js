import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
    const history = useNavigate();
    //state 
    const [mainMenus, setMainMenus] = useState(null)
    const [menuListing, setMenuListing] = useState(JSON.parse(localStorage.getItem('menu')))
    const [iscurrentState, setIscurrentState] = useState('isDashboard');

    function updateIconSidebar(e) {
        if (e && e.target && e.target.getAttribute("subitems")) {
            const ul = document.getElementById("two-column-menu");
            const iconItems = ul.querySelectorAll(".nav-icon.active");
            let activeIconItems = [...iconItems];
            activeIconItems.forEach((item) => {
                item.classList.remove("active");
                var id = item.getAttribute("subitems");
                if (document.getElementById(id))
                    document.getElementById(id).classList.remove("show");
            });
        }
    }


    useEffect(() => {
        document.body.classList.remove('twocolumn-panel');
        if (mainMenus) {
            Object.entries(mainMenus).forEach(([key, value]) => {
                if (key)
                    if (iscurrentState !== key && value && key.startsWith('p')) {
                        setMainMenus({ ...mainMenus, [key]: false });
                    }
            })
        }
    }, [
        history,
        iscurrentState,
        mainMenus,
    ]);

    // Retrieve the converted array from local storage


    useEffect(() => {
        let convertedArray = JSON.parse(localStorage.getItem('menu'));

        // Create the object from the nested array
        const createdObject = createObjectFromNestedArray(convertedArray, 'p');
        // Update the state with the created object
        setMainMenus(createdObject);

    }, [])

    useEffect(() => {
        if (mainMenus) {
            let convertedArray = JSON.parse(localStorage.getItem('menu'));
            // Add functions to the converted data
            addFunctionsToChildItems(convertedArray);
            setMenuListing(convertedArray)
        }
    }, [mainMenus])


    // Function to recursively loop over the nested array
    const createObjectFromNestedArray = (array, status) => {
        let obj = {};

        array?.forEach((item) => {
            obj[status + item.label] = false;

            if (item.subItems?.length > 0) {
                const childObj = createObjectFromNestedArray(item.subItems, 'c');
                obj = { ...obj, ...childObj };
            }
            if (item.childItems?.length > 0) {
                const childObj = createObjectFromNestedArray(item.childItems, 'n');
                obj = { ...obj, ...childObj };
            }
        });

        return obj;
    };



    // Function to add functions recursively to child items
    function addFunctionsToChildItems(items) {
        for (let i = 0; i < items?.length; i++) {
            let item = items[i];

            item.stateVariables = mainMenus[item.label]
            if (item.type === 'parent') {
                item.click = (e) => parentFunc(e, item.label);
                if (item.subItems && item.subItems.length > 0) {
                    addFunctionsToChildItems(item.subItems);
                }
            } else if (item.type === 'nested-child') {
                item.click = (e) => childFunc(e, item.label);
            }
        }
    }
    // Define the parentFunc and childFunc
    function parentFunc(e, key) {
        e.preventDefault();
        setMainMenus({
            ...mainMenus, [key]: !mainMenus[key]
        });
        setIscurrentState(key);
        updateIconSidebar(e);
    }

    function childFunc(e, key) {
        e.preventDefault();
        setMainMenus({
            ...mainMenus, [key]: !mainMenus[key]
        });
    }


    return <React.Fragment>{menuListing}</React.Fragment>;
};
export default Navdata;
