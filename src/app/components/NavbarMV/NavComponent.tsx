'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Menu, Lock, SearchOffOutlined } from '@mui/icons-material'
import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography, styled } from '@mui/material'
// import PhotoURL from '@/assets/vecteezy_cartoon-doodle-golden-toilet_12156543.png'
// import { useValue } from '@/context/ContextProvider';
import UserIcons from '../UserMV/UserIcons';
import Sidebar from '../SidebarMV/Sidebar'

import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const NavComponent = () => {

    const [isOpen, setIsOpen] = useState(false)

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
    // const geocoderContainerRef = useRef<HTMLElement>(null)
    
    useEffect(() => {
        
        const geocoderContainerRef = document.getElementById('search')
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? '';
    
        //creating the initial viewport
        const map = new mapboxgl.Map({
          container: 'map',
          center: [-24, 42], //lng, lat
          zoom: 1, //higher the number, the more zoomed in
        });

        //giving the map a style
        map.on('style.load', () => {
          map.setConfigProperty('basemap', 'lightPreset', 'day'); // the last value can be changed to dawn, day, dusk, or night
        });
    
        //Searchbox outside of the map ?
        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl,
            placeholder: 'Search for a location',
        });

        if (geocoderContainerRef) {
            if(geocoderContainerRef.hasChildNodes()){
                geocoderContainerRef.innerHTML = ''
            }
            geocoderContainerRef.appendChild(geocoder.onAdd(map));
        }
    
        // Geolocator, grabs the device's location
        map.addControl(
          new mapboxgl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true,
            },
            trackUserLocation: true,
            showUserHeading: true,
          }),
          'bottom-right'
        );
    
        // you're already able to zoom using your mouse but this adds a hard button for that as an alternative option
        // also adds the north orientator, full screen, and scale
        map.addControl(new mapboxgl.FullscreenControl());
        map.addControl(new mapboxgl.NavigationControl());
        map.addControl(new mapboxgl.ScaleControl());
    
       
      }, [isOpen]);

    return (
        <>
            <AppBar>
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
                        <Search id="search">
                            {/* Searchboxb/ Geocoder */}
                        </Search>

                        {/* {!currentUser ? (<Button color='inherit' startIcon={<Lock />} onClick={() => dispatch({ type: 'OPEN_LOGIN', payload: null })}>
                            Login
                        </Button>) : (<UserIcons />)} */}
                        <UserIcons/>

                    </Toolbar>
                </Container>
            </AppBar>

            {/* <Toolbar /> */}
            <Sidebar {...{isOpen, setIsOpen}} />
            <Box>
                <div id='map' className='mapHeight'></div>
            </Box>
        </>
    )
}

export default NavComponent