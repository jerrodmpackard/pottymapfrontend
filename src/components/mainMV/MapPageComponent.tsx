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
import { AppBar, Box, Button, Container, Fab, IconButton, Toolbar, Tooltip, Typography, styled } from '@mui/material'
import { AddCircleOutline, Menu } from '@mui/icons-material'
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';
// import { lighten } from '@mui/material/styles/colorManipulator';


//Custom Components
import UserIcons from './UserMV/UserIcons';
import Sidebar from './SidebarMV/Sidebar'
import AddBathroom from '../bathroomMV/AddBathroom';
import MobileDropIcon from './UserMV/MobileDropIcon';
import ShowBathroom from '../bathroomMV/ShowBathroom';
import ReportIssue from './ReportMV/ReportIssue';



const MapPageComponent = () => {

    // Update the map whenever a new bathroom is entered using the form
    const [updateMap, setUpdateMap] = useState<boolean>(false);

    //Opening and closing the Drawer component (Sidebar)
    const [isOpen, setIsOpen] = useState<boolean>(false);

    //Opening and Closing the Modal Component (AddBathroom)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    //Testing Info modal (ShowBathroom)
    const [placeholder, setPlaceholder] = useState<boolean>(false);

    //Saving map dot data to a useState
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
            attributionControl: false
        });

        //giving newMap a style, this is what is creating the globe
        newMap.on('style.load', () => {
            newMap.setConfigProperty('basemap', 'lightPreset', 'day'); // the last value can be changed to dawn, day, dusk, or night
        });

        // Fetching getAllBathroomsAsGeoJSON endpoint to be added to the map as a layer of markers
        const getData = async () => {
            const mapDots: any = await getMapDots()
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

        // Setting info modal (ShowBathroom) to appear on click
        newMap.on('click', 'bathrooms', (e: any) => {

            // Copy coordinates array. Use dot notation to access each property of each feature to be passed into popup for display
            const coordinates: any = e?.features?.[0]?.geometry?.coordinates?.slice();
            const markerData = e.features[0].properties;
           
            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            setSelectedMarkerData(markerData);

            setPlaceholder(true);

            setSelectedMarkerData(markerData);

            setPlaceholder(true);
            
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

        // You're already able to zoom in and out using your mouse but this adds a hard button for that as an alternative option
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

    //Checking if there's a token in local storage
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
                                <Button color='primary' onClick={() => {setIsModalOpen(true); setSave(true)}}
                                // startIcon={<AddIcon />}
                                variant="contained"
                                className='aspect-square'
                                sx={{
                                    width: '30px', 
                                    height: '30px', 
                                    minWidth: 'unset', 
                                    minHeight: 'unset', 
                                }}
                                >
                                    <AddIcon />
                                </Button>
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
            {/* <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} /> */}

            {/* The form component */}
            <AddBathroom setUpdateMap={setUpdateMap} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} save={save} setSave={setSave}/>
            
            {/* The info component */}
            <ShowBathroom selectedMarkerData={selectedMarkerData} placeholder={placeholder} setPlaceholder={setPlaceholder} />
            
            {/* Rendering the map below the navbar (Appbar) */}
            <Box>
                <div ref={mapContainerRef} className='mt-[56px] h-[calc(100vh-56px)] mobile:mt-16 mobile:h-[calc(100vh-64px)]'></div>
            </Box>
        </>
    )
}

export default MapPageComponent