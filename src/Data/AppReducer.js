import {

    USER_LOGIN,
    SET_USER_DATA,
    USER_LOGOUT

} from './AppActionTypes';



const AppReducer = (state, action) => {
    switch(action.type) {
        case USER_LOGIN: {
            return {...state, isAuthenticated: true};
        }
        case SET_USER_DATA: {
            return { ...state, userData: action.data };
        }
        case USER_LOGOUT: {
            return {
                ...state,
                isAuthenticated: false,
                userData: null
            };
        }

        default:
            return state;
    }
}

export default AppReducer;