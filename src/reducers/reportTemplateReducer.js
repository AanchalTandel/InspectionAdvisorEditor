import { SET_REPORT_TEMPLATE } from "../actions/type"
const INITIAL_STATE = {
    template : []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case SET_REPORT_TEMPLATE: {
            return {
                ...state,
                template: action.payload,

            };
        }

        default:
            return state;

    }
}