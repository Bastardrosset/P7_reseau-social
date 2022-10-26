import React from 'react'
import { useState } from 'react'

const LoginFormInput = (props) => {
    const [focused, setFocused] = useState(false);
    const {label, errorMessage, onChange, id, ...inputProps} = props;

    const handleFocused = (e) => {
        setFocused(true)
    }
    
  return (
    <div className='form-input'>
        <label>{label}</label>
        <input {...inputProps} 
            onChange={onChange} 
            onBlur={handleFocused}
            onFocus={() => inputProps.name === "password" && setFocused(true)}
            focused={focused.toString()}
        />
        <span>{errorMessage}</span>
    </div>
  )
}

export default LoginFormInput