import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addPost, getPosts } from '../../actions/post.actions';
import { isEmpty } from '../Utils';

const NewPostForm = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [postPicture, setPostPicture] = useState(null);
  const [video, setVideo] = useState('');
  const [file, setFile] = useState();
  const userData = useSelector((state) => state.userReducer)
  const dispatch = useDispatch();

  const handlePicture = (e) => {
    setPostPicture((e.target.files[0]))
  }

  const handlePost = async (data) => {
    if (message || postPicture) {
      const data = new FormData();
      data.append("data", JSON.stringify ({
        posterId : userData._id,
        message: message
      }
      ))
      data.append('file', postPicture);
      

        await dispatch(addPost(data));
        dispatch(getPosts());
        cancelPost();
    } else {
      alert('Veuillez créer un message !')
    }
  }

  const cancelPost = () => {
    setMessage('');
    setPostPicture('');
    setVideo('');
    setFile('');
  }


  useEffect(() => {
    if (!isEmpty(userData)){
      setIsLoading(false);
  
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData, message, video])


  return (
    <React.StrictMode>
      <div className="post-container">
        {isLoading ? (
          <i className='fas fa-spinner fa-pulse'></i>
        ) : (
          <>
          <div className="data">
            <p>
              <span>{userData.following ? userData.following.length : 0}</span>{' '}
              Abonnement{userData.following && userData.following.length > 1 ? "s" : null}
            </p>
            <p>
              <span>{userData.followers ? userData.followers.length : 0}</span>{' '}
              Abonné{userData.followers && userData.followers.length > 1 ? "s" : null}
            </p>
          </div>
          <NavLink exact to="/profil" >
          <div className="user-info">
            <img src={'http://localhost:5000' + userData.picture} alt="Avatar user"/>
          </div>
          </NavLink>
          <div className="post-form">
            <textarea 
              name='message'
              id='message'
              placeholder='Quoi de neuf ?'
              onChange={(e) => setMessage(e.target.value)}
              value={message} />
              {message || postPicture || video.length > 20 ? (
                <li className='card-container'>
                  <div className="card-left">
                    <img src={'http://localhost:5000' + userData.picture} alt='Avatar utilisateur' />
                  </div>
                  <div className="card-right">
                    <div className="card-header">
                      <div className="pseudo">
                        <h3>{userData.pseudo}</h3>
                      </div>
                    </div>
                    <div className="content">
                      <p>{message}</p>
                      <img src={postPicture} alt=''/>
                      {video && (
                        <iframe
                          src={video}
                          frameBorder="0"
                          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                          allowFullScreen
                          title={video}>
                        </iframe>
                      )}
                    </div>
                  </div>
                </li>
              ) : null}
            <div className="footer-form">
              <div className='icon'>
                {isEmpty(video) && (
                  <>
                    <i class="far fa-image"></i>
                    <input type="file" id="file-upload" name="file" accept="jpg, png, jpeg" onChange={(e) => handlePicture(e)}/>
                  </>
                )}
                {video && (
                  <button onClick={() => setVideo('')}>Supprimer vidéo</button>
                )}
              </div>
              <div className="btn-send">
                {message || postPicture || video.length > 20 ? (
                <button className='cancel' onClick={cancelPost}>Annuler message</button>) : null}
                <button className='send' onClick={handlePost}>Envoyer</button>
              </div>
            </div>
          </div>
          </>
        )}
      </div>
    </React.StrictMode>
  )
}

export default NewPostForm
