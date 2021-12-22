import React, { useContext, useEffect, useState } from 'react';

import { UALContext } from "ual-reactjs-renderer";



import { useApp } from '../../Data/AppContext';
import { useRoutes } from '../../Hooks/Routes';





const AppContent = () => {
    const routes = useRoutes();

    const {
        isAuthenticated,
        userData,
        userLoginHandler,
        setUserDataHandler,
    } = useApp();

    const { activeUser } = useContext(UALContext);



    useEffect(() => {
        if (activeUser && activeUser.accountName && setUserDataHandler && userLoginHandler && !isAuthenticated) {
            setUserDataHandler(activeUser);
            userLoginHandler();
        }
    }, [activeUser, setUserDataHandler, userLoginHandler, isAuthenticated]);



    return (

            <div>
                <main>
                    { routes }
                </main>
            </div>

    )
}

export default AppContent;