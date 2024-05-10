'use client'
import React, { useEffect, useRef, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Menu, MoreVert } from '@mui/icons-material'
import { AppBar, Box, Button, Container, Fab, IconButton, Toolbar, Tooltip, Typography, styled } from '@mui/material'

import UserIcons from './UserMV/UserIcons';
import Sidebar from './SidebarMV/Sidebar'

import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import AddBathroom from '../bathroomMV/AddBathroom';
import { addBathroom, checkToken, getMapDots } from '@/utils/DataServices';
import { IBathrooms } from '@/Interfaces/Interfaces';
import { notFound } from 'next/navigation'
import MobileDropIcon from './UserMV/MobileDropIcon';



const MapPageComponent = () => {

    //Check if we have a token in local storage
    if (!checkToken()) {
        return notFound()
    }

    //Opening and closing the Drawer component (Sidebar)
    const [isOpen, setIsOpen] = useState<boolean>(false)

    //Opening and Closing the Modal Component (ModalInputs)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    //Navbar styling for the search box
    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    }));


    //MapBox GL
    const [map, setMap] = useState<mapboxgl.Map | null>(null)
    const geocoderContainerRef = useRef<HTMLDivElement>(null)
    const mapContainerRef = useRef<HTMLDivElement>(null)

    const [coordinates, setCoordinates] = useState<string>('');

    // Use States for Bathroom Input Form
    const [bathroomID, setBathroomID] = useState<number>(0);
    const [address, setAddress] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [zipCode, setZipCode] = useState<string>('');
    const [latitude, setLatitude] = useState<number>(0);
    const [longitude, setLongitude] = useState<number>(0);
    const [gender, setGender] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [numberOfStalls, setNumberOfStalls] = useState<string>('');
    const [wheelchairAccessibility, setWheelchairAccessibility] = useState<string>('');
    const [hoursOfOperation, setHoursOfOperation] = useState<string>('');
    const [openToPublic, setOpenToPublic] = useState<string>('');
    const [keyRequired, setKeyRequired] = useState<string>('');
    const [babyChangingStation, setBabyChangingStation] = useState<string>('');
    const [cleanliness, setCleanliness] = useState<string>('');
    const [safety, setSafety] = useState<string>('');
    // const [rating, setRating] = useState<string>('');

    // Helper function for adding bathroom form
    const handleAddBathroom = async (e: React.MouseEvent<HTMLButtonElement>) => {
        let bathroom: IBathrooms = {
            id: bathroomID,
            address: address,
            city: city,
            state: state,
            zipCode: zipCode,
            latitude: latitude,
            longitude: longitude,
            gender: gender,
            type: type,
            numberOfStalls: numberOfStalls,
            wheelchairAccessibility: wheelchairAccessibility,
            hoursOfOperation: hoursOfOperation,
            openToPublic: openToPublic,
            keyRequired: keyRequired,
            babyChangingStation: babyChangingStation,
            cleanliness: cleanliness,
            safety: safety,
            // rating: rating
        }

        let result = false;

        result = await addBathroom(bathroom);

        if (result) {
            console.log("Bathroom added succesfully");
        }
    }

    // Helper functions for passing the user input values from bathroom form to function to call endpoint to save to database
    const handleAddress = (e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value);
    const handleCity = (e: React.ChangeEvent<HTMLInputElement>) => setCity(e.target.value);
    const handleState = (e: React.ChangeEvent<HTMLInputElement>) => setState(e.target.value);
    const handleZipCode = (e: React.ChangeEvent<HTMLInputElement>) => setZipCode(e.target.value);
    // const handleLatitude = (e: React.ChangeEvent<HTMLInputElement>) => setLatitude(Number(JSON.stringify(coordinate[1])));
    // const handleLongitude = (e: React.ChangeEvent<HTMLInputElement>) => setLongitude(Number(JSON.stringify(coordinate[0])));
    const handleGender = (e: React.ChangeEvent<HTMLInputElement>) => setGender(e.target.value);
    const handleType = (e: React.ChangeEvent<HTMLInputElement>) => setType(e.target.value);
    const handleNumberOfStalls = (e: React.ChangeEvent<HTMLInputElement>) => setNumberOfStalls(e.target.value);
    const handleWheelchairAccessibility = (e: React.ChangeEvent<HTMLInputElement>) => setWheelchairAccessibility(e.target.value);
    const handleHoursOfOperation = (e: React.ChangeEvent<HTMLInputElement>) => setHoursOfOperation(e.target.value);
    const handleOpenToPublic = (e: React.ChangeEvent<HTMLInputElement>) => setOpenToPublic(e.target.value);
    const handleKeyRequired = (e: React.ChangeEvent<HTMLInputElement>) => setKeyRequired(e.target.value);
    const handleBabyChangingStation = (e: React.ChangeEvent<HTMLInputElement>) => setBabyChangingStation(e.target.value);
    const handleCleanliness = (e: React.ChangeEvent<HTMLInputElement>) => setCleanliness(e.target.value);
    const handleSafety = (e: React.ChangeEvent<HTMLInputElement>) => setSafety(e.target.value);


    // Mapbox useEffect
    useEffect(() => {

        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? '';

        //creating the initial viewport
        const newMap = new mapboxgl.Map({
            container: mapContainerRef.current!,
            center: [-100, 30], //lng, lat
            zoom: 1, //higher the number, the more zoomed in
        });

        //giving newMap a style, this is what is creating the globe
        newMap.on('style.load', () => {
            newMap.setConfigProperty('basemap', 'lightPreset', 'day'); // the last value can be changed to dawn, day, dusk, or night
        });

        // Fetching getAllBathroomsAsGeoJSON endpoint to be added to the map as a layer of markers
        const getData = async () => {
            const mapDots: any = await getMapDots();
            console.log(mapDots);
            return mapDots;
        }

        // Waiting for getData to resolve before passing in the mapDots variable as the source layer
        getData().then(mapDots => {
            newMap.on('load', () => {
                newMap.addSource('bathrooms', {
                    type: 'geojson',
                    // Use a URL for the value for the data property.
                    data: mapDots,
                });

                // Adding the layer of markers and styling the markers
                newMap.addLayer({
                    'id': 'bathrooms',
                    'type': 'circle',
                    'source': 'bathrooms',
                    'paint': {
                        'circle-radius': 6,
                        'circle-stroke-width': 2,
                        'circle-color': 'red',
                        'circle-stroke-color': 'white'
                    }
                });
            });

        })

        // Declaring the popup and giving properties
        const popup = new mapboxgl.Popup({
            closeButton: true,
            closeOnClick: true
        });

        // Setting popups to appear on click
        newMap.on('click', 'bathrooms', (e: any) => {
            // Change the cursor style as a UI indicator.
            newMap.getCanvas().style.cursor = 'pointer';


            // Copy coordinates array. Use dot notation to access each property of each feature to be passed into popup for display
            const coordinates: any = e?.features?.[0]?.geometry?.coordinates?.slice();
            const Name = e?.features?.[0]?.properties?.name;
            const Address = e?.features?.[0]?.properties?.address;
            const City = e?.features?.[0]?.properties?.city;
            const State = e?.features?.[0]?.properties?.state;
            const ZipCode = e?.features?.[0]?.properties?.zipCode;
            const Gender = e?.features?.[0]?.properties?.gender;
            const Type = e?.features?.[0]?.properties?.type;
            const NumberOfStalls = e?.features?.[0]?.properties?.numberOfStalls;
            const WheelchairAccessibility = e?.features?.[0]?.properties?.wheelchairAccessibility;
            const HoursOfOperation = e?.features?.[0]?.properties?.hoursOfOperation;
            const OpenToPublic = e?.features?.[0]?.properties?.openToPublic;
            const KeyRequired = e?.features?.[0]?.properties?.keyRequired;
            const BabyChangingStation = e?.features?.[0]?.properties?.babyChangingStation;
            const Cleanliness = e?.features?.[0]?.properties?.cleanliness;
            const Safety = e?.features?.[0]?.properties?.safety;
            const Rating = e?.features?.[0]?.properties?.rating;

            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            // Variable to hold all properties and formatting them for display on popup
            const popupContent = `<div><strong>${Name}</strong><br><p>${Address} ${City}, ${State} ${ZipCode}</p><p>Gender: ${Gender}</p><p>Type: ${Type}</p><p>Number of Stalls: ${NumberOfStalls}</p><p>Wheelchair Accessible: ${WheelchairAccessibility}</p><p>Hours of Operation: ${HoursOfOperation}</p><p>Open to Public: ${OpenToPublic}</p><p>Key Required: ${KeyRequired}</p><p>Baby Changing Station: ${BabyChangingStation}</p><p>Cleanliness: ${Cleanliness}</p><p>Safety: ${Safety}</p></div>`;

            // Populate the popup and set its coordinates
            // based on the feature found.
            popup.setLngLat(coordinates).setHTML(popupContent).addTo(newMap);
        });

        // When mousing over a marker, style cursor as pointer
        newMap.on('mouseenter', 'bathrooms', () => {
            newMap.getCanvas().style.cursor = 'pointer';
        });

        // When mouse leaves a marker, change cursor back to default
        newMap.on('mouseleave', 'bathrooms', () => {
            newMap.getCanvas().style.cursor = '';
        });

        // Geolocator, grabs the device's location
        newMap.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true,
                },
                trackUserLocation: true,
                showUserHeading: true,
            }),
            'bottom-right'
        );

        // you're already able to zoom in and out using your mouse but this adds a hard button for that as an alternative option
        // also adds the north orientator, full screen mode, and scale reference
        newMap.addControl(new mapboxgl.FullscreenControl());
        newMap.addControl(new mapboxgl.NavigationControl());
        newMap.addControl(new mapboxgl.ScaleControl());

        setMap(newMap);

    }, []);

    //Re-renders the searchbox everytime the map is updated or when the drawer gets open
    //It used to disappear once the navbar got updated by the drawer 
    useEffect(() => {
        // Searchbox outside of the map display?
        if (map && geocoderContainerRef.current) {
            const geocoder = new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl,
                placeholder: 'Search for a location',
            });
            geocoderContainerRef.current.appendChild(geocoder.onAdd(map));
        }
    }, [map, isOpen, isModalOpen])


    return (
        <>
            <AppBar style={{ zIndex: 10 }}>
                <Container maxWidth='lg'>
                    <Toolbar disableGutters>
                        <Box sx={{ mr: 1 }}>
                            <IconButton size='large' color='inherit' onClick={() => setIsOpen(true)}>
                                <Menu />
                            </IconButton>
                        </Box>
                        <Typography
                            variant='h6'
                            component='h1'
                            noWrap
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}
                        >
                            Potty Map
                        </Typography>

                        <Box>
                            <Search ref={geocoderContainerRef}></Search>
                        </Box>

                        <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                            <UserIcons />
                        </Box>
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' } }}>
                            <MobileDropIcon />
                        </Box>

                    </Toolbar>
                </Container>
            </AppBar>

            {/* The Drawer component */}
            <Sidebar {...{ isOpen, setIsOpen }} />
            <AddBathroom {...{ isModalOpen, setIsModalOpen }} />

            {/* Rendering the map below the navbar (Appbar) */}
            <Box>
                <div ref={mapContainerRef} className='mapHeightMobile mobile:mapHeight'></div>
            </Box>
            <Box>
                <Fab color="primary" onClick={() => setIsModalOpen(true)}
                    size="small" aria-label="add"
                    style={{
                        position: 'absolute',
                        bottom: '75px',
                        right: '5px',
                        zIndex: 100,
                    }}
                >
                    <AddIcon />
                </Fab>
            </Box>
        </>
    )
}

export default MapPageComponent