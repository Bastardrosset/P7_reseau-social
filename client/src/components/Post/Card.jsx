import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { dateParser, isEmpty } from '../Utils';
import { updatePost } from '../../actions/post.actions';
import CardComments from './CardComments';
import DeleteCard from './DeleteCard'
import LikeButton from './LikeButton';

const Card = ({ post }) => {// prop post de Thread

    const [isLoading, setIsLoading] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);
    const [showComments, setShowComments] = useState(false);
    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer)
    const dispatch = useDispatch();

    const updateItem = () => {
      if (textUpdate) {
        dispatch(updatePost(post._id, textUpdate))
      }
      setIsUpdated(false)
    }

    useEffect(() => {
      !isEmpty(usersData[0]) && setIsLoading(false)
    }, [usersData]) 

  return (
    <React.StrictMode>
      <li className='card-container' key={post._id}>
          {isLoading ? (
              <i className='fas fa-spinner fa-spin'></i>
          ) : (
              <>
              <div className='card-img-user'>
                <img src= {
                  !isEmpty(usersData[0]) &&
                      usersData
                      .map((user) => {
                      if (user._id === post.posterId) {
                        return user.picture
                      } 
                      else {
                        return null
                      }
                    })
                  .join('')
                }
                alt="Avatar de l'utilisateur" />
              </div>
              <div className='card-post'>
                <div className='card-post-header'>
                  <div className='pseudo'>
                    <h3>
                      {!isEmpty(usersData[0]) && 
                          usersData
                          .map((data) => {
                          if (data._id === post.posterId) {
                            return data.pseudo
                          } else {
                            return null
                          }
                        })
                      }
                    </h3>
                  </div>
                  <span>{dateParser(post.createdAt)}</span>
                </div> 

                  {isUpdated === false && <p>{post.message}</p>}
                  {isUpdated && (
                    <div className="update-post">
                      <textarea 
                        className='update-post-area'
                        defaultValue={post.message}
                        onChange={(e) => setTextUpdate(e.target.value)}
                      />
                      <div className="button-container">
                        <button 
                          className='btn' 
                          onClick={updateItem}>Valider modification
                        </button>
                      </div>
                    </div>
                  )}

                  {post.picture && (
                    <img 
                      src={ post.picture } 
                      alt="Photo du post" 
                      className='card-picture' />
                  )}
                  {(userData._id === post.posterId || userData.isAdmin) && (
                    <div className="button-container">
                      <div onClick={() => setIsUpdated(!isUpdated)}>
                      <i className="far fa-edit"></i>
                      </div>
                      <DeleteCard id={post._id} />
                    </div>
                  )}
                  <div className="card-footer">
                    <div className="comment-icon">
                      <i 
                        className="far fa-comment" 
                        onClick={() => setShowComments(!showComments)}>
                      </i>
                      <span>{post.comments.length}</span>
                    </div>
                    <LikeButton post={post}/>
                  </div>
                  {showComments && <CardComments post={post} />}
              </div>
              </>
          )}
      </li>
    </React.StrictMode>
  )
}

export default Card
