import React from 'react'
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker } from 'react-map-gl/mapbox';


const MapLocation = () => {
    return (
        <Map
            mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
            initialViewState={{ latitude: 42.28, longitude: -83.72, zoom: 13 }}
            attributionControl={false}
            logoPosition='bottom-left'
            mapStyle="mapbox://styles/mapbox/dark-v11"
            style={{ width: "100%", height: "100%" }}
        >
            <Marker latitude={42.28} longitude={-83.72} />
        </Map>
    )
}

export default MapLocation
