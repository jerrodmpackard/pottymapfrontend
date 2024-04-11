'use client'

// Declaring Types
interface State {
    currentUser: User | null;
    openLogin: boolean;
    loading: boolean;
}

interface User {
    name: string;
    photoURL?: string;
}

export interface Action {
    type: ActionType;
    payload: User | null;
}

type ActionType = 'UPDATE_USER' | 'OPEN_LOGIN' | 'CLOSE_LOGIN' | 'START_LOADING' | 'END_LOADING';


//Function updates the code state based on the action it recieves
//'state' is the current state of the program and 'action' tells the function what to do  
const reducer = (state: State, action: Action): State => {
    
    //switch statment checking the action type
    switch(action.type) {
        //if the type of action is 'UPDATE_USER', the 'payload' creates a new version of 'currentUser' that contains the information provided
        case 'UPDATE_USER':
            return {...state, currentUser:action.payload}
        
        case 'OPEN_LOGIN':
            return {...state, openLogin:true};

        case 'CLOSE_LOGIN':
            return {...state, openLogin:false};
            
        case 'START_LOADING':
            return {...state, loading:true};
    
        case 'END_LOADING':
            return {...state, loading:false};
        
        // if the type of action is not recongnized, it throws an error letting us know something went wrong
        default:
         throw new Error('No matched action!');
    }
}

export default reducer