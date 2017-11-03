import { APP_SET_USER_DATA,START_LOADING,STOP_LOADING ,USER_EMAIL_CHANGED,USER_PASS_CHANGED} from '../actions/type'
const  INITIAL_STATE = {
    email: "Demetri.Clark@gmail.com",
    password: "Password1",
    token:"",
    isLoading:false,
    username:"",
    userdata:{}
}


export default (state = INITIAL_STATE, action) => {
    debugger
    switch (action.type) {

        case START_LOADING: {
            return {
                ...state,
                isLoading: action.payload,
            };
        }
        case STOP_LOADING: {
            return {
                ...state,
                isLoading: action.payload,
            };
        }
        case APP_SET_USER_DATA: {
            return {
                ...state,
                email: state.email,
                password: state.password,
                username:action.payload.user.username,
                token: action.payload.token,
                userdata:action.payload.user
            };
        }

        case USER_EMAIL_CHANGED: {
            return {
                ...state,
                email: action.payload,

            };
        }
        case USER_PASS_CHANGED: {
            return {
                ...state,
                password: action.payload,

            };
        }

        default:
            return state;
    }
}