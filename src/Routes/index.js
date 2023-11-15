import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";

//Layouts
import NonAuthLayout from "../Layouts/NonAuthLayout";
import VerticalLayout from "../Layouts/index";

//routes
import { authProtectedRoutes, publicRoutes } from "./allRoutes";
import { AuthProtected } from './AuthProtected';
import ResetPassword from '../pages/Authentication/ResetPassword';

const Index = () => {

    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [update, setUpdate] = useState(false)

    useEffect(() => {
        const handleOnlineStatus = () => {
            setIsOnline(navigator.onLine);
        };

        window.addEventListener('online', handleOnlineStatus);
        window.addEventListener('offline', handleOnlineStatus);

        return () => {
            window.removeEventListener('online', handleOnlineStatus);
            window.removeEventListener('offline', handleOnlineStatus);
        };
    }, []);




    return (
        <React.Fragment>
            {!isOnline ? <div className='d-flex justify-content-center align-items-center h-100'>No internet connection</div> :
                <Routes>
                    <Route>
                        {publicRoutes.map((route, idx) => {
                            return (
                                <Route
                                    path={route.path}
                                    element={
                                        <NonAuthLayout>
                                            {route.component}
                                        </NonAuthLayout>
                                    }
                                    key={idx}
                                    exact={true}
                                />
                            )
                        })}
                    </Route>
                    {/* <Route path="/reset_password/:token" element={<NonAuthLayout><ResetPassword /></NonAuthLayout>} /> */}
                    <Route>
                        {authProtectedRoutes.map((route, idx) => (
                            <Route
                                path={route.path}
                                element={
                                    <AuthProtected>
                                        <VerticalLayout>{route.component}</VerticalLayout>
                                    </AuthProtected>}
                                key={idx}
                                exact={true}
                            />
                        ))}
                    </Route>
                </Routes>}
        </React.Fragment>
    );
};

export default Index;

