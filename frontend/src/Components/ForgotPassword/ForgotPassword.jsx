import { Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../Actions/User';
import './ForgotPassword.css'

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const { error , message, loading } = useSelector((state) => state.like);

    const dispatch = useDispatch();
    const alert = useAlert();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(email));
    }

    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch({
                type: "clearError",
            });
        }
        if(message) {
            alert.success(message);
            dispatch({
                type: "clearMessage",
            })
        }
    },[error, message, dispatch, alert])
  return (
    <div className='forgotPassword'> 
        <form className='forgotPasswordForm' onSubmit={submitHandler}>
            <Typography variant='h3' style={{ padding: "2vmax" }} >Social App</Typography>
            <input type="email" placeholder='Email' required value={email} className="forgotPasswordInputs" onChange={(e) => setEmail(e.target.value)} />
            <Button type="submit" disabled={loading}>
                Send Token
            </Button>
        </form>
    </div>
  )
}

export default ForgotPassword