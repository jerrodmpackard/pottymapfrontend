import Head from "next/head"
import holderImg from "@/assets/Kids_Free_Hand_Drawing_of_Toilet_Paper_Rolls_Seamless_Background_Pattern_generated.jpg"
// import type { GetDerivedStateFromProps } from "next";

export default async function ShowBathroomShare({selectedMarkerData} : {selectedMarkerData: any}){

    const shareUrl = "https://pottymap.vercel.app/";
    const title = `Location Preview for ${selectedMarkerData?.name}`;
    const description = "Checkout this awesome bathroom on Potty Map";


    return(
        <>
            <Head>
                <title>Explore bathrooms near you!</title>
                <meta name="description" content="Checkout this awesome bathroom"/>
                <link rel="icon" href="/favicon.ico" />


                {/* Open Graph / Facebook / Workplace / WhatsApp / linkedIn */}
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={holderImg.src} />
                <meta property="og:url" content={shareUrl} />
                <meta property="og:type" content="website" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@pottymap" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={holderImg.src} />
                <meta name="twitter:url" content={shareUrl} />

            </Head>
            {/* <main className="container mx-auto mt-12 flex min-h-screen bg-white justify-center">
                <img
                    alt="bathroom map location"
                    title="bathroom map location"
                    className="mb-12 h-96 w-96 rounded-3xl"
                    src={holderImg.src}
                />
            </main> */}
        </>
    )
}
