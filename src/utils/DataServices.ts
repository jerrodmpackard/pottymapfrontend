import { IBathrooms, IToken, IUserData, IUserInfo } from "@/Interfaces/Interfaces"


const url = "https://pottymapwebapi.azurewebsites.net"


export const createAccount = async (loginUser: IUserInfo) => {
    //we are using this fetch to make a POST Requst
    //We have to set the method to POST
    //we set the content type to application/ json to specifiy our json data format

    const res = await fetch(url + '/User/AddUser', {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body:JSON.stringify(loginUser)
    });

    if(!res.ok){
        if (res.status === 409){
            throw new Error('Username already exists')
        } else {
            throw new Error(`An error has occured: ${res.status}`)
        }
    }
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
        if (res.status === 401) {
            throw new Error('Incorrect username or password')
        } else {
            throw new Error(`An error has occured: ${res.status}`)
        }
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
        if (res.status === 401) {
            throw new Error('Incorrect username')
        } else if(res.status === 409) {
            throw new Error('Password already exists')
        } else {
            throw new Error(`An error has occured: ${res.status}`)
        }
    }
    const data = await res.json();
    return data;
}


export const getLoggedInUserData = async (username: string) => {
    const res = await fetch(url + '/User/GetUserByUsername/' + username);
    const data: IUserData = await res.json();
    return data;
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