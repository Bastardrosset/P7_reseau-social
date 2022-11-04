import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";


//Renvoie toute la data de l'user
export const getUser = (uid) => {
    return (dispatch) => {// dispatch envoi au reducer les infos
        return axios// envoie a la BD la data
        .get(`${process.env.REACT_APP_API_URL}api/auth/${uid}`)
        .then((res) => {
            dispatch({ type: GET_USER, playload: res.data })
        })
        .catch((error) => console.log(error))
    }
}

//mise a jour de l'avatar
export const uploadPicture = (data, id) => {
    return (dispatch) => {
        return axios
        .post(`${process.env.REACT_APP_API_URL}api/auth/upload/`, data)
        .then((res) => {
            return axios
            .get(`${process.env.REACT_APP_API_URL}api/auth/${id}`)
            .then((res) => {
                dispatch({ type: UPLOAD_PICTURE, playload: res.data.picture })
            })
        })
        .catch((error) => console.log(error))
    }
}

//mise a jour de la biographie
export const updateBio = (userId, bio) => {
    return (dispatch) => {
        return axios({ 
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/auth/` + userId,
            data: { bio }
        })
        .then((res) =>{
            dispatch({ type: UPDATE_BIO, playload: bio })
            })
        .catch((error) => console.log(error))
    }
}

