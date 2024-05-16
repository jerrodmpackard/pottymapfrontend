'use client'
import React, { useEffect, useRef, useState } from 'react'
import { notFound } from 'next/navigation'

//Interface Imports
import { checkToken, getMapDots } from '@/utils/DataServices';

//Mapbox GL Js Imports
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import mapboxgl from 'mapbox-gl';


//Material UI Imports
import { AppBar, Box, Container, Fab, IconButton, Toolbar, Tooltip, Typography, styled } from '@mui/material'
import { AddCircleOutline, Menu } from '@mui/icons-material'


//Custom Components
import UserIcons from './UserMV/UserIcons';
import Sidebar from './SidebarMV/Sidebar'
import AddBathroom from '../bathroomMV/AddBathroom';
import MobileDropIcon from './UserMV/MobileDropIcon';
import ShowBathroom from '../bathroomMV/ShowBathroom';




const MapPageComponent = () => {

    // Update the map whenever a new bathroom is entered using the form
    const [updateMap, setUpdateMap] = useState<boolean>(false);

    //Opening and closing the Drawer component (Sidebar)
    const [isOpen, setIsOpen] = useState<boolean>(false);

    //Opening and Closing the Modal Component (AddBathroom)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    //Testing INfo modal
    const [placeholder, setPlaceholder] = useState<boolean>(false);

    const [selectedMarkerData, setSelectedMarkerData] = useState<any>(null);

    //Turn on and off the autoSave
    const [save, setSave] = useState<boolean>(false);

    //Styling for the searchbox container 
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
            const markerData = e.features[0].properties;
            console.log(markerData);
            // const Name = e.features[0].properties.name;
            // const Address = e?.features?.[0]?.properties?.address;
            // const City = e?.features?.[0]?.properties?.city;
            // const State = e?.features?.[0]?.properties?.state;
            // const ZipCode = e?.features?.[0]?.properties?.zipCode;
            // const Gender = e?.features?.[0]?.properties?.gender;
            // const Type = e?.features?.[0]?.properties?.type;
            // const NumberOfStalls = e?.features?.[0]?.properties?.numberOfStalls;
            // const WheelchairAccessibility = e?.features?.[0]?.properties?.wheelchairAccessibility;
            // const HoursOfOperation = e?.features?.[0]?.properties?.hoursOfOperation;
            // const OpenToPublic = e?.features?.[0]?.properties?.openToPublic;
            // const KeyRequired = e?.features?.[0]?.properties?.keyRequired;
            // const BabyChangingStation = e?.features?.[0]?.properties?.babyChangingStation;
            // const Cleanliness = e?.features?.[0]?.properties?.cleanliness;
            // const Safety = e?.features?.[0]?.properties?.safety;
            // const Rating = e?.features?.[0]?.properties?.rating;

            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            setSelectedMarkerData(markerData);

            setPlaceholder(true);

            // Variable to hold all properties and formatting them for display on popup
            // const popupContent = `<div><strong>${Name}</strong><br><p>${Address} ${City}, ${State} ${ZipCode}</p><p>Gender: ${Gender}</p><p>Type: ${Type}</p><p>Number of Stalls: ${NumberOfStalls}</p><p>Wheelchair Accessible: ${WheelchairAccessibility}</p><p>Hours of Operation: ${HoursOfOperation}</p><p>Open to Public: ${OpenToPublic}</p><p>Key Required: ${KeyRequired}</p><p>Baby Changing Station: ${BabyChangingStation}</p><p>Cleanliness: ${Cleanliness}</p><p>Safety: ${Safety}</p></div>`;

            // Populate the popup and set its coordinates
            // based on the feature found.
            // popup.setLngLat(coordinates).setHTML(popupContent).addTo(newMap);
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

    }, [updateMap]);

    //Re-renders the searchbox everytime the map or navbar is updated
    //It used to disappear whenever the navbar got updated through the drawer and modal 
    useEffect(() => {
        
        if (map && geocoderContainerRef.current) {
            const geocoder = new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl,
                placeholder: 'Search for a location',
            });
            geocoderContainerRef.current.appendChild(geocoder.onAdd(map));
        }
    }, [map, isOpen, isModalOpen, placeholder, updateMap])

        //Checking if there is a token in local storage
        if (!checkToken()) {
            return notFound()
        }

    
    return (
        <>
            <AppBar style={{ zIndex: 10 }}>
                <Container maxWidth='lg'>
                    <Toolbar disableGutters>
                        <Box sx={{ mr: 1 }}>
                            <Tooltip title="Open Favorites">
                                <IconButton size='large' color='inherit' onClick={() => setIsOpen(true)}>
                                    <Menu />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Typography
                            variant='h6'
                            component='h1'
                            noWrap
                            sx={{ display: { xs: 'none', sm: 'flex' } }}
                        >
                            Potty Map
                        </Typography>

                        <Box>
                            <Search ref={geocoderContainerRef}></Search>
                        </Box>

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>
                            <Tooltip title="Add a Bathroom">
                                <IconButton color='inherit' onClick={() => {setIsModalOpen(true); setSave(true)}}>
                                    <AddCircleOutline />
                                </IconButton>
                            </Tooltip>
                        </Box>

                        <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                            <UserIcons />
                        </Box>
                        <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
                            <MobileDropIcon isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
     

            {/* The Drawer component */}
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

            <AddBathroom setUpdateMap={setUpdateMap} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} save={save} setSave={setSave}/>
            
            <ShowBathroom selectedMarkerData={selectedMarkerData} placeholder={placeholder} setPlaceholder={setPlaceholder}/>
            

            {/* Rendering the map below the navbar (Appbar) */}
            <Box>
                <div ref={mapContainerRef} className='mt-[56px] h-[calc(100vh-56px)] mobile:mt-16 mobile:h-[calc(100vh-64px)]'></div>
            </Box>
        </>
    )
}

export default MapPageComponent