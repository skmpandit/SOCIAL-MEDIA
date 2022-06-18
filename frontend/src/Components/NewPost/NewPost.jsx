import { Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createNewPost } from '../../Actions/Post';
import { useAlert } from 'react-alert';
import './NewPost.css'
import { loadUser } from '../../Actions/User';
// import { useHistory } from 'react-router-dom'; 

const NewPost = () => {
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState("");

    const { loading, error, message } = useSelector((state) => state.like);

    const dispatch = useDispatch();
    const alert = useAlert()
    // const history = useHistory();

    // const trigerFunction = () => history.push('/account');
    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const Reader = new FileReader();
        Reader.readAsDataURL(file);
        Reader.onload = () => {
            if(Reader.readyState === 2) {
                setImage(Reader.result);
            }
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        await dispatch(createNewPost(image,caption));
        dispatch(loadUser());
        // trigerFunction();
    }

    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch({
                type: "clearErrors",
            })
        }
        if(message) {
            alert.success(message);
            dispatch({
                type: "clearMessage",
            })
        }
    },[error, message, dispatch, alert]);
  return (
    <div className='newPost'>
        <form className='newPostForm' onSubmit={submitHandler} >
            <Typography variant='h3'>New Post</Typography>
            {
                image && <img src={image} alt="post"/>
            }
            <input type="file" accept='image/*' onChange={handleImageChange} />
            <input type="text" placeholder='Caption...' value={caption} onChange={(e) => setCaption(e.target.value)} />
            <Button disabled={loading} type="submit">Post</Button>
        </form>
    </div>
  )
}

export default NewPost