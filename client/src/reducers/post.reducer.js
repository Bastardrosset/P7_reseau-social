import { GET_POSTS, UPDATE_POST } from "../actions/post.actions";

const initialState = {};

export default function postReducer(state = initialState, action){
    switch (action.type) {
        case GET_POSTS:
            return action.playload;

        case UPDATE_POST:
            return state.map((post) => {
                if (post._id === action.playload.posterId) {
                    return {
                        ...post,
                        message: action.playload.message,
                    };
                } else { return post};
            });
            
        default:
            return state;
    }
}