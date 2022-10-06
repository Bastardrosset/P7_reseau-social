import React, { useState } from 'react'; // useState est un hook, fonction qui permet de se connecter aux fonctionnalités de React
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

const Log = ( props ) => { // props importe les propriétées données dans Profil.js soit <Log login={false} signup={true}/>
    const [signUpModal, setSignUpModal] = useState(props.signup); //signUpModal "variable d'état" avec une valeur initiale, setSignUpModal fonction pour définir la valeur de cette variable d'état. Le composant est passé d'un état a null ou son état lui est restitué
    const [loginModal, setLoginModal] = useState(props.login);

    const handleModals = (e) => { // function anonyme, recupère l'évenement (e) clické
        if (e.target.id === "auth") { // if, soit setLoginModal soit setSignUpModal, Toogle
            setLoginModal(false); 
            setSignUpModal(true);
        } else if (e.target.id === "login") {
            setSignUpModal(false);
            setLoginModal(true);
        }
    }

  return (
    <React.StrictMode>
        <div className='connection-form'>
            <div className='form-container'>
                <ul>
                    <li onClick={handleModals} // onClick button s'inscrire lance la function handlModals, verifie id auth pour s'inscrire
                        id="auth" className={signUpModal ? 'active-btn' : null}>S'inscrire
                    </li>
                    <li onClick={handleModals} // button se connecter lance la function handlModals, verifie id login pour se connecter
                        id="login" className={loginModal ? 'active-btn' : null}>Se connecter
                    </li>
                </ul>
                {signUpModal && <SignUpForm />} 
                {loginModal && <LoginForm />}
            </div>
        </div>
    </React.StrictMode>
  )
}
//si signUpModal alors affiche onpage le component SignUpForm
//si loginModal alors affiche onpage le component LoginForm
export default Log
