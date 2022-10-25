import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment, editComment } from '../../actions/post.actions';
import {UidContext} from '../AppContext';


const EditDeleteComment = ({ comment, postId}) => {
    const [isAuthor, setIsAuthor] = useState(false);
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState('');
    const userData = useSelector((state) => state.userReducer);
    const uid = useContext(UidContext);
    const dispatch = useDispatch();

    const handleEdit = (e) => {
        e.preventDefault();

        if (text) {
            dispatch(editComment(postId, comment._id, text));
            setText('');
            setEdit(false);
        }
    };

    const handleDelete = () => dispatch (deleteComment(postId, comment._id))

    useEffect(() => {
        const checkAuthor = () => {
            if (uid ===comment.commenterId) {
                setIsAuthor(true);
            }
        }
        checkAuthor();
    }, [uid, comment.commenterId])

  return (
    <div className='edit-comment'>
        {((isAuthor && edit === false) || (userData.isAdmin && edit === false)) && (
            <span onClick={() => setEdit(!edit)}>
                <i className="far fa-edit"></i>
            </span>
        )}
        {(isAuthor || userData.isAdmin) && edit && (
            <form action='' onSubmit={handleEdit} className='edit-comment-form'>
                <label htmlFor='text' onClick={() => setEdit(!edit)}>Editer</label>
                <br/>
                <input 
                    type="text" 
                    name="text" 
                    onChange={(e) => setText(e.target.value)}
                    defaultValue={comment.text}
                    />
                <br/>
                <div className='edit-delete-comment-form'>
                <input 
                    type="submit" 
                    value="Valider modification"
                    />
                    
                <span onClick={() => {
                    if (window.confirm("Voulez vous supprimer se commentaire ?")) {
                        handleDelete()
                    }}
                    }>
                    <i className="fas fa-trash-alt"></i>
                </span>
                </div>
            </form>        
            )}
    </div>
  )
}

export default EditDeleteComment