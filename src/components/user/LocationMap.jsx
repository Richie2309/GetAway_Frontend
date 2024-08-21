import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 0,
  lng: 0
};

const LocationMap = ({ latitude, longitude }) => {
  const mapCenter = {
    lat: parseFloat(latitude),
    lng: parseFloat(longitude)
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDmUsMM3o0pexh_kfVeGSZxZ5fBgjZDAJw"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        options={{
          zoomControl:false,
          streetViewControl:false,
          mapTypeControl:false
        }}
        zoom={15}
      >
        <Marker position={mapCenter} />
      </GoogleMap>
    </LoadScript>
  );
};

export default LocationMap;
