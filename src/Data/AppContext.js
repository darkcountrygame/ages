import { createContext, useContext, useReducer } from 'react';
import AppReducer from './AppReducer';

import {
    USER_LOGIN,
    SET_USER_DATA,
    USER_LOGOUT,
    USER_WAX_BALANCE,
    USER_RTP_BALANCE,

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

}

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    const userLoginHandler = () => dispatch({ type: USER_LOGIN });
    const setUserDataHandler = data => dispatch({ type: SET_USER_DATA, data});
    const userLogoutHandler = () => dispatch({ type: USER_LOGOUT });

    const setWaxBalance = value => dispatch({ type: USER_WAX_BALANCE, value });
    const setRtpBalance = value => dispatch({ type: USER_RTP_BALANCE, value });


    return (
        <AppContext.Provider value={{
            userData: state.userData,
            isAuthenticated: state.isAuthenticated,

            waxBalance: state.waxBalance,
            waxBalanceFetched: state.waxBalanceFetched,
            rtpBalance: state.rtpBalance,
            rtpBalanceFetched: state.rtpBalanceFetched,

            userLoginHandler,
            userLogoutHandler,
            setUserDataHandler,
            setWaxBalance,
            setRtpBalance,

        }}>
            { children }
        </AppContext.Provider>
    )
}