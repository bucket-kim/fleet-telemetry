import type { TelemetryReading } from '@fleet/shared'
import { useMemo, type FC } from 'react'
import { GpsCoordinatesStyleContainer } from './GpsCoordinatesStyleContainer'

interface MapLocationProps {
    latest: TelemetryReading
}


const GpsCoordinates: FC<MapLocationProps> = ({ latest }) => {

    const coord = useMemo(() => {
        return {
            x: latest?.gps.latitude,
            y: latest?.gps.longitude
        }
    }, [latest])

    return (
        <GpsCoordinatesStyleContainer>
            <div className="header">
                <h1>GPS Coordinates: </h1>
            </div>
            <div className="content">

                <p>x: {(coord.x)?.toFixed(2)}</p>
                <p>y: {(coord.y)?.toFixed(2)}</p>
            </div>
        </GpsCoordinatesStyleContainer>
    )
}

export default GpsCoordinates
