export interface IBathrooms {
    id: number
    name: string
    address: string
    city: string
    state: string
    zipCode: string
    latitude: number
    longitude: number
    gender: string
    type: string
    numberOfStalls: string
    wheelchairAccessibility: string
    hoursOfOperation: string
    openToPublic: string
    keyRequired: string
    babyChangingStation: string
    cleanliness: string
    safety: string
    // rating: string
}

//Get our token

export interface IToken {
    token: string
}

//For login and Create account fetch

export interface IUserInfo {
    Username: string
    Password: string
    ID: number
}

//This for getting our user's info Id and username

export interface IUserData {
    userId: number
    publisherName: string
}