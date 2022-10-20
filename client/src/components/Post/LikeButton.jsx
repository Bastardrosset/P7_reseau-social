import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react'
import { UidContext } from '../AppContext'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import { useDispatch } from 'react-redux';
import { likePost } from '../../actions/post.actions';

const LikeButton = ({post}) => {

const [liked, setLiked] = useState(false);
const uid = useContext(UidContext);
const dispatch = useDispatch();

const like = () =>{
    dispatch(likePost(post._id, uid))
    setLiked(true)
}
const unlike = () =>{

}

useEffect(() => {
    if (post.likers.includes(uid)){setLiked(true)}
}, [uid, post.likers, liked]) 

  return (
    <div className='like-container'>
        {uid === null &&
        <Popup 
            trigger={<i className="far fa-thumbs-up"></i>}
            position={['bottom center', 'bottom right', 'bottom left']}
            closeOnDocumentClick>
            <div>Connectez-vous pour liker ce post</div>
        </Popup>
        }
        {uid && liked === false && (
            <i className="far fa-thumbs-up likeBlue" onClick={like}></i>
        )}
        {uid && liked && (
            <i className="far fa-thumbs-up" onClick={unlike}></i>
        )}
        
    </div>
  )
}

export default LikeButton