import React, { useState } from 'react'

import { Alert, Button, FormControl, IconButton, InputAdornment, Snackbar, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import useAuthTwo from '@/hooks/useAuthTwo';


const ChangePass = () => {

  const {
    username,
    setUsername,
    password,
    setPassword,
    cpassword,
    setCPassword,
    userNameError,
    passwordError,
    cpasswordError,
    switchBool,
    handleContinueClick,
    successfulChangePassword,
    setSuccessfulChangePassword,
    handleSubmitTwo,

  } = useAuthTwo();


  const handleKeydown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSubmitTwo();
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessfulChangePassword(false)
  }

  const [visible, setVisible] = useState<boolean>(false);
  const [visibleTwo, setVisibleTwo] = useState<boolean>(false);

  const handleEyeClick = () => { setVisible(!visible) }

  const handleEyeClickTwo = () => { setVisibleTwo(!visibleTwo) }


  return (
    <section className='min-h-screen grid items-center justify-center'>
      <div className="bg-white drop-shadow-xl border-2 mt-20 py-10 px-10 w-full sm:rounded-3xl sm:my-auto rounded-tr-3xl rounded-tl-3xl rounded-br-none rounded-bl-none mx-none md:mx-auto max-w-lg ">
        <h1 className="text-center text-4xl text-[#1283C8] mt-5">Change Password</h1>
        <p className="flex justify-center text-[24px] text-black mt-4">{switchBool ? "Enter new password" : "Enter username below"}</p>
        {switchBool ? (
          <div className="mt-8 flex justify-center">

            <FormControl>
              <TextField
                required
                autoComplete="off"
                id="password"
                label="New Password"
                name="password"
                size="small"
                value={password}
                type={visible ? "text" : "password"}
                variant="outlined"
                error={!!passwordError}
                helperText={passwordError}
                inputProps={{ minLength: 4 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleEyeClick}>
                        {visible ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeydown}
              />

              <TextField className="mt-4"
                required
                autoComplete="off"
                id="cpassword"
                label="Confirm New Password"
                name="cpassword"
                size="small"
                value={cpassword}
                type={visibleTwo ? "text" : "password"}
                variant="outlined"
                error={!!cpasswordError}
                helperText={cpasswordError}
                inputProps={{ minLength: 4 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleEyeClickTwo}>
                        {visibleTwo ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                onChange={(e) => setCPassword(e.target.value)}
                onKeyDown={handleKeydown}
                />
              <Button variant="contained" className='mt-8' onClick={handleSubmitTwo}>
                Change
              </Button>
            </FormControl>

          </div>
        ) : (
          <div className="mt-8 flex justify-center">
            <FormControl>
              <TextField
                required
                autoComplete="off"
                id="username"
                name="name"
                label="Username"
                size="small"
                value={username}
                variant="outlined"
                error={!!userNameError}
                helperText={userNameError}
                inputProps={{ minLength: 4 }}
                onChange={(e) => setUsername(e.target.value)}
              />

              <Button variant="contained" className='mt-8' onClick={handleContinueClick}>Continue</Button>
            </FormControl>
          </div>
        )
        }
      </div>

      <Snackbar open={successfulChangePassword} autoHideDuration={3500} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Your password has been changed successfully. You will now be redirected to the login page.
        </Alert>
      </Snackbar>

    </section>
  )
}

export default ChangePass
