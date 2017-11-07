import { SET_FORMDATA, GET_IMAGES, GET_VIDEOS } from "../actions/type"
const INITIAL_STATE = {
    fromdata : {},
    image: {},
    video: {}
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case SET_FORMDATA: {
            return {
                ...state,
                fromdata: action.payload,

            };
        }

        case GET_IMAGES: {
            return {
                ...state,
                image: action.payload,

            };
        }

        case GET_VIDEOS: {
            return {
                ...state,
                video: action.payload,

            };
        }

        default:
            return state;

    }
}