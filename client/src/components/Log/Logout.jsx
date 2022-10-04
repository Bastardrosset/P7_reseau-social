import React from 'react';
import axios from 'axios';
import cookie from 'js-cookie';


const Logout = () => {
    const removeCookie = (key) => {// function removeCookie passe la key jwt de await axios et retire le cookie du front
        if (window !== "undefined") {
            cookie.remove(key, { expires: 1 });
        }
    }

    const logout = async () => {
        await axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}api/auth/logout`,
            withCredentials: true
        })
        .then(() => removeCookie('jwt'))// retire le cookie du front
        .catch((error) => console.log(error));

        window.location = "/";// redirige vers home
    }

  return (
    <li onClick={logout}>
        <i class="fas fa-power-off"></i>
    </li>
  )
}

export default Logout
