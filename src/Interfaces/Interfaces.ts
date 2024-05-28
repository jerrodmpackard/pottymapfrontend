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

export interface IRating {
    id: number
    userId: number
    BathroomId: number
    rating: number 
}

export interface IReport {
    id: number
    userId: number
    BathroomId: number
    issue: string
    priorityLevel: string
    description: string
    isResolved: boolean
}

export interface IComment {
    id: number
    bathroomId: number
    userId: number
    comment: string
}

export interface IGeoJSON {
    type:       string;
    state:      State;
    geometry:   Geometry;
    properties: Properties;
    layer:      Layer;
    source:     string;
}

export interface Geometry {
    type:        string;
    coordinates: number[];
}

export interface Layer {
    id:     string;
    type:   string;
    source: string;
    paint:  Paint;
    layout: State;
}

export interface State {
}

export interface Paint {
    "circle-radius":       number;
    "circle-stroke-width": number;
    "circle-color":        CircleEColor;
    "circle-stroke-color": CircleEColor;
}

export interface CircleEColor {
    r: number;
    g: number;
    b: number;
    a: number;
}

export interface Properties {
    id:                      number;
    name:                    string;
    address:                 string;
    city:                    string;
    state:                   string;
    zipCode:                 string;
    gender:                  string;
    type:                    string;
    numberOfStalls:          string;
    wheelchairAccessibility: string;
    hoursOfOperation:        string;
    openToPublic:            string;
    keyRequired:             string;
    babyChangingStation:     string;
    cleanliness:             string;
    safety:                  string;
    rating:                  number;
}
