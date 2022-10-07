import React, { useState } from 'react'
import LeftNav from '../LeftNav'
import { useDispatch, useSelector } from 'react-redux'
import UploadImg from './UploadImg'
import { updateBio } from '../../actions/user.actions'
import { dateParser } from '../Utils'
import FollowHandler from './FollowHandler'

const UpdateProfil = () => {
  const [bio, setBio] = useState('');
  const [updateForm, setUpdateForm] = useState(false);
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();
  const [followingPopup, setFollowingPopup] = useState(false);
  const [followersPopup, setFollowersPopup] = useState(false)

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
              <img src={userData.picture} alt='user avatar' />
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
            <h5 onClick={() => setFollowingPopup(true)}>Abonnements : {userData.following ? userData.following.length : ""}</h5>
            <h5 onClick={() => setFollowersPopup(true)}>Abonnés : {userData.followers ? userData.followers.length : ""}</h5>
          </div>
        </div>
        {followingPopup && (
          <div className='popup-profil-container'>
            <div className='modal'>
              <div className='title-modal'>
                <h3>Abonnements</h3>
                <span className='cross' onClick={() => setFollowingPopup(false)}>&#10005;</span>
              </div>
              <div className='modal-users-following'>
                <ul>
                  {usersData.map((user) => {
                    for (let i = 0; i < userData.following.length; i++) {
                      if (user._id === userData.following[i]) {
                        return (
                          <li key={user._id}>
                            <img src={user.picture} alt="Avatar de l'utilisateur qui nous suit" />
                            <h4>{user.pseudo}</h4>
                            <div className='follow-btn'>
                              <FollowHandler idToFollow={user._id} type={"suggestion"} className="checked"/>
                            </div>
                          </li>
                        )
                      } else {
                        return null
                      }
                    }
                  })}
                </ul>
              </div>
            </div>
          </div>
        )}
        {followersPopup && (
          <div className='popup-profil-container'>
            <div className='modal'>
              <div className='title-modal'>
                <h3>Abonnés</h3>
                <span className='cross' onClick={() => setFollowersPopup(false)}>&#10005;</span>
              </div>
              <div className='modal-users-followers'>
                <ul>
                  {usersData.map((user) => {
                    for (let i = 0; i < userData.followers.length; i++) {
                      if (user._id === userData.followers[i]) {
                        return (
                          <li key={user._id}>
                            <img src={user.picture} alt="Avatar de l'utilisateur que l'on veux suivre" />
                            <h4>{user.pseudo}</h4>
                            <div className='follow-btn'>
                              <FollowHandler idToFollow={user._id} type={"suggestion"} className="check"/>
                            </div>
                          </li>
                        )
                      } else { 
                        return null
                      }
                    }
                  })}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </React.StrictMode>
  );
}

export default UpdateProfil
