import React, { useState } from 'react';
import axios from 'axios';



const LoginForm = () => {
  const [email, setEmail] = useState("");// déclaration des variables d'état
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector('.email-error');
    const passwordError = document.querySelector('.password-error');

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/auth/login`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
    .then((response) => {
      console.log(response)
      if (response.data.errors) {
        emailError.innerHTML = response.data.errors.email;
        passwordError.innerHTML = response.data.errors.password;
      } else {
        window.location = '/';
      }
    })
    .catch((err) => {
      console.log(err)
    });
  };
  return (
    <form action='' onSubmit={handleLogin} id="login-form">
      <label htmlFor='email'>Email</label>
      <br/>
        <input 
          type="text" 
          name="email" 
          id="email" 
          onChange={(e) => setEmail(e.target.value)} value={email} />
      <div className='email-error'></div>
      <br/>

      <label htmlFor='password'>Mot de passe</label>
      <br/>
        <input 
          type="password" 
          name="password" 
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password} />
        <div className='password-error'></div>
      <br/>

        <input type="submit" value="Se connecter" />
    </form>
  )
}

export default LoginForm
