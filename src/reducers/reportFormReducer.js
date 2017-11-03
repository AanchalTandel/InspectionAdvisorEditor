import { SET_FORMDATA } from "../actions/type"
const INITIAL_STATE = {
    fromdata : {},
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case SET_FORMDATA: {
            return {
                ...state,
                fromdata: action.payload,

            };
        }


        default:
            return state;

    }
}