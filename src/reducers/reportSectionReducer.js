import { SET_REPORT_SECTION } from "../actions/type"
const INITIAL_STATE = {
    reportsection : []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case SET_REPORT_SECTION: {
            return {
                ...state,
                reportsection: action.payload,

            };
        }

        default:
            return state;

    }
}