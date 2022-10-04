import { FOLLOW_USER, GET_USER, UNFOLLOW_USER, UPDATE_BIO, UPLOAD_PICTURE } from '../actions/user.actions'

const initialState = {};

export default function userReducer(state = initialState, action) {// contient l'état des action user exporté vers dossier index
    switch (action.type) {
        case GET_USER: 
            return action.playload
        case UPLOAD_PICTURE:
            return {
                ...state,
                picture: action.playload,
            };
        case UPDATE_BIO:
            return {
                ...state,
                bio: action.playload,
            };
        case FOLLOW_USER:
            return {
                ...state,
                following: [action.playload.idToFollow, ...state.following],
            };
        case UNFOLLOW_USER:
            return {
                ...state,
                following: state.following.filter((id) => id !== action.playload.idToUnFollow),
            };

        default:
            return state;
    }
}