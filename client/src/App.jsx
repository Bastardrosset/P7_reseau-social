import React, { useEffect, useState } from 'react';
import { UidContext } from './components/AppContext';// check les valeurs user authentification
import Routes from './components/Routes';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getUser } from './actions/user.actions';


const App = () => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();
  // console.log('uid', uid)

  useEffect(() => {
    let userFromLS = localStorage.getItem('user');
    if (userFromLS) {
      setUid(JSON.parse(userFromLS)._id);
      if (uid) {
        dispatch(getUser(uid));
      }
    }
    
    

  }, [uid, dispatch]);//[] relance uid a chaque changement sur useEffect

  return (
      <UidContext.Provider value={uid}>
        <Routes />
      </UidContext.Provider>
  )
}

export default App

