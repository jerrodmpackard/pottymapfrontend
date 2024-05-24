import React, { useState } from 'react'
import { IToken, IUserInfo } from "@/Interfaces/Interfaces";
import { createAccount, getLoggedInUserData, login } from "@/utils/DataServices";
import { useRouter } from 'next/navigation';


const useAuth = () => {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [cpassword, setCPassword] = useState<string>("");

    const [userNameError, setUserNameError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [cpasswordError, setCPasswordError] = useState<string>("");

    const [switchBool, setSwitchBool] = useState<boolean>(false);
    const [successfulAccount, setSuccessfulAccount] = useState<boolean>(false);
    const [successfulLogin, setSuccessfulLogin] = useState<boolean>(false);

    const router = useRouter();

    // validation for inputs
    const validateInputs = () => {
        let valid = true;

        if (username === '') {
            setUserNameError('Username is required')
            valid = false;
        } else if (username.length < 4) {
            setUserNameError('Username must bet at least 4 characters long ')
            valid = false;
        } else {
            setUserNameError('')
        }

        if (password === '') {
            setPasswordError('Password is required')
            valid = false;
        } else if (password.length < 4) {
            setPasswordError('Password must bet at least 4 characters long ')
            valid = false;
        } else {
            setPasswordError('')
        }

        if (switchBool) {
            if (cpassword === '') {
                setCPasswordError('Confirm password is required')
                valid = false;
            } else if (cpassword !== password) {
                setCPasswordError('Passwords do not match')
                valid = false;
            } else {
                setCPasswordError('')
            }
        }

        return valid;
    }


    const handleSubmit = async () => {

        if (!validateInputs()) return;

        try {

            if (switchBool) {

                const userData: IUserInfo = {
                    Username: username,
                    Password: password,
                    ID: 0
                }

                await createAccount(userData);
                setSwitchBool(false);
                setSuccessfulAccount(true);
                resetFields();

            } else {

                const userData: IUserInfo = {
                    Username: username,
                    Password: password,
                    ID: 0
                }

                const token: IToken = await login(userData);

                if (token.token) {

                    localStorage.setItem("Token", token.token)
                    const loginData = await getLoggedInUserData(username);
                    localStorage.setItem("Username", JSON.stringify(loginData));

                    setSuccessfulLogin(true);
                    setTimeout(() => router.push('/Pages/MapView'), 1000);

                } else {
                    setPasswordError('Incorrect username or password');
                }
            }

        } catch (error: any) {
            handleErrors(error.message)
        }
    }

    const handleErrors = (errorMessage: string) => {

        if (errorMessage.includes('Username not found')) {
            setUserNameError('Username not found')
        } else if (errorMessage.includes('Incorrect password')) {
            setPasswordError('Incorrect password')
        } else if (errorMessage.includes('Username already exists')) {
            setUserNameError('Username already exists')
        } else {
            alert(errorMessage)
        }

    }

    const resetFields = () => {
        setUsername('');
        setPassword('');
        setCPassword('');
        setUserNameError('');
        setPasswordError('');
        setCPasswordError('');
    }


    return {
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
    }
}

export default useAuth