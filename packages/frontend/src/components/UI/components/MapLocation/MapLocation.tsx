import { useEffect, useMemo, useRef } from 'react';
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker, type MapRef } from 'react-map-gl/mapbox';
import { useGlobalState } from '../../../../state/useGlobalState';

// Center shown until the first telemetry reading arrives over the WebSocket.
// `latest` is null on mount/reload, so without this the map (and Marker) would
// receive undefined coords and mapbox-gl would throw "Invalid LngLat (NaN, NaN)".
const DEFAULT_CENTER = { latitude: 42.28, longitude: -83.72 };

const MapLocation = () => {
    const { latest } = useGlobalState((state) => {
        return {
            latest: state.latest
        }
    })

    const gps = useMemo(() => {
        return latest?.gps;
    }, [latest?.gps])

    const mapRef = useRef<MapRef>(null);

    useEffect(() => {
        if (gps && mapRef.current) {
            mapRef.current.easeTo({ center: [gps.longitude, gps.latitude] });
        }
    }, [gps]);

    return (
        <Map
            ref={mapRef}
            mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
            initialViewState={{
                latitude: gps?.latitude ?? DEFAULT_CENTER.latitude,
                longitude: gps?.longitude ?? DEFAULT_CENTER.longitude,
                zoom: 13,
            }}
            attributionControl={false}
            logoPosition='bottom-left'
            mapStyle="mapbox://styles/mapbox/dark-v11"
            style={{ width: "100%", height: "100%" }}
        >
            {gps && <Marker latitude={gps.latitude} longitude={gps.longitude} />}
        </Map>
    )
}

export default MapLocation
