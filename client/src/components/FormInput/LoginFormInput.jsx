import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux';

const LoginFormInput = (props) => {
    const [focused, setFocused] = useState(false);
    const {label, errorMessage, errorMailMessage, onChange, id, ...inputProps} = props;
    const usersEmail = useSelector((state) => state.usersReducer);

    const handleFocused = (e) => {
        usersEmail.map((userEmail) => {
          // if (userEmail.email !== e.target.value){
          //   console.log("error")
          // }  else {
          //  return errorMessage
          // }
        })
    }
    
  return (
    <div className='form-input'>
        <label>{label}</label>
        <input {...inputProps} 
            onChange={onChange} 
            onBlur={handleFocused}
            onFocus={() => inputProps.name === "email" && setFocused(true)}
            focused={focused.toString()}
        />
        <span>{errorMessage}</span>
    </div>
  )
}

export default LoginFormInput