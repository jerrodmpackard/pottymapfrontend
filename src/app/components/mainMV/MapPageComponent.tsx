'use client'
import React, { useEffect, useRef, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Menu, Lock, SearchOffOutlined } from '@mui/icons-material'
import { AppBar, Box, Button, Container, Fab, IconButton, Toolbar, Typography, styled } from '@mui/material'

import UserIcons from './UserMV/UserIcons';
import Sidebar from './SidebarMV/Sidebar'

import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import AddBathroom from '../bathroomMV/AddBathroom';
import { getMapDots } from '@/utils/DataServices';




const MapPageComponent = () => {

    //Opening and closing the Drawer component (Sidebar)
    const [isOpen, setIsOpen] = useState<boolean>(false)

    //Opening and Closing the Modal Component (ModalInputs)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    //Creating a material UI element to hold the searchbox
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

        const getData = async () => {
            const mapDots: any = await getMapDots();
            console.log(mapDots);
            return mapDots;
        }
        
        getData().then(mapDots => {
            newMap.on('load', () => {
                newMap.addSource('earthquakes', {
                    type: 'geojson',
                    // Use a URL for the value for the data property.
                    data: mapDots,
                });
    
                newMap.addLayer({
                    'id': 'earthquakes-layer',
                    'type': 'circle',
                    'source': 'earthquakes',
                    'paint': {
                        'circle-radius': 4,
                        'circle-stroke-width': 2,
                        'circle-color': 'red',
                        'circle-stroke-color': 'white'
                    }
                });
            });

        })

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
                            sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
                        >
                            Potty Map
                        </Typography>
                        <Typography
                            variant='h6'
                            component='h1'
                            noWrap
                            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                        >
                            PMap
                        </Typography>
                        <Search ref={geocoderContainerRef}>
                            {/* Searchbox / Geocoder */}
                        </Search>

                        {/* {!currentUser ? (<Button color='inherit' startIcon={<Lock />} onClick={() => dispatch({ type: 'OPEN_LOGIN', payload: null })}>
                            Login
                        </Button>) : (<UserIcons />)} */}
                        <UserIcons />

                    </Toolbar>
                </Container>
            </AppBar>

            {/* The Drawer component */}
            <Sidebar {...{ isOpen, setIsOpen }} />
            <AddBathroom {...{ isModalOpen, setIsModalOpen }} />

            {/* Rendering the map below the navbar (Appbar) */}
            <Box>
                <div ref={mapContainerRef} className='mapHeight'></div>
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