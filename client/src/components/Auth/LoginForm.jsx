// import React, { useState } from 'react';
import axios from 'axios';
import LoginFormInput from '../FormInput/LoginFormInput';
import { useState } from 'react';

const LoginForm = () => {
  const [values, setValues] = useState({// déclaration des valeurs des variables d'état
    email: "",
    password: "",
  });

const inputs = [
  {
    id: 1,
    name: 'email',
    type: 'text',
    placeholder: 'Email',
    errorMessage: "Email mal saisi ou inconnu",
    errorMailMessage: "email inconnu",
    label: 'Email',
    pattern: "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$",
    required: true, 
  },
  {
    id: 2,
    name: 'password',
    type: 'password',
    placeholder: 'Password',
    errorMessage: "Password inconnu ou mal saisi",
    label: 'Password',
    pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,50}$`,
    required: true, 
  },
];

  const handleLogin = (e) => {
    e.preventDefault();

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/auth/login`,
      data: {
        values
      },
    })
    .then((res) => {
      if (res.data.errors) {
        
      } else {
        console.log('Data value', res.data)
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('user', JSON.stringify(res.data.user))
        window.location.href = "/";
      }
    })
    .catch((err) => {
      console.log(err)
    });
  };
  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }
  return (
    
    <form action='' onSubmit={handleLogin} id="login-form">
      {inputs.map((input) => (
        <LoginFormInput 
          key={input.id} 
          {...input} 
          value={values[input.name]}
          onChange={onChange}/>
      ))}
      <br/>
        <input type="submit" value="Se connecter" /> 
    </form>
  )
}

export default LoginForm
