import { SessionToken } from "@mapbox/search-js-core";
import { NextResponse } from "next/server";

//Backup AutoComplete in case the Autofill fails
//The Autofill component that we're using from MapBox GL JS is in Beta Testing

const BASE_URL = "https://api.mapbox.com/search/searchbox/v1/suggest";

export async function GET(request: any) {

    const { searchParams } = new URL(request.url);
    console.log(`Request URL: ${request.url}`);


    const searchText = searchParams.get('q');

    const res = await fetch(BASE_URL + '?q=' + searchText + '?language=en&limit=5&session_token=[GENERATED-UUID]' + '&country=US&access_token=' + process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
    console.log(`User Input: ${searchText}`);
    const searchResult = await res.json();
    return NextResponse.json(searchResult);
}