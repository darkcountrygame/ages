import {

    USER_LOGIN,
    SET_USER_DATA,
    USER_LOGOUT,
    USER_WAX_BALANCE,
    USER_RTP_BALANCE,
    USER_ITEMS,

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
                userData: null,
                waxBalance: 0,
                waxBalanceFetched: false,
                rtpBalance: 0.0000,
                rtpBalanceFetched: false,
                itemList: [],
                itemListFetched: false,

            };
        }

        case USER_WAX_BALANCE: {
            return { ...state, waxBalance: action.value, waxBalanceFetched: true };
        }

        case USER_RTP_BALANCE: {
            return { ...state, rtpBalance: action.value, rtpBalanceFetched: true };
        }

        case USER_ITEMS: {
            return { ...state, itemList: action.value, itemListFetched: true }
        }

        default:
            return state;
    }
}

export default AppReducer;