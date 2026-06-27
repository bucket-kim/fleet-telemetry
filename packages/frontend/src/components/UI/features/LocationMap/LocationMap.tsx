import { Fragment } from 'react'
import { useGlobalState } from '../../../../state/useGlobalState'
import GpsCoordinates from '../../components/GpsCoordinates/GpsCoordinates'
import MapLocation from '../../components/MapLocation/MapLocation'
import { LocationMapStyleContainer } from './LocationMapStyleContainer'


const LocationMap = () => {

    const { latest } = useGlobalState((state) => {
        return {
            latest: state.latest
        }
    })

    return (
        <LocationMapStyleContainer>
            {latest && (
                <Fragment>
                    <MapLocation latest={latest} />
                    <GpsCoordinates latest={latest} />
                </Fragment>
            )}
        </LocationMapStyleContainer>
    )
}

export default LocationMap
