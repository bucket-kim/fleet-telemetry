import GpsCoordinates from '../../components/GpsCoordinates/GpsCoordinates'
import MapLocation from '../../components/MapLocation/MapLocation'
import { LocationMapStyleContainer } from './LocationMapStyleContainer'


const LocationMap = () => {
    return (
        <LocationMapStyleContainer>
            <MapLocation />
            <GpsCoordinates />
        </LocationMapStyleContainer>
    )
}

export default LocationMap
