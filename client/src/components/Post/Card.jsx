import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { dateParser, isEmpty } from '../Utils';
import FollowHandler from '../Profil/FollowHandler';
import { getPosts } from '../../actions/post.actions';


const Card = ({ post }) => {// prop post de Thread
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);
    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer)
    const dispatch = useDispatch();

    const updatePost = () => {
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
                      .map((data) => {
                        console.log(data)
                        console.log(usersData)
                      if (data._id === post.posterId) {
                        return data.picture
                      } 
                      else {
                        return null
                      }
                    })
                  .join(' ')
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
                    {post.posterId !== userData._id && (
                      <FollowHandler idToFollow={post.posterId} type={"card"} />)}
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
                        <button className='btn' onClick={updatePost}>
                          Valider modification
                        </button>
                      </div>
                    </div>
                  )}

                  {post.picture && (
                    <img src={'http://localhost:5000' + post.picture} alt="Photo du post" className='card-picture' />
                  )}
                  {post.video && (
                    <iframe
                      title={post._id}  
                      width="500"
                      height="300"
                      src={post.video}
                      frameBorder="0"
                      fallow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen>
                    </iframe>
                  )}
                  {userData._id === post.posterId && (
                    <div className="button-container">
                      <div onClick={() => setIsUpdated(!isUpdated)}>
                      <i class="far fa-edit"></i>
                      </div>
                    </div>
                  )}
                  <div className="card-footer">
                    <div className="comment-icon">
                      <i class="far fa-comment"></i>
                      <span>{post.comments.length}</span>
                    </div>
                    <h6>Like Button</h6>
                    <i class="far fa-thumbs-up"></i>
                  </div>
              </div>
              </>
          )}
      </li>
    </React.StrictMode>
  )
}

export default Card
