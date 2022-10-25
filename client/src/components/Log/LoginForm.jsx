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
    errorMessage: "Email inconnu ou mal saisi",
    label: 'Email',
    required: true, 
  },
  {
    id: 2,
    name: 'password',
    type: 'password',
    placeholder: 'Password',
    errorMessage: "Password inconnu ou mal saisi",
    label: 'Password',
    required: true, 
  },
];

  const handleLogin = (e) => {
    e.preventDefault();

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/auth/login`,
      withCredentials: true,
      data: {
        values
      },
    })
    .then((res) => {
      if (res.data.errors) {
        
      } else {
        window.location = '/';
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
