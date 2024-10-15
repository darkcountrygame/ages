import React, { useEffect, useState } from 'react';

import { useApp } from '../../Data/AppContext';
import { useRoutes } from '../../Hooks/Routes';
import { ToastContainer } from "react-toastify";

import {
    contract_address,
    // fetchWaxBalance,
    // fetchRtpBalance,
    // fetchItems,
    // fetchResources,
    // fetchStakedWp,
    // probabilityGetPoints,
    // spConfig,
    // totalSp,
    // fetchCurrentEra,
    // fetchWaxCourse,
    // fetchToolConfig,
    // fetchWpConfig,
    // fetchPoolConfig,
    getAptosStakedWP,
    getUserNfts
    // fetchStakedTools,

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
        // setWaxBalance,
        // waxBalanceFetched,
        // setRtpBalance,
        // rtpBalanceFetched,
        itemListFetched,
        stakedItemListFetched,
        setStakedItems,
        setItems,
        userLogoutHandler
        // resourcesFetched,
        // setResources,
        //  setProbability,
        //  probabilityFetched,

        // setSpConfig,
        // spConfigFetched,

        // setTotalSp,
        // totalSpFetched,

        // setEraConf,
        // eraConfFetched,

        // setWaxCourse,
        // waxCourseFetched,

        // setToolConfig,
        // toolConfigFetched,

        // setWpConfig,
        // wpConfigFetched,

        // setPoolConfig,
        // poolConfigFetched,

    } = useApp();

    // const [waxBalanceLoading, setWaxBalanceLoading] = useState(false);
    // const [rtpBalanceLoading, setRtpBalanceLoading] = useState(false);

    const [itemsLoading, setItemsLoading] = useState(false);
    const [stakedItemsLoading, setStakedItemsLoading] = useState(false);
    // const [stakedToolsLoading, setStakedToolsLoading] = useState(false);

    // const [resourcesLoading, setResourcesLoading] = useState(false);
    //  const [probabilityLoading, setProbabilityLoading] = useState(false);
    // const [spConfigLoading, setSpConfigLoading] = useState(false);

    // const [totalSpLoading, setTotalSpLoading] = useState(false);

    // const [eraConfLoading, setEraConfLoading] = useState(false);

    // const [waxCourseLoading, setWaxCourseLoading] = useState(false);

    // const [toolConfigLoading, setToolConfgLoading] = useState(false);
    // const [wpConfigLoading, setWpConfgLoading] = useState(false);

    // const [poolConfigLoading, setPoolConfgLoading] = useState(false);

    // РОЗКОМЕНТУВАТИ
    useEffect(() => {
        const registerFunc = async () => {
            if (account) {
                try {
                    await signAndSubmitTransaction({
                        sender: account.address,
                        data: {
                            function: `${contract_address}::farm::register`, // String interpolation
                            functionArguments: [],
                        },
                    });
                } catch (error) {
                    console.error("Transaction failed:", error); // Error handling
                }
            }
        };
    
        registerFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account]);
    
 
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account]);

//     useEffect(() => {
//         if (activeUser && activeUser.accountName && setRtpBalance && !rtpBalanceLoading && !rtpBalanceFetched) {
//             setRtpBalanceLoading(true);

//             fetchRtpBalance({ account: activeUser.accountName })
//                 .then(balance => setRtpBalance(balance))
//                 .catch(e => {
//                     setRtpBalance(0);


//                     console.log(e.message)
//                     console.log(e)

//                 })
//                 .finally(() => setRtpBalanceLoading(false));
//         }
//     }, [activeUser, rtpBalanceLoading, setRtpBalance, rtpBalanceFetched]);

    useEffect(() => {
        if (account && account.address && !itemListFetched && setItems
            && !itemsLoading
        ) {
            setItemsLoading(true);

            getUserNfts({
                account: account.address
            })
                .then((items) => setItems(items))
                .catch(e => {
                    console.log(e)

                    setItems([]);
                })
                .finally(() => setItemsLoading(false));
        }
    }, [account, setItemsLoading, itemListFetched, setItems, itemsLoading]);

    useEffect(() => {
        if (account && account.address && !stakedItemListFetched && setStakedItems
            && !stakedItemsLoading
        ) {
            setStakedItemsLoading(true);

            getAptosStakedWP({account})
                .then((items) => setStakedItems(items))
                .catch(e => {
                    console.log(e)

                    setStakedItems([]);
                })
                .finally(() => setStakedItemsLoading(false));
        }
    }, [account, setStakedItemsLoading, stakedItemListFetched, setStakedItems, stakedItemsLoading]);

//     useEffect(() => {
//         if (activeUser && activeUser.accountName && !resourcesFetched && setResources
//             && !resourcesLoading
//         ) {
//             setResourcesLoading(true);

//             fetchResources({
//                 account: activeUser.accountName
//             })
//                 .then((resurce) => setResources(resurce))
//                 .catch(e => {
//                     console.log(e)

//                     setResources([]);
//                 })
//                 .finally(() => setResourcesLoading(false));
//         }
//     }, [activeUser, setResourcesLoading, resourcesFetched, setResources, resourcesLoading]);



    return (
            <div>
                <main className={'main-bg'}>
                    {isAuthenticated && <Header />}
                    { routes }
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
    )
}

export default AppContent;