
import React, { useState } from 'react'

const SignupFormInput = (props) => {
    const [focused, setFocused] = useState(false);
    const {label, errorMessage, onChange, id, ...inputProps} = props;

    const handleFocused = (e) => {
        setFocused(true)
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
