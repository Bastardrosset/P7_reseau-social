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
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location = "/";// redirige vers home
    }

  return (
    <li onClick={logout}>
        <i className="fas fa-power-off"></i>
    </li>
  )
}

export default Logout
