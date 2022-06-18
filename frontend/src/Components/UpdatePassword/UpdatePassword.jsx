import { Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword } from '../../Actions/User';
import './UpdatePassword.css'

const UpdatePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const { loading, error, message } = useSelector((state) => state.like);

    const dispatch = useDispatch();
    const alert = useAlert();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updatePassword(oldPassword,newPassword));
    }

    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch({
                type: "clearErrors",
            });
        }
        if(message) {
            alert.success(message);
            dispatch({
                type: "clearMessage",
            })
        }
    },[error, dispatch, message, alert]);
  return (
    <div className='updatePassword'> 
        <form className='updatePasswordForm' onSubmit={submitHandler}>
            <Typography variant='h3' style={{ padding: '2vmax' }}>Social App</Typography>
            <input type="password" placeholder='Old Password' required value={oldPassword} className="updatePasswordInputs" onChange={(e) => setOldPassword(e.target.value)} />
            <input type="password" placeholder='New Password' required value={newPassword} className="updatePasswordInputs" onChange={(e) => setNewPassword(e.target.value)} />
            <Button type='submit' disabled={loading}>Change Password</Button>
        </form>
    </div>
  )
}

export default UpdatePassword
