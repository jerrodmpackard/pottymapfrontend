import { IAddFavSpot, IAddFavorite, IBathrooms, IRating, IReport, IToken, IUserData, IUserInfo } from "@/Interfaces/Interfaces"
import { Bathroom } from "@mui/icons-material";


const url = "https://pottymapwebapi.azurewebsites.net"



// *************** USER ENDPOINTS ***************



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



// *************** BATHROOM ENDPOINTS ***************



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



// *************** FAVORITES ENDPOINTS ***************



export const  addFavorites = async (bathroom: IAddFavorite) => {
    const res = await fetch(url + '/FavoriteBathroom/AddFavorite', {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body:JSON.stringify(bathroom)

    });

    if(res.ok){

    } else {

    }

}

export const getFavorites = async (userId: number) => {
    const res = await fetch(url + `/FavoriteBathroom/GetFavoritesByUserID/${userId}`)
    const data = await res.json();
    return data;
}

export const removeFavorites = async (userId: number, bathroomId:number) => {
    const res = await fetch(url + `/FavoriteBathroom/RemoveFavorite/${userId}/${bathroomId}`)
    const data = await res.json();
    return data;
}



// *************** FAVORITE POTTY SPOTS ENDPOINTS ***************



export const addFavoritePottySpot = async (bathroom: IAddFavSpot) => {
    const res = await fetch(url + '/FavoritePottySpot/AddFavoritePottySpot', {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body:JSON.stringify(bathroom)

    });

    if(res.ok){

    } else {

    }
}

export const getFavSpotByUserId = async (userId: number) => {
    const res = await fetch(url + `/FavoritePottySpot/GetFavoritePottySpotsByUserId/${userId}`)
    const data = await res.json();
    return data;
}

export const getPublishedFavSpotsByUserID = async (id: number) => {
    const res = await fetch(url + `FavoritePottySpot/GetFavoritePottySpotsById/${id}`)
    const data = await res.json();
    return data;
}

export const updateFavPottySpot = async (bathroom: IAddFavSpot) => {
    const res = await fetch(url + '/FavoritePottySpot/UpdateFavoritePottySpot', {
        method: "PUT",
        headers: {
            'Content-Type': "application/json"
        },
        body:JSON.stringify(bathroom)

    });

    if(res.ok){

    } else {

    }
    
}

export const removeFavPottySpot = async (bathroom: IAddFavSpot) => {
    const res = await fetch(url + '/FavoritePottySpot/DeleteFavoritePottySpot', {
        method: "DELETE",
        headers: {
            'Content-Type': "application/json"
        },
        body:JSON.stringify(bathroom)

    });

    if(res.ok){

    } else {

    }
}



// *************** RATINGS ENDPOINTS ***************



export const AddRating = async (rating: IRating) => {
    const res = await fetch(url + '/Ratings/AddRating', {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body:JSON.stringify(rating)

    });

    if(res.ok){

    } else {

    }
}


export const GetRatingByBathroomID = async (bathroomId: number) => {
    const res = await fetch(url + `/Ratings/GetAverageRating/${bathroomId}`);
    const data = await res.json();
    // if(!res.ok){
    //     const message = "An Error has Occured " + res.status;
    //     throw new Error(message);
    // }
    return data;
}



// *************** REPORT ENDPOINTS ***************



export const AddNewReport = async (report: IReport) => {
    const res = await fetch(url + '/Report/AddNewReport', {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body:JSON.stringify(report)

    });

    if(res.ok){

    } else {

    }
}


export const GetAllReports = async () => {
    const res = await fetch(url + '/Report/GetAllReports');
    const data = await res.json();
    return data;
}


export const GetUnresolvedReports = async () => {
    const res = await fetch(url + '/Report/GetUnresolvedReports');
    const data = await res.json();
    return data;
}


export const GetReportsByUserID = async (userId: number) => {
    const res = await fetch(url + `/Report/GetReportsByUserId/${userId}`);
    const data = await res.json();
    return data;
}


export const GetReportsByID = async (Id: number) => {
    const res = await fetch(url + `/Report/GetReportsById/${Id}`);
    const data = await res.json();
    return data;
}


export const UpdateReport = async (report: IReport) => {
    const res = await fetch(url + '/Report/UpdateReport', {
        method: "PUT",
        headers: {
            'Content-Type': "application/json"
        },
        body:JSON.stringify(report)

    });

    if(res.ok){

    } else {

    }
}


export const ResolveReport = async (report: IReport) => {
    const res = await fetch(url + '/Report/ResolveReport', {
        method: "DELETE",
        headers: {
            'Content-Type': "application/json"
        },
        body:JSON.stringify(report)

    });

    if(res.ok){

    } else {

    }
}



// *************** COMMENTS ENDPOINTS ***************



export const AddCommentToBathroom = async (bathroomId: number | null, userId: number, comment: string) => {
    const res = await fetch(url + `Comment/AddCommentForPost/${bathroomId}/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    });

    if (!res.ok) {
        const message = 'An error has occured: ' + res.status;
        throw new Error(message);
    }

    const data = await res.text();
    return data;
}


export const AddReplyToComment = async (commentId: number, userId: number, reply: string) => {
    const res = await fetch(url + `Comment/AddReplyForComment/${commentId}/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reply)
    });
    if (!res.ok) {
        const message = 'An error has occured: ' + res.status;
        throw new Error(message);
    }

    const data = await res.text();
    return data;
}


// Get comment by ID
export const GetCommentByID = async (commentId: number)=> {
    const promise = await fetch(url + 'Comment/GetCommentById/' + commentId);
    const data = await promise.json();
    return data;
}


// Get top level comments
export const GetCommentsByBathroomID = async (bathroomId: number) => {
    const promise = await fetch(url + 'Comment/GetPostReplies/' + bathroomId);
    const data = await promise.json();
    return data;
}


// Get replies to comments
export const GetRepliesFromComment = async (commentId: number) => {
    const promise = await fetch(url + 'Comment/GetRepliesFromComment/' + commentId);
    const data = await promise.json();
    return data;
}


// Update comment
export const UpdateComment = async (commentId: number) => {
    const promise = await fetch(url + 'Comment/UpdateReplyFromBathroom/' + commentId);
    const data = await promise.json();
    return data;
}

// Remove comment
export const RemoveComment = async (commentId: number) => {
    const promise = await fetch(url + 'Comment/DeleteComment/' + commentId);
    const data = await promise.json();
    return data;
}