import { SET_AGENT } from "../actions/type"
const INITIAL_STATE = {
    agent : {}
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_AGENT: {
            return {
                ...state,
                agent: action.payload,

            };
        }

        default:
            return state;

    }
}