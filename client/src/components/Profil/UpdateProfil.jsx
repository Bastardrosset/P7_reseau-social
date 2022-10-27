import React, { useState } from 'react';
import LeftNav from '../LeftNav';
import { useDispatch, useSelector } from 'react-redux';
import UploadImg from './UploadImg';
import { updateBio } from '../../actions/user.actions';
import { dateParser } from '../Utils';


const UpdateProfil = () => {
  const [bio, setBio] = useState('');
  const [updateForm, setUpdateForm] = useState(false);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updateBio(userData._id, bio));
    setUpdateForm(false);
  } 

  return (
    <React.StrictMode>
      <div className='profil-container'>
        <LeftNav />
        <div className='title-profil-page'>
          <h2> Profil de {userData.pseudo}</h2>
        </div>
        <div className='update-container'>
          <div className='user-picture'>
            <h3>Photo de profil</h3>
              <img src={
                userData.picture ?
                userData.picture :
                '/img/noAvatar.png'}  
                alt='user avatar' />
            <UploadImg />
          </div>
          <div className='biographie-part'>
            <div className='biographie-update'>
              <h3>Biographie</h3>
              {updateForm === false && (
                <>
                  <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
                  <button onClick={() => setUpdateForm(!updateForm)}>Modifier biographie</button>
                </>
              )}
              {updateForm && (
                <>
                  <textarea 
                    type='text' 
                    defaultValue={userData.bio}
                    onChange={(event) => setBio(event.target.value)}
                    ></textarea>
                    <br/>
                    <button onClick={handleUpdate}>Valider modifications</button>
                </>
              )}
            </div>
            <h4>Membre depuis le : {dateParser(userData.createdAt)}</h4>
            </div>
        </div>
      </div>
    </React.StrictMode>
  );
}

export default UpdateProfil
