import React, { useContext, useEffect, useState } from 'react';

import { UALContext } from "ual-reactjs-renderer";

import { useApp } from '../../Data/AppContext';
import { useRoutes } from '../../Hooks/Routes';



import {
    fetchWaxBalance,
    fetchRtpBalance,
    fetchItems,
    fetchResources,
    fetchStakedItems,
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
        stakedItemListFetched,
        stakedItemList,
        setStakedItems,
        setItems,
        resourcesList,
        resourcesFetched,
        setResources,
    } = useApp();

    const { activeUser } = useContext(UALContext);

    const [waxBalanceLoading, setWaxBalanceLoading] = useState(false);
    const [rtpBalanceLoading, setRtpBalanceLoading] = useState(false);

    const [itemsLoading, setItemsLoading] = useState(false);
    const [stakedItemsLoading, setStakedItemsLoading] = useState(false);

    const [resourcesLoading, setResourcesLoading] = useState(false);

    
 
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
        if (activeUser && activeUser.accountName && !itemListFetched && setItems
            && !itemsLoading
        ) {
            setItemsLoading(true);

            fetchItems({
                account: activeUser.accountName
            })
                .then((items) => setItems(items))
                .catch(e => {
                    console.log(e)

                    setItems([]);
                })
                .finally(() => setItemsLoading(false));
        }
    }, [activeUser, setItemsLoading, itemListFetched, setItems]);

    useEffect(() => {
        if (activeUser && activeUser.accountName && !stakedItemListFetched && setStakedItems
            && !stakedItemsLoading
        ) {
            setStakedItemsLoading(true);

            fetchStakedItems()
                .then((items) => setStakedItems(items))
                .catch(e => {
                    console.log(e)

                    setStakedItems([]);
                })
                .finally(() => setStakedItemsLoading(false));
        }
    }, [activeUser, setStakedItemsLoading, stakedItemListFetched, setStakedItems]);

    useEffect(() => {
        if (activeUser && activeUser.accountName && !resourcesFetched && setResources
            && !resourcesLoading
        ) {
            setResourcesLoading(true);

            fetchResources({
                account: activeUser.accountName
            })
                .then((resurce) => setResources(resurce))
                .catch(e => {
                    console.log(e)

                    setResources([]);
                })
                .finally(() => setResourcesLoading(false));
        }
    }, [activeUser, setResourcesLoading, resourcesFetched, setResources]);




    return (
            <div>
                <main>
                    { routes }
                </main>
            </div>
    )
}

export default AppContent;