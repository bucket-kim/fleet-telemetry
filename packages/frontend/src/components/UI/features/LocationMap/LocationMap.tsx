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
    const { latest, readings } = useGlobalState((state) => {
        return {
            latest: state.latest[selectedVehicleId],
            readings: state.readings
        }
    })

    return (
        <LocationMapStyleContainer>
            {latest && (
                <Fragment>
                    <MapLocation latest={latest} readings={readings} />
                    <GpsCoordinates latest={latest} />
                </Fragment>
            )}
        </LocationMapStyleContainer>
    )
}

export default LocationMap
