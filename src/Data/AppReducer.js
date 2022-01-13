import {

    USER_LOGIN,
    SET_USER_DATA,
    USER_LOGOUT,
    USER_WAX_BALANCE,
    USER_RTP_BALANCE,
    USER_ITEMS,
    USER_STAKED_TOOLS,
    USER_RESOURCES,
    USER_PROBABILITY_GET_POINTS,
    USER_ERA,
    DELPHI_ORACLE_COURSE,
    USER_STAKED_ITEMS,
    TOOL_CONFIG,
    WP_CONFIG,

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

        case USER_STAKED_ITEMS: {
            return { ...state, stakedItemList: action.value, stakedItemListFetched: true }
        }

        case USER_STAKED_TOOLS: {
            return { ...state, stakedToolsList: action.value, stakedToolsListFetched: true }
        }
        
        case USER_RESOURCES: {
            return { ...state, resourcesList: action.value, resourcesFetched: true }
        }

         case USER_PROBABILITY_GET_POINTS: {
             return { ...state, probabilityPoints: action.value, probabilityFetched: true }
         }

        case USER_ERA: {
            return { ...state, eraConf: action.value, eraConfFetched: true }
        }

        case DELPHI_ORACLE_COURSE: {
            return { ...state, waxCourse: action.value, waxCourseFetched: true }
        }

        case TOOL_CONFIG: {
            return { ...state, toolConfig: action.value, toolConfigFetched: true }
        }

        case WP_CONFIG: {
            return { ...state, wpConfig: action.value, wpConfigFetched: true }
        }

        default:
            return state;
    }
}

export default AppReducer;