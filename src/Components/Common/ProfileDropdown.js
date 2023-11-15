import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';

//import images
import dummy from "../../assets/images/users/user-dummy-img.jpg";
import EditUserModal from '../../pages/Profile/EditUserModal';
import { ToastContainer, toast } from 'react-toastify';
import { t } from 'i18next';

const ProfileDropdown = () => {


    const profiledropdownData = createSelector(
        (state) => state.Profile.user,
        (user) => user
    );
    // Inside your component
    const user = useSelector(profiledropdownData);
    const [userName, setUserName] = useState("Admin");
    const [EditUser, setEditUser] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("authUser")) {
            const obj = JSON.parse(localStorage.getItem("authUser"));
            setUserName(
                obj.first_name
            );
        }
    }, [userName, user]);

    //Dropdown Toggle
    const [isProfileDropdown, setIsProfileDropdown] = useState(false);
    const toggleProfileDropdown = () => {
        setIsProfileDropdown(!isProfileDropdown);
    };

    const toastSuccess = (msg) => {
        toast.success(t(msg), { autoClose: 3000 });
        setTimeout(() => { toast.clearWaitingQueue(); }, 3000);
    }
    return (
        <React.Fragment>
            <ToastContainer closeButton={false} limit={1} />
            <Dropdown isOpen={isProfileDropdown} toggle={toggleProfileDropdown} className="ms-sm-3 header-item topbar-user">
                <DropdownToggle tag="button" type="button" className="btn">
                    <span className="d-flex align-items-center">
                        <img className="rounded-circle header-profile-user" src={user.profile_photo || dummy}
                            alt="Header Avatar" />
                        <span className="text-start ms-xl-2">
                            <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">{userName}</span>
                            <span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">{user.is_super_admin ? 'Super Admin' : user?.user_role}</span>
                        </span>
                    </span>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                    <h6 className="dropdown-header">Welcome {userName}!</h6>
                    <DropdownItem className='p-0' onClick={() => setEditUser(true)}>
                        <div className=" dropdown-item">
                            <i className="ri-account-circle-fill text-muted fs-16 align-middle me-1"></i>
                            <span className="align-middle">Profile</span>
                        </div>
                    </DropdownItem>
                    <div className="dropdown-divider"></div>
                    <DropdownItem className='p-0'>
                        <Link to={process.env.PUBLIC_URL + "/logout"} className="dropdown-item">
                            <i
                                className="ri-login-box-line text-muted fs-16 align-middle me-1"></i> <span
                                    className="align-middle" data-key="t-logout">Logout</span>
                        </Link>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>



            {EditUser && <EditUserModal
                show={EditUser}
                SelectedUser={user}
                onCancelClick={() => setEditUser(false)}
                onCloseClick={() => {
                    toastSuccess('msg_user_updated_successfully')
                    setEditUser(false)
                }}
            />}
        </React.Fragment>
    );
};

export default ProfileDropdown;