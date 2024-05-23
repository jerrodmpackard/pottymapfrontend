import { IBathrooms, IToken, IUserData, IUserInfo } from "@/Interfaces/Interfaces"


const url = "https://pottymapwebapi.azurewebsites.net"

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

// Login
export const login = async (loginUser: IUserInfo) => {
    const res = await fetch(url + "/User/Login", {
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

// Forgot Password function
export const ForgotPassword = async (username: string, password: string ) => {
    const res = await fetch(url + "/User/ForgotPassword/" + username + "/" + password, {
        method: 'PUT',
        headers: {
            'Content-Type': "application/json"
        }
    });
    if(!res.ok){
        const message = "An error message has occured " + res.status;
        throw new Error(message);
    }
    const data = await res.json();
    console.log(data);
    return data;
}

// Dont Know
export const getLoggedInUserData = async (username: string) => {
    const res = await fetch(url + '/User/GetUserByUsername/' + username);
    const data: IUserData = await res.json();
    console.log(data);
    return data;
}

// export const loggedinData = () => {
//     return userData;
// }

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

export const addBathroom = async (bathroom: IBathrooms) => {
    const res = await fetch( url + '/Bathroom/AddBathroom', {
        method: "POST",
        headers:{
            'Content-Type': "application/json"
        },
        body:JSON.stringify(bathroom)
    });

    if(!res.ok){
        const message = "An Error has Occured " + res.status;
        throw new Error(message);
    }
    //Returns a boolean value depending on whether or not we added a Users item succusfully
    const data = await res.json();
    return data;
}

export const updateBathroom = async (bathroom: IBathrooms) => {
    const res = await fetch( url + '/Bathroom/UpdateBathroom', {
        method: "PUT",
        headers:{
            'Content-Type': "application/json"
        },
        body:JSON.stringify(bathroom)
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

export const getMapDots = async () => {
    const res = await fetch(url + '/Bathroom/GetAllBathroomsAsGeoJSON');
    const data = await res.json();
    return data;
}

export const getComments = async () => {
    
}