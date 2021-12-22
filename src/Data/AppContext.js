import { createContext, useContext, useReducer } from 'react';
import AppReducer from './AppReducer';

import {
    USER_LOGIN,
    SET_USER_DATA,
    USER_LOGOUT,


} from './AppActionTypes';

const AppContext = createContext();

export const useApp = () => {
    return useContext(AppContext);
}


const initialState = {
    isAuthenticated: false,
    userData: null,
}

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    const userLoginHandler = () => dispatch({ type: USER_LOGIN });
    const setUserDataHandler = data => dispatch({ type: SET_USER_DATA, data});
    const userLogoutHandler = () => dispatch({ type: USER_LOGOUT });


    return (
        <AppContext.Provider value={{
            userData: state.userData,
            isAuthenticated: state.isAuthenticated,

            userLoginHandler,
            userLogoutHandler,

        }}>
            { children }
        </AppContext.Provider>
    )
}