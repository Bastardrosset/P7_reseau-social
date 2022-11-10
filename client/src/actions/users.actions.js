import axios from "axios";


export const GET_USERS = "GET_USERS";

export const getUsers = () => {
    return (dispatch) => {
        return axios
        .get(`${process.env.REACT_APP_API_URL}api/auth`)
        .then((res) => {
            dispatch({ type: GET_USERS, playload: res.data })
        })
        .catch((error) => console.log(error))
    }
}