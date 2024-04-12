'use client'
import React, { useEffect } from 'react'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const BetaMap = () => {

  useEffect(() => {
    
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? '';
    
    const map = new mapboxgl.Map({
      container: 'map',
      center: [-24, 42], //lng, lat
      zoom: 1, //hihger the number, the more zoomed in
    });

    map.on('style.load', () => {
      map.setConfigProperty('basemap', 'lightPreset', 'day'); // the last value can be changed to dawn, day, dusk, or night
    });


    // Searchbox
    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        placeholder: 'Search for a location',
      }), 
      'top-left'  
    );

    //Geolocator, grabs the devices location
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
      }),
      'bottom-right' 
    );


    //you're already able to zoom using your mouse but this adds a hard button for that as an alternative option
    // also adds the north orientator
    map.addControl(new mapboxgl.NavigationControl());

     
    return () => map.remove(); // Cleanup when the component unmounts

  }, []);

  return <div id="map" className='mapHeight'></div>;
}

export default BetaMap
