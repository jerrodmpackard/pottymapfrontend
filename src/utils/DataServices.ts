import { IUserItems, IToken, IUserData, IUserInfo } from "@/Interfaces/Interfaces"


const url = "pottymap.database.windows.net"

let userData: IUserData


export const createAccount = async (createdUser: IUserInfo) => {
    //we are using this fetch to make a POST Requst
    //We have to set the method to POST
    //we set the content type to application/ json to specifiy our json data format

    const res = await fetch(url + '/User/AddUser', {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body:JSON.stringify(createdUser)
    });
    //we need to check if the post was succesful

    if(!res.ok){
        const message = "An error has occured " + res.status;
        throw new Error(message);
    }

    const data = await res.json();
    console.log(data);
}

// Post Login
export const login = async (loginUser: IUserInfo) => {
    const res = await fetch( url + "/User/Login", {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body:JSON.stringify(loginUser)
    });

    if(!res.ok){
        const message = "An Error has occured " + res.status;
        throw new Error(message);
    }

    const data: IToken = await res.json();
    return data;

}

// Dont Know
export const getLoggedInUserData = async (username: string) => {
    const res = await fetch(url + '/User/GetUserByUsername/' + username);
    const data = await res.json();
    userData = data;
}

export const loggedinData = () => {
    return userData;
}

//This function helps to see if our user is logged in
export const checkToken = () => {
    let result = false;

    let lsData = localStorage.getItem("Token");

    if(lsData !=null){
        result = true
    }
    return result
}


// Dashboard Fetches

// Dont Know
export const getUserItemsByUserId = async (userId: number) => {
    const res = await fetch(url + '/User' + userId);
    const data = await res.json();
    return data;
}

export const addUser = async (Users: IUserItems) => {
    const res = await fetch( url + '/User/AddUser', {
        method: "POST",
        headers:{
            'Content-Type': "application/json"
        },
        body:JSON.stringify(Users)
    });

    if(!res.ok){
        const message = "An Error has Occured " + res.status;
        throw new Error(message);
    }
    //Returns a boolean value depending on whether or not we added a Users item succusfully
    const data = await res.json();
    return data;
}

export const updateUser = async (Users: IUserItems) => {
    const res = await fetch( url + '/User/UpdateUser/{id}/{username}', {
        method: "PUT",
        headers:{
            'Content-Type': "application/json"
        },
        body:JSON.stringify(Users)
    });

    if(!res.ok){
        const message = "An Error has Occured " + res.status;
        throw new Error(message);
    }
    //Returns a boolean value depending on whether or not we added a Users item succesfully
    const data = await res.json();
    return data;
}

export const getAllUserItems = async () => {
    const res = await fetch(url + '/Login/GetAllUserItems');
    const data = await res.json();
    return data;
}