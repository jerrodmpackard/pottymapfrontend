'use client'

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createAccount, getLoggedInUserData, login } from "@/utils/DataServices";
import { IToken } from "@/Interfaces/Interfaces";
import { IUserInfo } from "@/Interfaces/Interfaces";
import { Checkbox, FormControl, FormControlLabel, IconButton, InputAdornment, Stack, TextField, Button, Snackbar, Alert} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import mapboxgl from 'mapbox-gl';


//By default next js components our server side (Server side components cannot have useStates in them)
//'use client' turns the component into client component.

//The page.tsx inside of our app is our default home page.

//This will be our Login page and our create Account page.

export default function Home() {

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cpassword, setCPassword] = useState<string>("");

  const [userNameError, setUserNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorTwo, setPasswordErrorTwo] = useState(false);
  const [cpasswordError, setCPasswordError] = useState(false);

  const [switchBool, setSwitchBool] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleTwo, setVisibleTwo] = useState<boolean>(false)
  const [marked, setMarked] = useState<boolean>(false);

  const[isLoading, setIsLoading] = useState<boolean>(false);
  const[successful, setSuccessful] = useState<boolean>(false);

  // const usernameErrorMessage = "Username length must be at least 4 characters";
  // const passwordErrorMessage = "Password length must be at least 4 characters";
  // const cpasswordErrorMessage = "Passwords do not match";

  const [userErrMess, setUserErrMess]  = useState<string>("");
  const [passErrMess, setPassErrMess]  = useState<string>("");
  const [cpassErrMess, setCPassErrMess]  = useState<string>("");

  const router = useRouter();
  
  const handleSubmit = async () => {
    
    if (switchBool) {

      if (username === '') {
        setUserNameError(true);
        // setUserErrMess("Username length must be at least 4 characters")
      } else {
        setUserNameError(false);
        // setUserErrMess("")
      }
      
      if (password === '') {
        setPasswordError(true)
        // setPassErrMess("Password length must be at least 4 characters")
      } else {
        setUserNameError(false);
        // setPassErrMess("")

      }
      
      if (cpassword === '') {
        setCPasswordError(true)
        // setCPassErrMess("Passwords do not match")
      } else {
        setUserNameError(false);
        // setCPassErrMess("")
      }
      
      console.log(password)
      
      if (password === cpassword) {
        
        let userData: IUserInfo = {
          Username: username,
          Password: password,
          ID: 0
        }
        
        console.log(userData)
        await createAccount(userData);
        setSwitchBool(false)
        setSuccessful(true)

        setUsername('')
        setPassword('')
        setCPassword('')
        setCPasswordError(false)

      } else {
        setCPasswordError(true)
        // alert("Login Failed - Passwords do not match")
      }
      
    } else {

      if (username == '') {
        setUserNameError(true);
      } else {
        setUserNameError(false);
      }
      
      if (password == '') {
        setPasswordError(true)
      } else {
        setUserNameError(false);
      }
      
      if (username && password) {
        
        console.log(`username is ${username} and pass is ${password}`)
        
        let userData: IUserInfo = {
          Username: username,
          Password: password,
          ID: 0
        }
        
        let token: IToken = await login(userData);
        
        console.log(token);
        
        if (token.token != null) {
          localStorage.setItem("Token", token.token)
          getLoggedInUserData(username);
          router.push('/Pages/MapView');
        } else {
          alert("Login Failed - Please ensure you are entering your credentials correctly.");
        }
      }
    }
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setSuccessful(false);
  };
  
  const handleEyeClick = () => {
    setVisible(!visible)
  }

  const handleEyeClickTwo = () => {
    setVisibleTwo(!visibleTwo)
  }

  const handleSwitch = () => {
    setSwitchBool(!switchBool)
  }

  const handleGuest = () => {
    router.push('/Pages/GuestView');
  }

  const handleChangePass = () => {
    router.push('/Pages/ResetPass')
  }


  const mapContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? '';
    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      zoom: 1.8,
      center: [-60, 15],
      interactive: false
    });


    map.scrollZoom.disable();

    map.on('style.load', () => {
      // map.setFog({}); // Set the default atmosphere style
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
    <main className='min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center'>
      <section className="hidden lg:grid w-full min-h-screen mx-auto py-8 px-8 bg-gray-800 bg-opacity-90 rounded-tr-3xl">
        <div className="loginMapHeight" ref={mapContainerRef}></div>
        {/* <div>
            <h2 className="text-center text-red-600 text-3xl font-semibold">|* Warning * Warning * Warning * Warn |</h2>
            <h2 className="text-center text-white text-3xl font-semibold">PottyMap Potty Mouth not Included</h2>
          </div> */}
      </section>

      <section className="w-full grid justify-center px-4">

        <div className="bg-white drop-shadow-xl border-2 mt-20 py-10 px-10 w-full sm:rounded-3xl sm:my-auto rounded-tr-3xl rounded-tl-3xl rounded-br-none rounded-bl-none mx-none md:mx-auto max-w-lg ">
          <h1 className="text-center text-4xl text-[#1283C8] mt-5">Welcome to Potty Map</h1>
          <p className="flex justify-center text-[24px] text-black mt-4">{switchBool ? 'Create an account' : 'Find bathrooms near you'}</p>

          {switchBool ? (
            <div className="mt-8 flex justify-center" >
              <FormControl>
                <TextField 
                  required
                  autoComplete="off"
                  id="username"
                  name="name"
                  label="Username"
                  value={username}
                  variant="outlined"
                  error={userNameError}
                  // helperText={userNameError ? userErrMess : ""}
                  inputProps={{ minLength: 4 }}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <TextField className="mt-2"
                  required
                  autoComplete="off"
                  id="password"
                  label="Password"
                  name="password"
                  value={password}
                  type={visible ? "text" : "password"}
                  variant="outlined"
                  error={passwordError}
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
                />

                <TextField className="my-2"
                  required
                  autoComplete="off"
                  id="cpassword"
                  label="Confirm Password"
                  name="cpassword"
                  value={cpassword}
                  type={visibleTwo ? "text" : "password"}
                  variant="outlined"
                  error={cpasswordError}
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

                />

                <Button className="mt-4" variant="contained" color="secondary" onClick={handleSubmit}>Create Account</Button>

                <Stack direction="row" className="mt-10 justify-center items-center">
                  <h1>Already have an account?</h1>
                  <Button variant="text" color="primary" className="underline" onClick={handleSwitch}>
                    Sign in
                  </Button>
                </Stack>
              </FormControl>
            </div>

          ) : (

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
                  error={userNameError}
                  helperText={userNameError}
                  inputProps={{ minLength: 4 }}
                  onChange={(e) => setUsername(e.target.value)}
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
                  error={passwordError || passwordErrorTwo}
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
                />

                <Stack direction="row" className="mt-2">
                  <FormControlLabel control={<Checkbox />} label="Remember Me" />
                  <Button className="ml-auto" onClick={handleChangePass}>Forgot Password</Button>
                </Stack>

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

                <Stack direction="row" className="mt-5 justify-center items-center">
                  <h1>Are you new?</h1>
                  <Button variant="text" color="info" className="underline" onClick={handleSwitch}>
                    Create an Account
                  </Button>
                </Stack>
              </FormControl>
            </div>
          )}
        </div>
      </section>
      <Snackbar open={successful} autoHideDuration={3500} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Account Created
        </Alert>
      </Snackbar>

      <Snackbar />
    </main>
  )
}
