
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const SignupFormInput = (props) => {
    const [focused, setFocused] = useState(false);
    const {label, errorMessage, onChange, id, ...inputProps} = props;
    const usersPseudo = useSelector((state) => state.usersReducer);
    const usersEmail = useSelector((state) => state.usersReducer);

    const handleFocused = (e) => {
        setFocused(true)
        usersPseudo.map((userpseudo) => {
          if (userpseudo.pseudo === e.target.value) {
            alert('Pseudo déja utilisé choisissez en un autre')
          }
        })
        usersEmail.map((userEmail) => {
          if (userEmail.email === e.target.value) {
            alert('Email déja utilisé avec un autre pseudo vous ne pouvez pas l\'utiliser')
          }
        })
    }

  return (
    <div className='login-form-input'>
        <label>{label}</label>
        <input 
            {...inputProps}
            onChange={onChange}
            onBlur={handleFocused}
            onFocus={() =>inputProps.name === "confirmePassword" && setFocused(true)}
            focused={focused.toString()}
        />
        <span>{errorMessage}</span>
    </div>
  )
}

export default SignupFormInput
