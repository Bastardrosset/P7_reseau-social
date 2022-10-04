import React, { useState } from 'react';
import axios from 'axios';


const SignUpForm = () => {
  const [formSbmit, setFormSubmit] = useState(false);
  const [pseudo, setPseudo] = useState('');// déclaration des variables d'état
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [controlPassword, setControlPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault()

    const terms = document.querySelector('#terms');
    const pseudoError = document.querySelector('.pseudo.error');
    const emailError = document.querySelector('.email.error');
    const passwordError = document.querySelector('.password.error');
    const passwordConfError = document.querySelector('.passwordConf.error');
    const termsError = document.querySelector('.terms.error');

    passwordConfError.innerHTML = "";
    termsError.innerHTML = "";

    if(password !== controlPassword || !terms.checked) {
        if(password !== controlPassword) {
        passwordConfError.innerHTML = "Les mots de passe ne correspondent pas !";
      }

        if(!terms.checked) {
        termsError.innerHTML = "Veuillez valider les conditions générales !";
      }
    } else {
      await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/auth/signup`,
      data: {
        pseudo,
        email,
        password
      },
    })
      .then((res) => {
        console.log(res)
        if (res.data.errors) {
          pseudoError.innerHTML = res.data.errors.pseudo;
          emailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
        } else {
          setFormSubmit(true);
        }
      })
      .catch((error) => console.log(error))
    }
  }
  return (
    <>
    {formSbmit ? (
      <>
      <SignUpForm />
      <h4 className='success'>Enregistrement réussi, veuillez vous connecter !</h4>
      </>
    ) : (

      <form action="" onSubmit={handleRegister} id="sign-up-form">
        <label htmlFor='pseudo'>Pseudo</label>
        <br/>
        <input 
          type="text" 
          name="pseudo" 
          id="pseudo"
          onChange={(e) => setPseudo(e.target.value)}
          value={pseudo} />
            <div className='pseudo error'></div>
          <br/>
        <label htmlFor='email'>Email</label>
        <br/>
        <input 
          type="text" 
          name="email" 
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email} />
            <div className='email error'></div>
          <br/>
        <label htmlFor='password'>Mot de passe</label>
        <br/>
        <input 
          type="password" 
          name="password" 
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password} />
            <div className='password error'></div>
          <br/>
        <label htmlFor='password-conf'>Confirmer mot de passe</label>
        <br/>
        <input 
          type="password" 
          name="password" 
          id="password-conf"
          onChange={(e) => setControlPassword(e.target.value)}
          value={controlPassword} />
            <div className='passwordConf error'></div>
          <br/>
          <input type="checkbox" id="terms" />
          <label htmlFor='terms'>J'accepte les <a href='/' target="_blank" rel='noopener noreferrer'>conditions générales</a></label>
            <div className='terms error'></div>
          <br/>
        <input type="submit"  value="Valider inscription" />
      </form>
      )}
    </>
  )
}

export default SignUpForm
