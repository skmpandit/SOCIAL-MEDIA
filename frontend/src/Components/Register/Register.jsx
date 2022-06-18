import React, { useEffect } from 'react'
import './Register.css'
import { Avatar, Button, Typography } from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser, registerUser } from '../../Actions/User'
import { useAlert } from 'react-alert'

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState("");

    const { loading , error } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const alert = useAlert();

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        const Reader = new FileReader();
        Reader.readAsDataURL(file);

        Reader.onload = () => {
            if (Reader.readyState === 2) {
                setAvatar(Reader.result);
            }
        }
    }

    const submitHandler = async(e) => {
        e.preventDefault();
        await dispatch(registerUser(avatar,name,email,password));
        dispatch(loadUser());
        window.location.reload();
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch({
                type: "clearErrors",
            })
        }
    },[dispatch, error, alert]);

  return (
    <div className='register'>
        <form className='registerForm' onSubmit={submitHandler}>
            <Typography variant='h3' style={{ padding: "2vmax"}}>Social App</Typography>
            <Avatar src={avatar} alt='User' sx={{ height: "10vmax", width: "10vmax"}} />
            <input type="file" accept='image/*' onChange={handleImageChange} />
            <input type="text" value={name} placeholder="Name" className='registerInputs' onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder='Email' className='registerInputs' required value={email} onChange={(e) => setEmail(e.target.value)}  />
            <input type="password" placeholder='Password' className='registerInputs' required value={password} onChange={(e) => setPassword(e.target.value)} />
            <Link to='/'>
                <Typography>Already Signed Up? Login Now</Typography>
            </Link>
            <Button disabled={loading} type='submit'>Sign Up</Button>
        </form>
    </div>
  )
}

export default Register