export interface IUserItems {
    id: number
    userID: number
    publishedName: string
    date: string
    title: string
    description: string
    image: string
    tags: string
    categories: string
    isPublished: boolean
    isDeleted: boolean
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