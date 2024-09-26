import React, { useContext, useEffect, useState } from 'react';

import { UALContext } from "ual-reactjs-renderer";

import { useApp } from '../../Data/AppContext';
import { useRoutes } from '../../Hooks/Routes';
import { ToastContainer } from "react-toastify";



import {
    fetchWaxBalance,
    fetchRtpBalance,
    fetchItems,
    fetchResources,
    fetchStakedWp,
    probabilityGetPoints,
    spConfig,
    totalSp,
    fetchCurrentEra,
    fetchWaxCourse,
    fetchToolConfig,
    fetchWpConfig,
    fetchPoolConfig
    // fetchStakedTools,

} from "../../Services";
import Header from "../../components/HeaderGame/HeaderGame";
import '../../index.css'

const AppContent = () => {
    const routes = useRoutes();

    const {
        isAuthenticated,
        userLoginHandler,
        setUserDataHandler,
        setWaxBalance,
        waxBalanceFetched,
        setRtpBalance,
        rtpBalanceFetched,
        itemListFetched,
        stakedItemListFetched,
        setStakedItems,
        setItems,
        resourcesFetched,
        setResources,
         setProbability,
         probabilityFetched,

        setSpConfig,
        spConfigFetched,

        setTotalSp,
        totalSpFetched,

        setEraConf,
        eraConfFetched,

        setWaxCourse,
        waxCourseFetched,

        setToolConfig,
        toolConfigFetched,

        setWpConfig,
        wpConfigFetched,

        setPoolConfig,
        poolConfigFetched,

    } = useApp();

    const { activeUser } = useContext(UALContext);

    const [waxBalanceLoading, setWaxBalanceLoading] = useState(false);
    const [rtpBalanceLoading, setRtpBalanceLoading] = useState(false);

    const [itemsLoading, setItemsLoading] = useState(false);
    const [stakedItemsLoading, setStakedItemsLoading] = useState(false);
    // const [stakedToolsLoading, setStakedToolsLoading] = useState(false);

    const [resourcesLoading, setResourcesLoading] = useState(false);
     const [probabilityLoading, setProbabilityLoading] = useState(false);
    const [spConfigLoading, setSpConfigLoading] = useState(false);

    const [totalSpLoading, setTotalSpLoading] = useState(false);

    const [eraConfLoading, setEraConfLoading] = useState(false);

    const [waxCourseLoading, setWaxCourseLoading] = useState(false);

    const [toolConfigLoading, setToolConfgLoading] = useState(false);
    const [wpConfigLoading, setWpConfgLoading] = useState(false);

    const [poolConfigLoading, setPoolConfgLoading] = useState(false);


    
 
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
    }, [activeUser, setItemsLoading, itemListFetched, setItems, itemsLoading]);

    useEffect(() => {
        if (activeUser && activeUser.accountName && !stakedItemListFetched && setStakedItems
            && !stakedItemsLoading
        ) {
            setStakedItemsLoading(true);

            fetchStakedWp({
                account: activeUser.accountName
            })
                .then((items) => setStakedItems(items))
                .catch(e => {
                    console.log(e)

                    setStakedItems([]);
                })
                .finally(() => setStakedItemsLoading(false));
        }
    }, [activeUser, setStakedItemsLoading, stakedItemListFetched, setStakedItems, stakedItemsLoading]);

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
    }, [activeUser, setResourcesLoading, resourcesFetched, setResources, resourcesLoading]);

    useEffect(() => {
        if (activeUser && activeUser.accountName && !eraConfFetched && setEraConf
            && !eraConfLoading
        ) {
            setEraConfLoading(true);

            fetchCurrentEra()
                .then((value) => setEraConf(value))
                .catch(e => {
                    console.log(e)
                    setEraConf([]);
                })
                .finally(() => setEraConfLoading(false));
        }
    }, [activeUser, setEraConfLoading, eraConfFetched, setEraConf, eraConfLoading]);

    useEffect(() => {
        if (activeUser && activeUser.accountName && !waxCourseFetched && setWaxCourse
            && !waxCourseLoading
        ) {
            setWaxCourseLoading(true);

            fetchWaxCourse({
                account: activeUser.accountName
            })
                .then((value) => setWaxCourse(value))
                .catch(e => {
                    console.log(e)
                    setWaxCourse([]);
                })
                .finally(() => setWaxCourseLoading(false));
}
}, [activeUser, setWaxCourseLoading, waxCourseFetched, setWaxCourse, waxCourseLoading]);

    useEffect(() => {
        if (activeUser && activeUser.accountName && !probabilityFetched && setProbability
            && !probabilityLoading
        ) {
            setProbabilityLoading(true);

            probabilityGetPoints({
                account: activeUser.accountName
            })
                .then((value) => setProbability(value))
                .catch(e => {
                    console.log(e)
                    setProbability(0);
                })
                .finally(() => setProbabilityLoading(false));
        }
    }, [activeUser, setProbabilityLoading, probabilityFetched, setProbability, probabilityLoading]);

    useEffect(() => {
        if (activeUser && activeUser.accountName && !spConfigFetched && setSpConfig
            && !spConfigLoading
        ) {
            setSpConfigLoading(true);

            spConfig()
                .then((value) => setSpConfig(value))
                .catch(e => {
                    console.log(e)
                    setSpConfig([]);
                })
                .finally(() => setSpConfigLoading(false));
        }
    }, [activeUser, setSpConfigLoading, spConfigFetched, setSpConfig, spConfigLoading]);

    useEffect(() => {
        if (activeUser && activeUser.accountName && !totalSpFetched && setTotalSp
            && !totalSpLoading
        ) {
            setTotalSpLoading(true);

            totalSp({account: activeUser.accountName})
                .then((value) => setTotalSp(value))
                .catch(e => {
                    console.log(e)
                    setTotalSp([]);
                })
                .finally(() => setTotalSpLoading(false));
        }
    }, [activeUser, setTotalSpLoading, totalSpFetched, setTotalSp, totalSpLoading]);

    useEffect(() => {
        if (activeUser && activeUser.accountName && !toolConfigFetched && setToolConfig
            && !toolConfigLoading
        ) {
            setToolConfgLoading(true);

            fetchToolConfig({
                account: activeUser.accountName
            })
                .then((value) => setToolConfig(value))
                .catch(e => {
                    console.log(e)
                    setToolConfig([]);
                })
                .finally(() => setToolConfgLoading(false));
        }
    }, [activeUser, setToolConfgLoading, toolConfigFetched, setToolConfig, toolConfigLoading]);

    useEffect(() => {
        if (activeUser && activeUser.accountName && !wpConfigFetched && setWpConfig
            && !wpConfigLoading
        ) {
            setWpConfgLoading(true);

            fetchWpConfig({
                account: activeUser.accountName
            })
                .then((value) => setWpConfig(value))
                .catch(e => {
                    console.log(e)
                    setWpConfig([]);
                })
                .finally(() => setWpConfgLoading(false));
        }
    }, [activeUser, setWpConfgLoading, wpConfigFetched, setWpConfig, wpConfigLoading]);

    useEffect(() => {
        if (activeUser && activeUser.accountName && !poolConfigFetched && setPoolConfig
            && !poolConfigLoading
        ) {
            setPoolConfgLoading(true);

            fetchPoolConfig()
                .then((value) => setPoolConfig(value))
                .catch(e => {
                    console.log(e)
                    setPoolConfig([]);
                })
                .finally(() => setPoolConfgLoading(false));
        }
    }, [activeUser, setPoolConfgLoading, poolConfigFetched, setPoolConfig, poolConfigLoading]);



    return (
            <div>
                <main className={'main-bg'}>
                    {activeUser && <Header />}
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