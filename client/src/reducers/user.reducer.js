import { GET_USER, UPDATE_BIO, UPLOAD_PICTURE, LOGIN } from '../actions/user.actions'

const initialState = {};

export default function userReducer(state = initialState, action) {// contient l'état des action user exporté vers dossier index
    switch (action.type) {
        case LOGIN:
            console.log('LOGIN payload', action.playload)
            return action.playload;
        case GET_USER: 
            return action.playload;

        case UPLOAD_PICTURE:
            console.log(action.playload)
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