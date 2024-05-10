'use client'

//for alerts
interface StateTwo {
    alertUser: Alert | null;
}

interface Alert {
    open: boolean
    severity: 'info' | 'success' | 'warning' | 'error';
    message: string;
}

export interface ActionTwo {
    type: ActionTypeTwo;
    payload: Alert | null;
}

type ActionTypeTwo = 'UPDATE_ALERT';

const reducerTwo = (stateTwo: StateTwo, actionTwo: ActionTwo): StateTwo => {
  
    switch(actionTwo.type) {
        
        case 'UPDATE_ALERT':
            return {...stateTwo, alertUser:actionTwo.payload }

        default:
         throw new Error('No matched action!');
    }
}

export default reducerTwo