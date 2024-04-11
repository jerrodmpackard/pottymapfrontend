'use client'
import React from 'react';

import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import NavComponent from '@/app/components/NavbarMV/NavComponent';
import BottomNav from '@/app/components/NavbarMV/BottomNav';
import Login from '@/app/components/UserMV/Login';
import Buffering from '@/app/components/UserMV/Buffering';

export default function mapView() {

    return (
    <div>
      <Buffering/>
      {/* <Notification/> */}
      <Login />
      <NavComponent/>
      <BottomNav/>
    </div>
  )
}