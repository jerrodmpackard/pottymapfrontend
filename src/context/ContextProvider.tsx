'use client'
import { createContext, useContext, useReducer } from "react"
import reducer, {Action} from "./reducer"
import reducerTwo, {ActionTwo} from "./reducerTwo"


//Declaring types
interface IContextValue {
  state: State;
  dispatch: React.Dispatch<Action>;
  initialState: State; 
}

interface User {
  name: string;
  photoURL?: string;
}

interface State {
  currentUser: User | null;
  openLogin: boolean;
  loading: boolean;
}

//Initalizing the variable
const initialState = { 
  currentUser:null, 
  openLogin:false,
  loading: false,
 }

// Creating the context
const Context = createContext<IContextValue>({
  state: initialState,
  dispatch: () => undefined,
  initialState, 
});

//Custom hook to replace useContext() 
export const useValue = () => { return useContext(Context)}



//doing it all again fro 'reducerTwo'
interface IContextValueTwo {
  stateTwo: StateTwo;
  dispatchTwo: React.Dispatch<ActionTwo>;
  initialStateTwo: StateTwo; 
}

interface StateTwo {
  alertUser: Alert | null;
}

interface Alert {
  open: boolean
  severity: 'info' | 'success' | 'warning' | 'error';
  message: string;
}

const initialStateTwo = {
  alertUser: {open:false, severity:'info', message:''}
}

// const ContextTwo = createContext<IContextValueTwo>({
//   stateTwo: initialStateTwo,
//   dispatchTwo: () => undefined,
//   initialStateTwo,
// });

// export const useValueTwo = () => { return useContext(ContextTwo)}

//Component the provides the context to the 'children' aka all the other components/files 
const ContextProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  // initializing 'state' and 'dispacth'
  //useReducer takes two arguements 'type' and 'payload'
  //'type' idicates the type of action and 'payload' contains additional data
  //reducer is the function that updates 'state' and 'initialState' 
  const [state, dispatch] = useReducer(reducer, initialState);

  //this object holds 'state', 'dispatch', and 'initialState' with the type 'IContextValue'
  const contextValue: IContextValue = { state, dispatch, initialState}
  


  // const [stateTwo, dispatchTwo] = useReducer(reducerTwo, initialStateTwo);
  // const contextValueTwo: IContextValueTwo = { stateTwo, dispatchTwo, initialStateTwo };

  return (

    //Now every component/file has access to 'state', 'dispatch', and 'initialState'
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
}

export default ContextProvider
