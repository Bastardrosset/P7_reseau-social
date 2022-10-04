import React, { useContext } from 'react';
import Log from '../components/Log';// Liaison vers de dossier log & index qui contient les logiques de connection et d'enregistrement dans les fichiers signup & login
import { UidContext } from '../components/AppContext';
import UpdateProfil from '../components/Profil/UpdateProfil'

// Sémantique page profil
const Profil = () => {
  const uid = useContext(UidContext);

  return (
    <div className='profil-page'>
      {uid ? (
        <UpdateProfil />
      ) : (
      <div className='log-container'>
        <Log login={false} signup={true}/>
        <div className='img-container'>
          <h2>Le reseau du groupe</h2>
          <img src='/img/Computador.svg' alt="Illustration d'un pc et de la planète terre"/>
        </div>
      </div>
      )}
    </div>
  )
}

export default Profil
