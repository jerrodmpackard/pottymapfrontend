'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createAccount, getLoggedInUserData, login } from "@/utils/DataServices";
import { IToken } from "@/Interfaces/Interfaces";
import { IUserInfo } from "@/Interfaces/Interfaces";
import { Checkbox, FormControl, FormControlLabel, IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Label, TextInput, Button } from "flowbite-react";

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

  // const handleEyeClick = () => {
  //   setVisible(!visible)
  // }

  // const handleEyeClickTwo = () => {
  //   setVisibleTwo(!visibleTwo)
  // }

  // const usernameErrorMessage= "Username length must be at least 4 characters";
  // const passwordErrorMessage = "Password length must be at least 4 characters";
  // const cpasswordErrorMessage = "Passwords do not match";

  // const handleCreateAccountSubmit = async () => {
   
  //   if(username == ''){
  //     setUserNameError(true);
  //   }else{
  //     setUserNameError(false);
  //   }

  //   if(password == ''){
  //     setPasswordError(true)
  //   } else {
  //     setUserNameError(false);
  //   }

  //   if(cpassword == ''){
  //     setCPasswordError(true)
  //   } else {
  //     setUserNameError(false);
  //   }

  //   let userData: IUserInfo = {
  //     Username: username,
  //     Password: password,
  //     ID: 0
  //   }

  //   let token: IToken = await login(userData);

  //   if(password === cpassword){
  //     console.log(userData)
  //     await createAccount(userData);
  //     localStorage.setItem("Token", token.token)
  //     getLoggedInUserData(username);
  //     router.push('/Pages/MapView');
  //     setCPasswordError(false)
  //   } else {
  //     setCPasswordError(true)
  //   }
  // }

  // const handleLognInSubmit = async() => {

  //   if(username == ''){
  //     setUserNameError(true);
  //   }else{
  //     setUserNameError(false);
  //   }

  //   if(password == ''){
  //     setPasswordError(true)
  //   } else {
  //     setUserNameError(false);
  //   }
    
  //   let userData: IUserInfo = {
  //     Username: username,
  //     Password: password,
  //     ID: 0
  //   }
    
  //   console.log(`username is ${username} and pass is ${password}`)
  //   let token: IToken = await login(userData);
  
  //   console.log(token);
  
    
  //   if (token.token != null) {
  //     localStorage.setItem("Token", token.token)
  //     getLoggedInUserData(username);
  //     router.push('/Pages/MapView');
  //   } else {
  //     alert("Login Failed");
  //   }
    
  // }
  const handleSwitch = () => {
    setSwitchBool(!switchBool)
  }

  const handleSubmit = async () => {
    //Putting our user data inside of an object so we can put it in our Post fetch
    let userData: IUserInfo = {
      Username: username,
      Password: password,
      ID: 0
    }

    if (switchBool) {
      //Create account logic in here
      console.log(userData)
      await createAccount(userData);

    } else {
      //Login logic in here

      let token: IToken = await login(userData);

      console.log(token);

      //Check to see if logged in
      if (token.token != null) {
        localStorage.setItem("Token", token.token)
        getLoggedInUserData(username);
        router.push('/Pages/MapView');
      } else {
        alert("Login Failed");
      }
    }
  }
  
  const handleGuest = () => {
    router.push('/Pages/TestPage');
  }


  return (
    // <main className='min-h-screen flex items-center'>
    //     <section className="hidden lg:grid w-full min-h-screen justify-center items-center bg-gray-200 bg-opacity-90">
    //       <div>
              
    //       </div>
    //       <h1>Pottymap where everything is shits and giggles</h1>
    //     </section>

    //     <section className="w-full flex">  
    //       {/* card */}
    //       <div className="bg-white drop-shadow-xl border-2 py-10 px-10 w-full sm:rounded-3xl rounded-tr-3xl rounded-tl-3xl rounded-br-none rounded-bl-none mx-none md:mx-auto max-w-lg">
    //         <h1 className="flex justify-center text-4xl text-[#1283C8] mt-5">Welcome to PottyMap</h1>
    //         <p className="flex justify-center text-[24px] text-black mt-4">{switchBool ? 'Create an account' : 'Find bathrooms near you'}</p>
    //         <form className="xl:mx-10 lg:mx-8 md:mx-5 sm:mx-2" autoComplete="off"> 
    //           {switchBool ? (
    //                 <FormControl className="w-full mt-8">
    //                   <TextField className="py-2" 
    //                   required
    //                   label="Username"
    //                   id="username"
    //                   name="username"
    //                   value={username}
    //                   variant="outlined"
    //                   error={userNameError} 
    //                   helperText={usernameErrorMessage}
    //                   inputProps={{minLength:4}}
    //                   onChange={(e) => setUsername(e.target.value)}
    //                 />

    //                 <TextField className="py-2 mt-2"
    //                   required 
    //                   label="Password"
    //                   id="password"
    //                   name="password"
    //                   value={password}
    //                   type={visible ? "text" : "password"} 
    //                   variant="outlined"
    //                   helperText={passwordErrorMessage}
    //                   inputProps={{minLength:4}}
    //                   InputProps={{
    //                     endAdornment: (
    //                     <InputAdornment position="end">
    //                       <IconButton onClick={handleEyeClick}>
    //                         {visible ? <Visibility />: <VisibilityOff/> }
    //                       </IconButton>
    //                     </InputAdornment>
    //                     )
    //                   }}
    //                   onChange={(e) => setPassword(e.target.value)}
    //                 />

    //                 <TextField className="py-2 mt-2"
    //                   required
    //                   label="Confirm Password"
    //                   id="cpassword"
    //                   name="cpassword"
    //                   value={cpassword}
    //                   type={visible ? "text" : "password"} 
    //                   variant="outlined"
    //                   helperText={cpasswordErrorMessage}
    //                   inputProps={{minLength:4}}
    //                   InputProps={{
    //                     endAdornment: (
    //                     <InputAdornment position="end">
    //                       <IconButton onClick={handleEyeClickTwo}>
    //                         {visibleTwo ? <Visibility />: <VisibilityOff/> }
    //                       </IconButton>
    //                     </InputAdornment>
    //                     )
    //                   }}
    //                   onChange={(e) => setCPassword(e.target.value)}
    //                   error={cpasswordError ? true : false}
    //                 />

    //                 <Button variant="contained" color="secondary" type="submit" onClick={handleCreateAccountSubmit}>Create</Button>

    //                 <Stack direction="row" className="mt-10 justify-center items-center">
    //                   <h1>Already have an account?</h1>
    //                   <Button variant="text" color="primary" className="underline" onClick={() => setSwitchBool(false) }>
    //                     Sign in
    //                   </Button>
    //                 </Stack>
    //               </FormControl>

    //             ) : (

    //             <FormControl className="w-full mt-8">
                  
    //               <TextField className="py-2" 
    //                 required
    //                 id="username"
    //                 name="name"
    //                 label="Username"
    //                 value={username}
    //                 variant="outlined"
    //                 error={userNameError} 
    //                 helperText={userNameError}
    //                 inputProps={{minLength:4}}
    //                 onChange={(e) => setUsername(e.target.value)}
    //               />

    //               <TextField className="py-2 mt-2"
    //                 required 
    //                 id="password"
    //                 label="Password"
    //                 name="password"
    //                 value={password}
    //                 type={visible ? "text" : "password"} 
    //                 variant="outlined"
    //                 inputProps={{minLength:4}}
    //                 InputProps={{
    //                   endAdornment: (
    //                   <InputAdornment position="end">
    //                     <IconButton onClick={handleEyeClick}>
    //                       {visible ? <Visibility />: <VisibilityOff/> }
    //                     </IconButton>
    //                   </InputAdornment>
    //                   )
    //                 }}
    //                 onChange={(e) => setPassword(e.target.value)}
    //               />

    //               <Stack direction="row" className="mt-2">
    //                 <FormControlLabel control={<Checkbox />} label="Remember Me"  />
    //                 <Button  className="ml-auto">Forgot Password</Button>
    //               </Stack>
                  
    //               <Button variant="contained" className="mt-8" type="submit" onClick={handleLognInSubmit}>
    //                 Sign in
    //               </Button>
                  
    //               <Stack direction="row" className="mt-8 flex justify-center items-center">
    //                 <div className="flex-grow border-t border-gray-400"></div>
    //                 <h1 className="mx-2">Or</h1>
    //                 <div className="flex-grow border-t border-gray-400"></div>
    //               </Stack>

    //               <Button variant="outlined" className="mt-8" onClick={handleGuest}>
    //                 Continue as Guest
    //               </Button>

    //               <Stack direction="row" className="mt-10 justify-center items-center">    
    //                 <h1>Are you new?</h1>
    //                 <Button variant="text" color="secondary" className="underline" onClick={() => setSwitchBool(true) }>
    //                   Create an Acount
    //                 </Button>
    //               </Stack>
    //             </FormControl>
    //           )}
    //         </form>
    //       </div>
    //     </section>
    // </main>
    <div className="h-screen flex items-center justify-center">
    <div className="grid grid-flow-row justify-center backdrop-blur-lg align-middle">
      <div className="bg bg-white drop-shadow-xl bg-opacity-80 min-w-96 p-8 rounded-2xl grid grid-flow-row justify-center  align-middle">
        <h1 className="text-[48px] flex justify-center text-[#1283C8]">Potty Map</h1>
        <h1 className="flex justify-center text-[24px] text-black mt-4">{switchBool ? 'Create an account' : 'Find bathrooms near you'}</h1>
        <form className="flex max-w-md flex-col gap-4">
          <div className="grid grid-flow-row justify-center">
            <div className="mb-2 block mt-5">
              <Label htmlFor="username" value="Username" className="text-black" />
            </div>
            <TextInput id="username" type="text" placeholder="Enter your username" className="text-black w-[240px]" required onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="grid grid-flow-row justify-center">
            <div className="mb-2 block mt-2">
              <Label htmlFor="password1" value="Password" className="text-black" />
            </div>
            <TextInput id="password1" type="password" placeholder="Enter your password" className="text-black w-[240px]" required onChange={(e) => setPassword(e.target.value)} />
            <p className="text-black underline mt-5">Forgot Password?</p>
          </div>
          <div className="flex justify-center">
            <Button color='light' className="mt-2 mb-2 text-white bg-[#1283C8] hover:bg-[#1283C8]  w-[240px]" onClick={handleSubmit}>Submit</Button>
          </div>
          <div className="grid grid-flow-col-dense">
            <Button color="light" className="underline text-black border-none" onClick={handleSwitch}>{switchBool ? 'Login' : 'Sign up'}</Button>
            <Button color='light' className="underline text-black bg-white" onClick={handleGuest}>Continue as guest</Button>
          </div>
          <div>
            <a href="#" className="flex justify-center underline text-black">Have a moderator code?</a>
          </div>
        </form>
      </div>

    </div>
    </div>
  )
}
