import { useEffect, useMemo, useRef, type FC } from 'react';
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Layer, Marker, Source, type MapRef } from 'react-map-gl/mapbox';
import { useThemeValue } from '../../../../styles/theme';
import type { TelemetryReading } from '@fleet/shared';
import { MapLocationStyleContainer } from './MapLocationStyleContainer';

const MAP_STYLES = {
    light: "mapbox://styles/mapbox/light-v11",
    dark: "mapbox://styles/mapbox/dark-v11",
} as const;

const DEFAULT_CENTER = { latitude: 42.28, longitude: -83.72 };

interface MapLocationProps {
    latest: TelemetryReading,
    readings: TelemetryReading[]
}

const MapLocation: FC<MapLocationProps> = ({ latest, readings }) => {

    const gps = useMemo(() => {
        return latest?.gps;
    }, [latest?.gps])
    const theme = useThemeValue();
    const mapRef = useRef<MapRef>(null);

    useEffect(() => {
        if (gps && mapRef.current) {
            mapRef.current.easeTo({ center: [gps.longitude, gps.latitude] });
        }
    }, [gps]);

    const routeGeoJSON = useMemo(() => ({
        type: "Feature" as const,
        properties: {},
        geometry: {
            type: "LineString" as const,
            coordinates: readings.map(r => [r.gps.longitude, r.gps.latitude]),
        },
    }), [readings]);

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
            mapStyle={MAP_STYLES[theme]}
            style={{ width: "100%", height: "100%" }}
        >
            {gps && <Marker latitude={gps.latitude} longitude={gps.longitude} >
                <MapLocationStyleContainer>
                    <div className='gps-marker' />
                </MapLocationStyleContainer>
            </Marker>}
            <Source id='route' type='geojson' data={routeGeoJSON} lineMetrics={true}>
                <Layer id='route-line' type='line' paint={{
                    "line-gradient": ["interpolate", ["linear"], ["line-progress"], 0, "#6DEAC4", 0.1, "#70C9F8", .5, "#306BE8", 0.9, "#70C9F8", 1, "#6DEAC4"],
                    "line-width": 4,
                }} />
            </Source>
        </Map>
    )
}

export default MapLocation
