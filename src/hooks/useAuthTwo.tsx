import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { ForgotPassword } from '@/utils/DataServices';

const useAuthTwo = () => {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [cpassword, setCPassword] = useState<string>("");

    const [userNameError, setUserNameError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [cpasswordError, setCPasswordError] = useState<string>("");

    const [switchBool, setSwitchBool] = useState<boolean>(false);
    const [usernameExists, setUsernameExists] = useState<boolean>(false);
    const [successfulChangePassword, setSuccessfulChangePassword] = useState<boolean>(false);
    const router = useRouter();

    const validateUsername = () => {
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
        return valid;
    }

    const validateInputs = () => {

        let valid = true;

        if (switchBool) {
            if (password === '') {
                setPasswordError('Password is required')
                valid = false;
            } else if (password.length < 4) {
                setPasswordError('Password must bet at least 4 characters long ')
                valid = false;
            } else {
                setPasswordError('')
            }

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

    const handleContinueClick = () => {

        if (!validateUsername()) return;

        try {
            setSwitchBool(true);
        } catch (error: any) {
            handleErrors(error.message)
        }
    }


    const handleSubmitTwo = async () => {

        if (!validateInputs()) return;

        try {

            await ForgotPassword(username, password).then(data => {
                if (data) {

                    setSuccessfulChangePassword(true);

                    setTimeout(() => {
                        router.push('/');
                        resetFields()
                        setSwitchBool(false);
                    }, 1000);
                }
            });

        } catch (error: any) {
            handleErrors(error.message)
        }
    }

    const handleErrors = (errorMessage: string) => {
        if (errorMessage.includes('Username not found')) {
            setUserNameError('Username not found')
        } else if (errorMessage.includes('Password already exists')) {
            setPasswordError('Password already in use')
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
        successfulChangePassword,
        setSuccessfulChangePassword,
        handleContinueClick,
        handleSubmitTwo,
    }
}

export default useAuthTwo
