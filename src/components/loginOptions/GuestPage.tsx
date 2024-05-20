'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from "next/navigation";

import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { getMapDots } from '@/utils/DataServices';

import { AppBar, Box, Button, Container, IconButton, Toolbar, Tooltip, Typography, styled } from '@mui/material'
import { Menu, Lock } from '@mui/icons-material';


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

    // Mapbox GL
    const [map, setMap] = useState<mapboxgl.Map | null>(null)
    const geocoderContainerRef = useRef<HTMLDivElement>(null)
    const mapContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {

        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? '';

        const newMap = new mapboxgl.Map({
            container: mapContainerRef.current!,
            center: [-100, 30],
            zoom: 1,
            attributionControl: false
        });

        //Givng the Map a Style. The last value of setCongfigPropertycan be 'dawn', 'day', 'dusk', or 'night'
        newMap.on('style.load', () => {
            newMap.setConfigProperty('basemap', 'lightPreset', 'day');
        });

        // Fetching getAllBathroomsAsGeoJSON endpoint to be added to the map as a layer of markers
        const getData = async () => {
            const mapDots: any = await getMapDots();
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

        // Adds the geolocator and grabs the device's location on click
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

        //Adding the fullscreen, zoom, north indicator, and Scale Controls to the map
        newMap.addControl(new mapboxgl.FullscreenControl());
        newMap.addControl(new mapboxgl.NavigationControl());
        newMap.addControl(new mapboxgl.ScaleControl());

        setMap(newMap);
    }, [])

    useEffect(() => {
        // Getting the Searchbox outside of the map display
        if (map && geocoderContainerRef.current) {
            const geocoder = new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl,
                placeholder: 'Search for a location',
            });
            geocoderContainerRef.current.appendChild(geocoder.onAdd(map));
        }
    }, [map])

    const backToLogin = () => {
        router.push("/")
    }

    return (
        <>
            <AppBar style={{ zIndex: 10 }}>
                <Container maxWidth='lg'>
                    <Toolbar disableGutters>
                        <Box sx={{ mr: 1 }}>
                            <Tooltip title="Login to have access">
                                <IconButton size='large' color='inherit' >
                                    <Menu />
                                </IconButton>
                            </Tooltip>
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
                        <Search ref={geocoderContainerRef}></Search>

                        <Tooltip title="Click to Login">
                            <Button color='inherit' startIcon={<Lock />} onClick={backToLogin}>Login</Button>
                        </Tooltip>

                    </Toolbar>
                </Container>
            </AppBar>
            <Box>
                <div ref={mapContainerRef} className='mt-[56px] h-[calc(100vh-56px)] mobile:mt-16 mobile:h-[calc(100vh-64px)]'></div>
            </Box>
        </>
    )
}

export default GuestPage
