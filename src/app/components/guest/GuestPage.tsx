'use client'

import { Menu, Lock } from '@mui/icons-material';
import { AppBar, Box, Button, Container, IconButton, Toolbar, Tooltip, Typography, styled } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from "next/navigation";

import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const GuestPage = () => {

    const router = useRouter();
    
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

    //Mapbox GL

    // const [map, setMap] = useState<mapboxgl.Map | null>(null)
    // const geocoderContainerRef = useRef<HTMLDivElement>(null)
    // const mapContainerRef = useRef<HTMLDivElement>(null)
    
    // useEffect(() => {

    //     mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? '';

    //     const newMap = new mapboxgl.Map({
    //         container: mapContainerRef.current!,
    //         center: [-100, 30], 
    //         zoom: 1, 
    //     });

    //     newMap.on('style.load', () => {
    //         newMap.setConfigProperty('basemap', 'lightPreset', 'day'); 
    //     });


    //     const geocoder = new MapboxGeocoder({
    //         accessToken: mapboxgl.accessToken,
    //         mapboxgl: mapboxgl,
    //         placeholder: 'Search for a location',
    //     });

        

    //     newMap.addControl(
    //         new mapboxgl.GeolocateControl({
    //             positionOptions: {
    //                 enableHighAccuracy: true,
    //             },
    //             trackUserLocation: true,
    //             showUserHeading: true,
    //         }),
    //         'bottom-right'
    //     );

    //     newMap.addControl(new mapboxgl.FullscreenControl());
    //     newMap.addControl(new mapboxgl.NavigationControl());
    //     newMap.addControl(new mapboxgl.ScaleControl());

    //     setMap(newMap);
    // })

    const backToLogin = () => {
        router.push("/")
    }

    

  return (
    <>
       <AppBar style={{ zIndex: 10 }}>
            <Container maxWidth='lg'>
                <Toolbar disableGutters>
                    <Box sx={{ mr: 1 }}>
                        <IconButton size='large' color='inherit' >
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
                    <Search></Search>

                    <Tooltip title="Login to have access">
                        <Button color='inherit' startIcon={<Lock />} onClick={backToLogin}>Login</Button>
                    </Tooltip>
                    
                </Toolbar>
            </Container>
        </AppBar>
      {/* <Box>
        <div ref={mapContainerRef} className='mapHeight'></div>
      </Box> */}
    </>
  )
}

export default GuestPage
