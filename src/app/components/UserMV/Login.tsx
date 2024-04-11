import React, { useEffect, useRef, useState } from 'react'
import { useValue } from '@/context/ContextProvider';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField } from '@mui/material'
import { Close, Send } from '@mui/icons-material';
import PasswordField from './PasswordField';
import GoogleOnTapLogin from './GoogleOnTapLogin';

const Login = () => {

    const {state: {openLogin}, dispatch} = useValue();
    const [title, setTitle] = useState<string>('Login');
    const [isRegistering, setIsRegistering] = useState<boolean>(false);

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    const handleClose = () => {
        dispatch({
            type: 'CLOSE_LOGIN',
            payload: null,
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //testing Loading
        // dispatch({type: 'START_LOADING', payload:null})
        // setTimeout(() => {
        //     dispatch({type: 'END_LOADING', payload:null})
        // }, 6000)

        //testing Notification
        //const password = passwordRef.current.value
        //const confirmPassword = confirmPasswordRef.current.value
        //if(password !== confirmPassword) {
        //  dispatchTwo({type:'UPDATE_ALERT', payload: {open:true, severity:'error', message:'Passwords do not match'}})
        //
    }

    useEffect(() => {
        isRegistering ? setTitle('Creating Account') : setTitle('Login');
    }, [isRegistering])

  return (
    <Dialog
        open={openLogin}
        onClose={handleClose}
    >
        <DialogTitle>
            {title}
            <IconButton
            sx={{
                position:'absolute',
                top:8,
                right:8,
                color:(theme) => theme.palette.grey[500]
            }}
            onClick={handleClose}
            >
                <Close />
            </IconButton>
        </DialogTitle>

        <form onSubmit={handleSubmit}>
            <DialogContent dividers>
                <DialogContentText>
                    Please fill your information in the fields below:
                </DialogContentText>
                {isRegistering && <TextField
                    autoFocus={!isRegistering}
                    margin='normal'
                    variant='outlined'
                    id='name'
                    label='Name'
                    type='text'
                    fullWidth
                    inputRef={nameRef}
                    inputProps={{minLength:2}}
                    required
                />}
                <TextField
                    autoFocus
                    margin='normal'
                    variant='outlined'
                    id='email'
                    label='Email'
                    type='email'
                    fullWidth
                    inputRef={emailRef}
                    required
                />
                <PasswordField passwordRef={passwordRef}/>
                {isRegistering && (
                        <PasswordField passwordRef={confirmPasswordRef} id="confirmpassword" label="Confirm Password" />
                )}
            </DialogContent>
            <DialogActions>
                <Button type='submit' variant='contained' endIcon={<Send />}>
                    Submit
                </Button>
            </DialogActions>
        </form>
        <DialogActions sx={{justifyContent: 'left', p:'5px 24px'}}>
            {isRegistering ? 'Already have an account?' : 'Don\'t have an account?'}
            <Button onClick={() => setIsRegistering(!isRegistering)}>
                {isRegistering ? 'Login': 'Create One'}
            </Button>
        </DialogActions>
        {/* <DialogActions sx={{justifyContent: 'center', py: '24px'}}>
            <GoogleOnTapLogin />
        </DialogActions> */}
    </Dialog>
  )
}

export default Login
