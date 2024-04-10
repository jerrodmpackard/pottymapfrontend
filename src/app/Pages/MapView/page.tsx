'use client'
import React from 'react';

import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import NavComponent from '@/app/components/NavbarMV/NavComponent';

export default function mapView() {

    return (
    <div>
      <NavComponent/>
    </div>
  )
}