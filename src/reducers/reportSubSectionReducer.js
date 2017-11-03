import { SET_REPORT_SUBSECTION } from "../actions/type"
const INITIAL_STATE = {
    reportsubsection : []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case SET_REPORT_SUBSECTION: {
            return {
                ...state,
                reportsubsection: action.payload,

            };
        }

        default:
            return state;

    }
}