import React, { useEffect, useState } from 'react'
import './UpdateProfile.css'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, Button, Typography } from '@mui/material';
import { useAlert } from 'react-alert';
import { loadUser, updateProfile } from '../../Actions/User';
import Loader from '../Loader/Loader';

const UpdateProfile = () => {

    const { loading , error , user } = useSelector((state) => state.user);
    const { loading: updateLoading, error: updateError, message } = useSelector((state) => state.like);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [avatarPrev, setAvatarPrev] = useState(user.avatar.url);
    const [avatar, setAvatar] = useState("");

    const dispatch = useDispatch();
    const alert = useAlert();

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        const Reader = new FileReader();
        Reader.readAsDataURL(file);

        Reader.onload = () => {
            if (Reader.readyState === 2) {
                setAvatarPrev(Reader.result);
                setAvatar(Reader.result);
            }
        }
    }

    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch({
                type: "clearErrors",
            })
        }
        if(updateError) {
            alert.error(updateError);
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
    }, [error, dispatch, updateError, message, alert]);

    const submitHandler = async (e) => {
        e.preventDefault();
        await dispatch(updateProfile(avatar, name, email));
        dispatch(loadUser());
    }

  return (
    loading ? <Loader/> : (
        <div className='updateProfile'>
            <form className='updateProfileForm' onSubmit={submitHandler}>
                <Typography variant='h3' style={{ padding: "2vmax"}}>Social App</Typography>
                <Avatar src={avatarPrev} alt='User' sx={{ height: "10vmax", width: "10vmax"}} />
                <input type="file" accept='image/*' onChange={handleImageChange} />
                <input type="text" value={name} placeholder="Name" className='updateProfileInputs' onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder='Email' className='updateProfileInputs' required value={email} onChange={(e) => setEmail(e.target.value)}  />
                <Button disabled={updateLoading} type='submit'>Update</Button>
            </form>
        </div>
    )
  )
}

export default UpdateProfile