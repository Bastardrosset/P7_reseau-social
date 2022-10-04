import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { followUser, unFollowUser } from '../../actions/user.actions';
import { isEmpty } from '../Utils';

const FollowHandler = ({ idToFollow, idToUnFollow, type }) => {
    const userData = useSelector((state) => state.userReducer);
    const [isFollowed, setIsFollowed] = useState(false);
    const dispatch = useDispatch();


    const handleFollow = () => {
        dispatch(followUser(userData._id, idToFollow));
        setIsFollowed(true);
    }

    const handleUnfollow = () => {
        dispatch(unFollowUser(userData._id), idToUnFollow);
        setIsFollowed(false);
    }

//Permet d'afficher si isFollowed est sur true ou false
    useEffect(() => {
        if (!isEmpty(userData.following)){
            if (userData.following.includes(idToFollow)) {
                setIsFollowed(true);
            } else setIsFollowed(false);
        }
    }, [userData, idToFollow])


  return (
    <>
    {isFollowed && !isEmpty(userData) && (
      <span onClick={handleUnfollow}>
        {type === "suggestion" && <button className='btn-unfollow'>Abonné</button>}
        {type === "card" && <i class="far fa-check-circle"></i>}
      </span>
      )}
      {isFollowed === false && !isEmpty(userData) &&  (
        <span onClick={handleFollow}>
            {type === "suggestion" && <button className='btn-follow'>Suivre</button>}
            {type === "card" && <i class="far fa-check-circle"></i>}
        </span>
      )}
    </>
  )
}

export default FollowHandler;

