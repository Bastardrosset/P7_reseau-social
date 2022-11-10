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
    const fetchToken = async () => {
      await axios ({// Hook qui stock l'ID user
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
      .then((res) => {
        setUid(res.data);
      })
      .catch((error) => console.log("No token"));
    }
    fetchToken();
      if (uid) {
        console.log('uid', uid);
        dispatch(getUser(uid));
      };

  }, [uid, dispatch]);//[] relance uid a chaque changement sur useEffect

  return (
      <UidContext.Provider value={uid}>
        <Routes />
      </UidContext.Provider>
  )
}

export default App

