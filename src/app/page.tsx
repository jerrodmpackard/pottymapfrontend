'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createAccount, getLoggedInUserData, login } from "@/utils/DataServices";
import { IToken } from "@/Interfaces/Interfaces";
import { IUserInfo } from "@/Interfaces/Interfaces";
import { Checkbox, FormControl, FormControlLabel, IconButton, InputAdornment, Stack, TextField, Button } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { TextInput } from "flowbite-react";

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
  const [cpasswordError, setCPasswordError] = useState(false);

  const [switchBool, setSwitchBool] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleTwo, setVisibleTwo] = useState<boolean>(false)
  const [marked, setMarked] = useState<boolean>(false);

  const router = useRouter();

  const handleEyeClick = () => {
    setVisible(!visible)
  }

  const handleEyeClickTwo = () => {
    setVisibleTwo(!visibleTwo)
  }

  const usernameErrorMessage= "Username length must be at least 4 characters";
  const passwordErrorMessage = "Password length must be at least 4 characters";
  const cpasswordErrorMessage = "Passwords do not match";

  const handleSubmit = async () => {

    if(switchBool){

      if(username == ''){
        setUserNameError(true);
      }else{
        setUserNameError(false);
      }
  
      if(password == ''){
        setPasswordError(true)
      } else {
        setUserNameError(false);
      }
  
      if(cpassword == ''){
        setCPasswordError(true)
      } else {
        setUserNameError(false);
      }
  
      console.log(password)
  
      if(password === cpassword) {
        
        let userData: IUserInfo = {
          Username: username,
          Password: password,
          ID: 0
        }
    
        let token: IToken = await login(userData);
    
        console.log(userData)
        await createAccount(userData);
        setSwitchBool(false)
        setCPasswordError(false)
       
      } else {
        setCPasswordError(true)
        alert("Login Failed")
      }

    } else {
      if(username == ''){
        setUserNameError(true);
      }else{
        setUserNameError(false);
      }
  
      if(password == ''){
        setPasswordError(true)
      } else {
        setUserNameError(false);
      }
  
      if(username && password){
  
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
          alert("Login Failed");
        }
      }
    }
  }


  const handleSwitch = () => {
    setSwitchBool(!switchBool)
  }
  
  const handleGuest = () => {
    // router.push('/Pages/TestPage');
    router.push('/Pages/MapView');
  }


  return (
    <main className='min-h-screen flex items-center'>
        <section className="hidden lg:flex w-full min-h-screen justify-center items-center bg-gray-800 bg-opacity-90 rounded-tr-3xl">
          <div>
            <div className="rounded-2xl bg-slate-500 h-full py-11 px-11 text-center">
                Image goes here
            </div>
            <h1 className="text-white z-10">Pottymap where everything is shits and giggles</h1>
          </div>
        </section>

        <section className="w-full flex">  
         
          <div className="bg-white drop-shadow-xl border-2 py-10 px-10 w-full sm:rounded-3xl rounded-tr-3xl rounded-tl-3xl rounded-br-none rounded-bl-none mx-none md:mx-auto max-w-lg">
            <h1 className="flex justify-center text-4xl text-[#1283C8] mt-5">Welcome to PottyMap</h1>
            <p className="flex justify-center text-[24px] text-black mt-4">{switchBool ? 'Create an account' : 'Find bathrooms near you'}</p>
             
              {switchBool ? (
                  <div className="xl:mx-10 lg:mx-8 md:mx-5 sm:mx-2" >
                    <FormControl className="w-full mt-8">
                      <TextField className="py-2" 
                      required
                      id="username"
                      name="name"
                      label="Username"
                      value={username}
                      variant="outlined"
                      error={userNameError} 
                      inputProps={{minLength:4}}
                      onChange={(e) => setUsername(e.target.value)}
                    />

                    <TextField className="py-2 mt-2"
                      required 
                      id="password"
                      label="Password"
                      name="password"
                      value={password}
                      type={visible ? "text" : "password"} 
                      variant="outlined"
                      error={passwordError}
                      inputProps={{minLength:4}}
                      InputProps={{
                        endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleEyeClick}>
                            {visible ? <Visibility />: <VisibilityOff/> }
                          </IconButton>
                        </InputAdornment>
                        )
                      }}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <TextField className="py-2 mt-2"
                      required
                      id="cpassword"
                      label="Confirm Password"
                      name="cpassword"
                      value={cpassword}
                      type={visible ? "text" : "password"} 
                      variant="outlined"
                      error={cpasswordError}
                      inputProps={{minLength:4}}
                      InputProps={{
                        endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleEyeClickTwo}>
                            {visibleTwo ? <Visibility />: <VisibilityOff/> }
                          </IconButton>
                        </InputAdornment>
                        )
                      }}
                      onChange={(e) => setCPassword(e.target.value)}
                     
                    /> 

                      <Button variant="contained" color="secondary" onClick={handleSubmit}>Create</Button>

                      <Stack direction="row" className="mt-10 justify-center items-center">
                        <h1>Already have an account?</h1>
                        <Button variant="text" color="primary" className="underline" onClick={handleSwitch}>
                          Sign in
                        </Button>
                      </Stack>
                    </FormControl>
                  </div>

                ) : (
                
                <div className="xl:mx-10 lg:mx-8 md:mx-5 sm:mx-2">
                  <FormControl className="w-full mt-8">
                    
                    <TextField className="py-2" 
                      required
                      id="username"
                      name="name"
                      label="Username"
                      value={username}
                      variant="outlined"
                      error={userNameError} 
                      helperText={userNameError}
                      inputProps={{minLength:4}}
                      onChange={(e) => setUsername(e.target.value)}
                    />

                    <TextField className="py-2 mt-2"
                      required 
                      id="password"
                      label="Password"
                      name="password"
                      value={password}
                      type={visible ? "text" : "password"} 
                      variant="outlined"
                      error={passwordError}
                      inputProps={{minLength:4}}
                      InputProps={{
                        endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleEyeClick}>
                            {visible ? <Visibility />: <VisibilityOff/> }
                          </IconButton>
                        </InputAdornment>
                        )
                      }}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <Stack direction="row" className="mt-2">
                      <FormControlLabel control={<Checkbox />} label="Remember Me"  />
                      <Button  className="ml-auto">Forgot Password</Button>
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

                    <Stack direction="row" className="mt-10 justify-center items-center">    
                      <h1>Are you new?</h1>
                      <Button variant="text" color="secondary" className="underline" onClick={handleSwitch}>
                        Create an Acount
                      </Button>
                    </Stack>
                  </FormControl>
                </div>
              )}
            
          </div>
        </section>
    </main>
  )
}
