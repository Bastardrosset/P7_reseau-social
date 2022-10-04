import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { uploadPicture } from "../../actions/user.actions"


const UploadImg = () => {
    const [file, setFile] = useState();// stock la photo
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userReducer);

    const handlePicture = (event) => {
        event.preventDefault();
        const data = new FormData();// FormData permet de stocker l'image et les infos liés

        data.append("name", userData.pseudo);
        data.append("userId", userData._id);
        data.append("file", file)

        dispatch(uploadPicture(data, userData._id));
    }

        return (// fomulaire pour telecharger un avatar
            <form action='' onSubmit={handlePicture} className='upload-picture'>
                <label htmlFor='file'>Changer l'avatar</label>
                <input type='file'
                id='file'
                name='file'
                accept='.png, .jpeg, .jpg'
                onChange={(e) => setFile(e.target.files[0])} />
                <br/>
                <input type='submit' value='Envoyer' />
            </form>
        )
}

export default UploadImg
