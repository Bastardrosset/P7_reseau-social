import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react'
import {UidContext} from '../AppContext';


const EditDeleteComment = ({ comment, postId}) => {
    const [isAuthor, setIsAuthor] = useState(false);
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState('');
    const uid = useContext(UidContext);

    const handleEdit = () => {

    }

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
        {isAuthor && edit === false && (
            <span onClick={() => setEdit(!edit)}>
                <i class="far fa-edit"></i>
            </span>
        )}
        {isAuthor && edit && (
            <form action='' onSubmit={handleEdit} className='edit-comment-form'>
                <label for='text' onClick={() => setEdit(!edit)}>Editer</label>
            </form>        
            )}
    </div>
  )
}

export default EditDeleteComment