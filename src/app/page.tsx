'use client'

import { useState } from "react";
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { useRouter } from "next/navigation";
import { createAccount, getLoggedInUserData, login } from "@/utils/DataServices";
import { IToken } from "@/Interfaces/Interfaces";
import { IUserInfo } from "@/Interfaces/Interfaces";

//By default next js components our server side (Server side components cannot have useStates in them)
//'use client' turns the component into client component.

//The page.tsx inside of our app is our default home page.

//This will be our Login page and our create Account page.


export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [switchBool, setSwitchBool] = useState<boolean>(false);

  const router = useRouter();

  //function for Toggling between our login and Create Account screen
  const handleSwitch = () => {
    setSwitchBool(!switchBool);
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

  return (
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
            <Button color='light' className="underline text-black bg-white">Continue as guest</Button>
          </div>
          <div>
            <a href="#" className="flex justify-center underline text-black">Have a moderator code?</a>
          </div>
        </form>
      </div>

    </div>

    </div>
  );
}
