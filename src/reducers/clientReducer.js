import { SET_CLIENT } from "../actions/type"
const INITIAL_STATE = {
    client : {}
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case SET_CLIENT: {
            return {
                ...state,
                client: action.payload,

            };
        }

        default:
            return state;

    }
}