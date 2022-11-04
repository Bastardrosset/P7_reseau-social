import React, { useState } from 'react';
import SignupFormInput from '../FormInput/SignupFormInput';
import axios from 'axios';

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);

  const [values, setValues] = useState({
    pseudo: "",
    email: "",
    password: "",
    comfirmPassword: "",
  })

  const inputs = [
    {
      id: 1,
      name: "pseudo",
      type: "text",
      placeholder: "Pseudo",
      errorMessage: "Pseudo doit être entre 3-55 sans caractères spécial",
      label: "Pseudo",
      pattern: "^[A-Za-z0-9]{3,55}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "text",
      placeholder: "Email",
      errorMessage: "Email doit être valide",
      label: "Email",
      pattern: "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "Password doit être minimun de 6 avec 1 nombre et 1 caractère spècial",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,50}$`,
      required: true,
    },
    {
      id: 4,
      name: "confirmePassword",
      type: "password",
      placeholder: "Confirme password",
      errorMessage: "Password don't match !",
      label: "Confirme password",
      pattern: values.password,
      required: true,
    },
  ];

  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})

  }

  const handleRegister = async (e) => {
    e.preventDefault()

    const terms = document.querySelector('#terms');
    const termsError = document.querySelector('.terms.error');
    termsError.innerHTML = "";

    if(!terms.checked) {
      termsError.innerHTML = "Veuillez valider les conditions générales !";
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/auth/signup`,
        data: {
          values
        },
      })
        .then((res) => {
          if (res.data.errors) {
  
          } else {
            setFormSubmit(true);
          }
        })
        .catch((error) => console.log(error))
    }
 
  };
  return (
    <>
    {formSubmit ? (
      <>
      <SignUpForm />
      <h4 className='success'>Enregistrement réussi, veuillez vous connecter !</h4>
      </>
    ) : (

      <form action="" onSubmit={handleRegister} id="sign-up-form">
        {inputs.map((input) => (
          <SignupFormInput 
            key={input.id} 
            {...input} 
            value={values[input.name]}
            onChange={onChange}/>
        ))}
        <br/>
        <div>
          <input type="checkbox" id="terms" />
            <label 
              htmlFor='terms'>J'accepte les <a href='/' target="_blank" rel='noopener noreferrer'>conditions générales</a>
            </label>
            <div className='terms error'></div>
        </div>
        <br/>
        <input type="submit"  value="Valider inscription" />
      </form>
      )}
    </>
  )
}

export default SignUpForm
