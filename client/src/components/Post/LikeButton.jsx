import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react'
import { UidContext } from '../AppContext'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import { useDispatch } from 'react-redux';
import { likePost, unlikePost } from '../../actions/post.actions';

const LikeButton = ({post}) => {

const [liked, setLiked] = useState(false);
const uid = useContext(UidContext);
const dispatch = useDispatch();

const like = () => {
    dispatch(likePost(post._id, uid))
    setLiked(true);
}
const unlike = () => {
    dispatch(unlikePost(post._id, uid))
    setLiked(false);
}

useEffect(() => {
    if (post.likers.includes(uid)) {setLiked(true)
    } else {setLiked(false)}
}, [uid, post.likers, liked]) 

  return (
    <div className='like-container'>
        {uid === null &&
        <Popup 
            trigger={<i className="fas fa-thumbs-up"></i>}
            position={['bottom center', 'bottom right', 'bottom left']}
            closeOnDocumentClick>
            <div>Connectez-vous pour liker ce post</div>
        </Popup>
        }
        {uid && liked === false && (
            <i className="fas fa-thumbs-up" onClick={like}></i>
        )}
        {uid && liked && (
            <i className="fas fa-thumbs-up likeBlue" onClick={unlike}></i>
        )}
        <span>{post.likers.length}</span>
    </div>
  )
}

export default LikeButton