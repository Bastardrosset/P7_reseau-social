import { GET_USER, UPDATE_BIO, UPLOAD_PICTURE } from '../actions/user.actions'

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

        default:
            return state;
    }
}