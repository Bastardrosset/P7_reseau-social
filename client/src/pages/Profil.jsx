import React, { useContext } from 'react';
import Auth from '../components/Auth';// Liaison vers de dossier log & index qui contient les logiques de connection et d'enregistrement dans les fichiers signup & login
import { UidContext } from '../components/AppContext';
import UpdateProfil from '../components/Profil/UpdateProfil'

// Sémantique page profil
const Profil = () => {
  const uid = useContext(UidContext);
  console.log('uid', uid)

  return (
    <div className='profil-page'>
      {uid ? (<>
        {console.log('uid', uid)}
      
        <UpdateProfil />
      </>
      ) : (
      <div className='log-container'>
        
        {console.log('uid', uid)}

        <Auth login={false} signup={true}/>
        <div className='log-container-title'>
          <h2>Le reseau du groupe</h2>
          <span className="log-desc">Connect with friend and the world around you on Groupomania.</span>
        </div>
      </div>
      )}
    </div>
  )
}

export default Profil
