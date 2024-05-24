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

export interface IAddFavorite {
    id: number,
    userId: number,
    bathroomId: number
}

export interface IAddFavSpot {
    id: number,
    userID: number,
    publishedName: string,
    title: string,
    description: string,
    isPublished: boolean,
    isDeleted: boolean
}