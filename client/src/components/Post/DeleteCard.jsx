import React from 'react'
import { useDispatch } from 'react-redux'
import { deletePost } from '../../actions/post.actions'


const DeleteCard = (props) => {

    const dispatch = useDispatch();

    const deletecard = () => {
        dispatch(deletePost(props.id));
    }
  return (
    <div
        onClick={() => {
            if (window.confirm("Voulez vous supprimer ce post ?")) {
                window.location.reload()
                deletecard()
                // window.location.reload();
            }
        }}
    >
        <i class="fas fa-trash-alt"></i>
    </div>
  )
}

export default DeleteCard