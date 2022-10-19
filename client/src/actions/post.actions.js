import axios from 'axios'


//post
export const GET_POSTS = "GET_POSTS";
export const ADD_POST = "ADD_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";

//Comments
export const ADD_COMMENT = "ADD_COMMENT";


export const getPosts = (num) => {
    return (dispatch) => {
        return axios
        .get(`${process.env.REACT_APP_API_URL}api/post/`)
        .then((res) => {
            const array = res.data.slice(0, num)
            dispatch({ type: GET_POSTS, playload: array })
        })
        .catch((error) => console.log(error))
    }
}

export const addPost = (data) => {
    return (dispatch) => {
        return axios
        .post(`${process.env.REACT_APP_API_URL}api/post/`, data)
        .then((res) => {
            res.status(200);
        })
        .catch((error) => console.log(error))
    }
}

export const updatePost = (posterId, message) => {
    return (dispatch) => {
        return axios ({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/post/${posterId}`,
            data: { message }
        })
        .then((res) => {
            dispatch({ type: UPDATE_POST, playload: { message,posterId }});
        })
        .catch((error) => console.log(error))
    }
}

export const deletePost = (postId) => {
    return (dispatch) => {
        return axios ({
            method: "delete",
            url: `${process.env.REACT_APP_API_URL}api/post/${postId}`
        })
        .then((res) => {
            dispatch({ type: DELETE_POST, playload: {postId}});
        })
        .catch((error) => console.log(error))
    }
}

export const addComment = (postId, commenterId, text, commenterPseudo) => {
    return (dispatch) => {
        return axios ({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/post/comment-post/${postId}`,
            data: { commenterId, text, commenterPseudo }
        })
        .then((res) => {
            dispatch({ type: ADD_COMMENT, playload: { postId }})
        })
        .catch((error) => console.log(error))
}
}