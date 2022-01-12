import { createContext, useContext, useReducer } from 'react';
import AppReducer from './AppReducer';

import {
    USER_LOGIN,
    SET_USER_DATA,
    USER_LOGOUT,
    USER_WAX_BALANCE,
    USER_RTP_BALANCE,
    USER_ITEMS,
    USER_STAKED_ITEMS,
    USER_RESOURCES,
    USER_PROBABILITY_GET_POINTS,
    USER_ERA,
    DELPHI_ORACLE_COURSE,
    TOOL_CONFIG,
    WP_CONFIG,

} from './AppActionTypes';

const AppContext = createContext();

export const useApp = () => {
    return useContext(AppContext);
}


const initialState = {
    isAuthenticated: false,
    userData: null,

    waxBalance: 0,
    waxBalanceFetched: false,
    rtpBalance: 0,
    rtpBalanceFetched: false,

    itemList: [],
    itemListFetched: false,

    stakedItemList: [],
    stakedItemListFetched: false,

    selectedItem: [],
    selectedItemFetched: false,

    resourcesList: [],
    resourcesFetched: false,

     probabilityPoints: 0,
     probabilityFetched: false,

    eraConf: [],
    eraConfFeatched: false,

    waxCourse: [],
    waxCourseFetched: false,

    toolConfig: [],
    toolConfigFetched: false,

    wpConfig: [],
    wpConfigFetched: false,

}

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    const userLoginHandler = () => dispatch({ type: USER_LOGIN });
    const setUserDataHandler = data => dispatch({ type: SET_USER_DATA, data});
    const userLogoutHandler = () => dispatch({ type: USER_LOGOUT });

    const setWaxBalance = value => dispatch({ type: USER_WAX_BALANCE, value });
    const setRtpBalance = value => dispatch({ type: USER_RTP_BALANCE, value });

    const setItems = value => dispatch({ type: USER_ITEMS, value });
    const setStakedItems = value => dispatch({ type: USER_STAKED_ITEMS, value });

    const setResources = value => dispatch({ type: USER_RESOURCES, value });

     const setProbability = value => dispatch({type: USER_PROBABILITY_GET_POINTS, value });

    const setEraConf = value => dispatch({ type: USER_ERA, value });

    const setWaxCourse = value => dispatch({ type: DELPHI_ORACLE_COURSE, value });

    const setToolConfig = value => dispatch({ type: TOOL_CONFIG, value });
    const setWpConfig = value => dispatch({ type: WP_CONFIG, value });


    return (
        <AppContext.Provider value={{
            userData: state.userData,
            isAuthenticated: state.isAuthenticated,

            waxBalance: state.waxBalance,
            waxBalanceFetched: state.waxBalanceFetched,
            rtpBalance: state.rtpBalance,
            rtpBalanceFetched: state.rtpBalanceFetched,

            itemList: state.itemList,
            itemListFetched: state.itemListFetched,

            stakedItemList: state.stakedItemList,
            stakedItemListFetched: state.stakedItemListFetched,

            selectedItem: state.itemList,
            selectedItemFetched: state.itemListFetched,

            resourcesList: state.resourcesList,
            resourcesFetched: state.resourcesFetched,

            probabilityPoints: state.probabilityPoints,
             probabilityFetched: state.probabilityFetched,

            eraConf: state.eraConf,
            eraConfFetched: state.eraConfFetched,

            waxCourse: state.waxCourse,
            waxCourseFetched: state.waxCourseFetched,

            toolConfig: state.toolConfig,
            toolConfigFetched: state.toolConfigFetched,

            wpConfig: state.wpConfig,
            wpConfigFetched: state.wpConfigFetched,

            userLoginHandler,
            userLogoutHandler,
            setUserDataHandler,
            setWaxBalance,
            setRtpBalance,
            setItems,
            setStakedItems,
            setResources,
             setProbability,
            setEraConf,
            setWaxCourse,
            setToolConfig,
            setWpConfig,


        }}>
            { children }
        </AppContext.Provider>
    )
}