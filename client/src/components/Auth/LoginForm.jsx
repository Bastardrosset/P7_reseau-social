// import React, { useState } from 'react';
import axios from 'axios';
import LoginFormInput from '../FormInput/LoginFormInput';
import { useState } from 'react';
import { login } from '../../actions/user.actions';
import { useDispatch } from 'react-redux';


const LoginForm = () => {
  const [values, setValues] = useState({// déclaration des valeurs des variables d'état
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

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

    console.log('Handle login')
    dispatch(login(values))
    // axios({
    //   method: "post",
    //   url: `${process.env.REACT_APP_API_URL}api/auth/login`,
    //   withCredentials: true,
    //   data: {
    //     values
    //   },
    // })
    // .then((res) => {
    //   if (res.data.errors) {
    //     console.error('Erreur login : ', res.data.errors)
    //   } else {
    //     console.log('Authentification réussie :)', res.data);
    //   }
    // })
    // .catch((err) => {
    //   console.log(err)
    // });
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
