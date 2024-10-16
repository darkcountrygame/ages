import React, { useEffect, useState } from 'react';
import { useApp } from '../../Data/AppContext';
import { useRoutes } from '../../Hooks/Routes';
import { ToastContainer } from "react-toastify";
import {
    contract_address,
    getAccountBalanceAptos,
    getAptosStakedWP,
    getResources,
    getUserNfts
} from "../../Services";
import Header from "../../components/HeaderGame/HeaderGame";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import '../../index.css'

const AppContent = () => {
    const routes = useRoutes();
    const { account, signAndSubmitTransaction } = useWallet();
    
    const {
        isAuthenticated,
        userLoginHandler,
        setUserDataHandler,
        setRtpBalance,
        rtpBalanceFetched,
        itemListFetched,
        stakedItemListFetched,
        setStakedItems,
        setItems,
        userLogoutHandler,
        resourcesFetched,
        setResources
    } = useApp();

    const [rtpBalanceLoading, setRtpBalanceLoading] = useState(false);
    const [itemsLoading, setItemsLoading] = useState(false);
    const [stakedItemsLoading, setStakedItemsLoading] = useState(false);
    const [resourcesLoading, setResourcesLoading] = useState(false);

    useEffect(() => {
        const registerFunc = async () => {
            const transactionKey = "transactionSigned";
            const isTransactionSigned = localStorage.getItem(transactionKey);
    
            if (account && !isTransactionSigned) {
                try {
                    await signAndSubmitTransaction({
                        sender: account.address,
                        data: {
                            function: `${contract_address}::farm::register`,
                            functionArguments: [],
                        },
                    });
                    localStorage.setItem(transactionKey, "true");
                } catch (error) {
                    console.error("Transaction failed:", error);
                }
            }
        };
        registerFunc();
    }, [account, signAndSubmitTransaction]);

    useEffect(() => {
        if (account && setUserDataHandler && userLoginHandler && !isAuthenticated) {
            setUserDataHandler(account);
            userLoginHandler();
        }
    }, [account, setUserDataHandler, userLoginHandler, isAuthenticated]);

    useEffect(() => {
        if (!account) {
            userLogoutHandler();
        }
    }, [account, userLogoutHandler]);

    
    useEffect(() => {
        if (account?.address && setRtpBalance && !rtpBalanceLoading && !rtpBalanceFetched) {
            setRtpBalanceLoading(true);
            getAccountBalanceAptos({ account: account.address })
                .then(balance => setRtpBalance(balance))
                .catch(() => setRtpBalance(0))
                .finally(() => setRtpBalanceLoading(false));
        }
    }, [account, rtpBalanceFetched, rtpBalanceLoading, setRtpBalance]);

    useEffect(() => {
        if (account?.address && !itemListFetched && setItems && !itemsLoading) {
            setItemsLoading(true);
            getUserNfts({ account: account.address })
                .then(items => setItems(items))
                .catch(() => setItems([]))
                .finally(() => setItemsLoading(false));
        }
    }, [account, setItems, itemListFetched, itemsLoading]);

    useEffect(() => {
        if (account?.address && !stakedItemListFetched && setStakedItems && !stakedItemsLoading) {
            setStakedItemsLoading(true);
            getAptosStakedWP({ account })
                .then(items => setStakedItems(items))
                .catch(() => setStakedItems([]))
                .finally(() => setStakedItemsLoading(false));
        }
    }, [account, setStakedItems, stakedItemListFetched, stakedItemsLoading]);

    useEffect(() => {
        if (account?.address && !resourcesFetched && setResources && !resourcesLoading) {
            setResourcesLoading(true);
            getResources({ account })
                .then(res => setResources(res))
                .catch(() => setResources([]))
                .finally(() => setResourcesLoading(false));
        }
    }, [account, setResources, resourcesFetched, resourcesLoading]);

    return (
        <div>
            <main className='main-bg'>
                {isAuthenticated && <Header />}
                {routes}
            </main>
            <ToastContainer
                position="bottom-left"
                autoClose={4000}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
            />
        </div>
    );
}

export default AppContent;
