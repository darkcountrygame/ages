import React, { useContext, useEffect, useState } from 'react';

import { UALContext } from "ual-reactjs-renderer";

import { useApp } from '../../Data/AppContext';
import { useRoutes } from '../../Hooks/Routes';



import {
    fetchWaxBalance,
    fetchRtpBalance,
    fetchItems,
} from "../../Services";

const AppContent = () => {
    const routes = useRoutes();

    const {
        isAuthenticated,
        userData,
        userLoginHandler,
        setUserDataHandler,
        setWaxBalance,
        waxBalanceFetched,
        setRtpBalance,
        rtpBalanceFetched,
        itemListFetched,
        itemList,
        setUserNotStakedItems
    } = useApp();

    const { activeUser } = useContext(UALContext);

    const [waxBalanceLoading, setWaxBalanceLoading] = useState(false);
    const [rtpBalanceLoading, setRtpBalanceLoading] = useState(false);

    const [notStakedItemsLoading, setNotStakedItemsLoading] = useState(false);

    useEffect(() => {
        if (activeUser && activeUser.accountName && setUserDataHandler && userLoginHandler && !isAuthenticated) {
            setUserDataHandler(activeUser);
            userLoginHandler();
        }
    }, [activeUser, setUserDataHandler, userLoginHandler, isAuthenticated]);

    useEffect(() => {
        if (activeUser && activeUser.accountName && setWaxBalance && !waxBalanceLoading && !waxBalanceFetched) {
            setWaxBalanceLoading(true);

            fetchWaxBalance({ account: activeUser.accountName })
                .then(balance => setWaxBalance(balance))
                .catch(e => {
                    setWaxBalance(0);


                    console.log(e.message)
                    console.log(e)

                })
                .finally(() => setWaxBalanceLoading(false));
        }
    }, [activeUser, waxBalanceLoading, setWaxBalance, waxBalanceFetched]);

    useEffect(() => {
        if (activeUser && activeUser.accountName && setRtpBalance && !rtpBalanceLoading && !rtpBalanceFetched) {
            setRtpBalanceLoading(true);

            fetchRtpBalance({ account: activeUser.accountName })
                .then(balance => setRtpBalance(balance))
                .catch(e => {
                    setRtpBalance(0);


                    console.log(e.message)
                    console.log(e)

                })
                .finally(() => setRtpBalanceLoading(false));
        }
    }, [activeUser, rtpBalanceLoading, setRtpBalance, rtpBalanceFetched]);

    useEffect(() => {
        if (activeUser && activeUser.accountName && !itemListFetched && setUserNotStakedItems
            && !notStakedItemsLoading
        ) {
            setNotStakedItemsLoading(true);

            fetchItems({
                account: activeUser.accountName
                // miningMultiplier,
                // stakingConfig,
            })
                .then((items) => setUserNotStakedItems(items))
                .catch(e => {
                    console.log(e)

                    setUserNotStakedItems([]);
                })
                .finally(() => setNotStakedItemsLoading(false));
        }
    }, [activeUser]);




    return (
            <div>
                <main>
                    { routes }
                </main>
            </div>
    )
}

export default AppContent;