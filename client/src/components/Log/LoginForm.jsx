import React, { useState } from 'react';
import axios from 'axios';



const LoginForm = () => {
  const [email, setEmail] = useState("");// déclaration des variables d'état
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector('.email-error');
    const passwordError = document.querySelector('.password-error');
    
    emailError.textContent = 'Email inconnu ou mal saisie!'
    passwordError.textContent = "Le mot de passe ne correspond pas à celui enregistré !";

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/auth/login`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
    .then((res) => {
      // console.log(res)
      if (res.data.errors) {
        emailError.innerHTML = res.data.errors.email;
        passwordError.innerHTML = res.data.errors.password;
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
          onChange={(e) => setEmail(e.target.value)} 
          value={email}/>
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
