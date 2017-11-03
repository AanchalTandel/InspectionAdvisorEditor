import { SET_REPORT_LIST } from "../actions/type"
const INITIAL_STATE = {
    reports : []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case SET_REPORT_LIST: {
            return {
                ...state,
                reports: action.payload,

            };
        }

        default:
            return state;

    }
}