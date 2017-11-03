import { SET_REPORT } from "../actions/type"
const INITIAL_STATE = {
    report : {}
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case SET_REPORT: {
            return {
                ...state,
                report: action.payload,

            };
        }

        default:
            return state;

    }
}