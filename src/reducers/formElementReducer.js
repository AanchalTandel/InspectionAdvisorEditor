import { SET_FORM_ELEMENT } from "../actions/type"
const INITIAL_STATE = {
    elements : []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case SET_FORM_ELEMENT: {
            return {
                ...state,
                elements: action.payload,

            };
        }

        default:
            return state;

    }
}