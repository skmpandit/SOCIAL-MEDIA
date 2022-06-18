import { Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { resetPassword } from '../../Actions/User';
import './ResetPassword.css'

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");

    const { error, message, loading } = useSelector((state) => state.like);

    const dispatch = useDispatch();
    const params = useParams();
    const alert = useAlert();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(resetPassword(params.token,newPassword));
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
    <div className='resetPassword'> 
        <form className='resetPasswordForm' onSubmit={submitHandler}>
            <Typography variant='h3' style={{ padding: "2vmax" }} >Social App</Typography>
            <input type="password" placeholder='New Password' required value={newPassword} className="resetPasswordInputs" onChange={(e) => setNewPassword(e.target.value)} />
            <Link to='/'>
                <Typography>Login</Typography>
            </Link>
            <Typography>Or</Typography>
            <Link to='/forgot/password'>
                <Typography>Request Another Token!</Typography>
            </Link>
            <Button type="submit" disabled={loading}>
                Reset Password
            </Button>
        </form>
    </div>
  )
}

export default ResetPassword