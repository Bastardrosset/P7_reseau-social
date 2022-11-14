import axios from 'axios'

//post
export const GET_POSTS = "GET_POSTS";
export const ADD_POST = "ADD_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";

//Comments
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

export const getPosts = (num) => {
    return (dispatch) => {
        return axios
        .get(`${process.env.REACT_APP_API_URL}api/posts`, {headers: getHeadersWithToken()})
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
        .post(`${process.env.REACT_APP_API_URL}api/posts`, data, {headers: getHeadersWithToken()})
        .then((res) => {
            dispatch({ type: ADD_POST, playload: {data}})
        })
        .catch((error) => console.log(error))
    }
}

export const updatePost = (posterId, message) => {
    return (dispatch) => {
        return axios ({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/posts/${posterId}`,
            withCredentials: true,
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
            url: `${process.env.REACT_APP_API_URL}api/posts/${postId}`,
            headers: getHeadersWithToken()
        })
        .then((res) => {
            dispatch({ type: DELETE_POST, playload: {postId}});
        })
        .catch((error) => console.log(error))
    }
}

export const addComment = (postId, text, commenterPseudo) => {
    return (dispatch) => {
        return axios ({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/posts/comment-post/${postId}`,
            data: { text, commenterPseudo },
            headers: getHeadersWithToken()
        })
        .then((res) => {
            dispatch({ type: ADD_COMMENT, playload: { postId }})
        })
        .catch((error) => console.log(error))
    }
}

export const editComment = (postId, commentId, text) => {
    return (dispatch) => {
        return axios ({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/posts/edit-comment-post/${postId}`,
            data: { commentId, text },
            headers: getHeadersWithToken()        })
        .then((res) => {
            dispatch({ type: EDIT_COMMENT, playload: { postId, commentId, text }})
        })
        .catch((error) => console.log(error))
    }
}

export const deleteComment = (postId, commentId) => {
    return (dispatch) => {
        return axios ({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/posts/delete-comment-post/${postId}`,
            data: { commentId },
            headers: getHeadersWithToken()
        })
        .then((res) => {
            dispatch({ type: DELETE_COMMENT, playload: { postId, commentId }})
        })
        .catch((error) => console.log(error))
    }
}

export const likePost = (postId, userId) => {
    return (dispatch) => {
        return axios ({
            method: 'patch',
            url:`${process.env.REACT_APP_API_URL}api/posts/like-post/`+ postId,
            data: {id: userId},
            headers: getHeadersWithToken()
        })
        .then((res) => {
            dispatch({ type: LIKE_POST, playload: {postId, userId} })
        })
        .catch ((error) => console.log(error))
    }
}
export const unlikePost = (postId, userId) => {
    return (dispatch) => {
        return axios ({
            method: 'patch',
            url:`${process.env.REACT_APP_API_URL}api/posts/unlike-post/`+ postId,
            data: {id: userId},
            headers: getHeadersWithToken()
        })
        .then((res) => {
            dispatch({ type: UNLIKE_POST, playload: {postId, userId} })
        })
        .catch ((error) => console.log(error))
    }
}

function getHeadersWithToken() {
    let token = localStorage.getItem('token')
    return {
        'Authorization': 'Bearer ' + token
    };
}