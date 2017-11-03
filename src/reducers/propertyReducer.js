import { SET_PROPERTY } from "../actions/type"
const INITIAL_STATE = {
    property : {},
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case SET_PROPERTY: {
            return {
                ...state,
                property: action.payload,

            };
        }


        default:
            return state;

    }
}