'use client'

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import logo from "../app/favicon.ico"
import mapboxgl from 'mapbox-gl';

import {
  Visibility,
  VisibilityOff
} from "@mui/icons-material";

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Button,
  Snackbar,
  Alert
} from "@mui/material";


//By default next js components our server side (Server side components cannot have useStates in them)
//'use client' turns the component into client component.

//The page.tsx inside of our app is our default home page.

//This will be our Login page and our create Account page.

export default function Home() {

  const router = useRouter();

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
    setSwitchBool,
    successfulAccount,
    setSuccessfulAccount,
    successfulLogin,
    setSuccessfulLogin,
    handleSubmit,

  } = useAuth()

  const handleKeydown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSubmit();
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessfulAccount(false);
  };

  const handleCloseTwo = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessfulLogin(false);
  };

  const [visible, setVisible] = useState(false)
  const [visibleTwo, setVisibleTwo] = useState(false)

  const handleEyeClick = () => { setVisible(!visible) }

  const handleEyeClickTwo = () => { setVisibleTwo(!visibleTwo) }

  const handleSwitch = () => { setSwitchBool(!switchBool) }

  const handleGuest = () => { router.push('/Pages/GuestView') }

  const handleChangePass = () => { router.push('/Pages/ResetPass') }

  const mapContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? '';
    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      zoom: 1.8,
      center: [-60, 15],
      interactive: false,
      attributionControl: false
    });

    function spinGlobe() {
      const zoom = map.getZoom();

      let distancePerSecond = 2;

      const center = map.getCenter();
      center.lng -= distancePerSecond;
      // Smoothly animate the map over one second.
      // When this animation is complete, it calls a 'moveend' event.
      map.easeTo({ center, duration: 1000, easing: (n) => n });

    }

    // When animation is complete, start spinning if there is no ongoing interaction
    map.on('moveend', () => {
      spinGlobe();
    });

    spinGlobe();

  }, [])



  return (
    <main className='min-h-screen grid items-center justify-center ipadPro:p-4 ipadPro:items-stretch ipadPro:justify-stretch'>
      <section className="grid grid-cols-1 ipadPro:grid-cols-2 m-4 p-4 bg-gradient-to-r from-blue-50 to-slate-50 border-2 border-[#b9dee6] rounded-3xl">
        <section className="hidden ipadPro:grid ">
          <div ref={mapContainerRef} className="loginMapHeight border-2 border-[#b9dee6]"></div>
        </section>

        <div className="grid items-center justify-center ipadPro:hidden">
          <Image src={logo} alt="logo" width={100} height={100} className="aspect-square" />
        </div>
        <section className="grid items-center">

          {switchBool ? (
            <div>
              <h2 className="loginHeader">Welcome to Potty Map</h2>
              <p className="loginSubHeader mt-4">Create an Account</p>
              <div className="mt-8 flex justify-center" >
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
                    onKeyDown={handleKeydown}
                  />

                  <TextField className="mt-4"
                    required
                    autoComplete="off"
                    id="password"
                    label="Password"
                    name="password"
                    size="small"
                    value={password}
                    type={visible ? "text" : "password"}
                    variant="outlined"
                    error={!!passwordError} // the `!!` is used to convert a value to a boolean in JS, the more you know lol
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
                    label="Confirm Password"
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

                  <Button className="mt-4" variant="contained" color="secondary" onClick={handleSubmit}>Create Account</Button>

                  <div className="mt-10 flex-group">
                    <h1>Already have an account?</h1>
                    <Button variant="text" color="primary" className="underline" onClick={handleSwitch}>
                      Sign in
                    </Button>
                  </div>
                </FormControl>
              </div>
            </div>

          ) : (
            <div>
              <h2 className="loginHeader">Welcome to Potty Map</h2>
              <h3 className="loginSubHeader mt-4">Find bathrooms near you</h3>
              <div className="mt-8 flex justify-center">
                <FormControl>

                  <TextField className=""
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
                    onKeyDown={handleKeydown}
                  />

                  <TextField className="mt-4"
                    required
                    autoComplete="off"
                    id="password"
                    label="Password"
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

                  <div className="mt-2 flex-group">
                    <FormControlLabel control={<Checkbox />} label="Remember Me" />
                    <Button onClick={handleChangePass}>Forgot Password?</Button>
                  </div>

                  <Button variant="contained" className="mt-8" type="submit" onClick={handleSubmit}>
                    Sign in
                  </Button>

                  <Stack direction="row" className="mt-8 flex justify-center items-center">
                    <div className="flex-grow border-t border-gray-400"></div>
                    <h1 className="mx-2">Or</h1>
                    <div className="flex-grow border-t border-gray-400"></div>
                  </Stack>

                  <Button variant="outlined" className="mt-8" onClick={handleGuest}>
                    Continue as Guest
                  </Button>
                  {/* <Button variant="outlined" color="secondary" className="mt-6" >
                    Moderator?
                  </Button> */}

                  <div className="mt-5 flex-group">
                    <h1 className=" ">Are you new?</h1>
                    <Button variant="text" color="info" className="underline" onClick={handleSwitch}>
                      Create an Account
                    </Button>
                  </div>
                </FormControl>
              </div>
            </div>
          )}
        </section>
      </section>

      <Snackbar open={successfulAccount} autoHideDuration={3500} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Account Created
        </Alert>
      </Snackbar>

      <Snackbar open={successfulLogin} autoHideDuration={3500} onClose={handleCloseTwo} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert
          onClose={handleCloseTwo}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Login Successful. You will now be redirected to the map page.
        </Alert>
      </Snackbar>

    </main>
  )
}
