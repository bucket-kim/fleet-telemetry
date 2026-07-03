import { Fragment } from 'react'
import { useGlobalState } from '../../../../state/useGlobalState'
import GpsCoordinates from '../../components/GpsCoordinates/GpsCoordinates'
import MapLocation from '../../components/MapLocation/MapLocation'
import { LocationMapStyleContainer } from './LocationMapStyleContainer'


const LocationMap = () => {

    const { selectedVehicleId } = useGlobalState((state) => {
        return {
            selectedVehicleId: state.selectedVehicleId
        }
    })
    const { latest } = useGlobalState((state) => {
        return {
            latest: state.latest[selectedVehicleId]
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
