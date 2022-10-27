import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addPost, getPosts } from '../../actions/post.actions';
import { isEmpty } from '../Utils';

const NewPostForm = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [postPicture, setPostPicture] = useState(null);
  const [file, setFile] = useState();
  const userData = useSelector((state) => state.userReducer)
  const dispatch = useDispatch();

  const handlePicture = (e) => {
    setPostPicture((e.target.files[0]))
  }

  const handlePost = async (data) => {
    if (message || postPicture) {
      const data = new FormData();
      data.append('data', JSON.stringify({
        posterId: userData._id,
        message: message
      }))

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
    setFile('');
  }


  useEffect(() => {
    if (!isEmpty(userData)){
      setIsLoading(false);
  
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData, message, file])


  return (
    <React.StrictMode>
      <div className="post-container">
        {isLoading ? (
          <i className='fas fa-spinner fa-pulse'></i>
        ) : (
          <>
          <NavLink exact='true' to="/profil" >
          <div className="user-info">
            <img src={
                userData.picture ?
                userData.picture :
                '/img/noAvatar.png'}  
                alt='user avatar' />
          </div>
          </NavLink>
          <div className="post-form">
            <textarea 
              name='message'
              id='message'
              placeholder={'Quoi de neuf ' + userData.pseudo + '?'}
              onChange={(e) => setMessage(e.target.value)}
              value={message} />
              {message || postPicture ? (
                <li className='card-container'>
                  <div className="card-left">
                    <img src={userData.picture} alt='Avatar utilisateur' />
                  </div>
                  <div className="card-right">
                    <div className="card-header">
                      <div className="pseudo">
                        <h3>{userData.pseudo}</h3>
                      </div>
                    </div>
                    <div className="content">
                      <p>{message}</p>
                      <img src={postPicture} alt='Sujet du post'/>
                    </div>
                  </div>
                </li>
              ) : null}
            <div className="footer-form">
              <div className='icon'>
                  <i className="far fa-image"></i>
                  <input type="file" id="file-upload" name="file" accept="jpg, png, jpeg" onChange={(e) => handlePicture(e)}/>
              </div>
              <div className="btn-send">
                {message || postPicture ? (
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
