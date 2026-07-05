import { Fragment, useEffect, useRef, useState } from 'react'
import { CAR_COMPONENTS } from './CAR_REGISTRY'
import { useGlobalState } from '../../../../state/useGlobalState'
import { getBearing } from '../../../hooks/useAnimation'



const Cars = () => {

    const [bearing, setBearing] = useState<number>(0)

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

    const prevPosition = useRef<{ lat: number, lng: number } | null>(null)

    useEffect(() => {
        if (!latest) return;
        const current = { lat: latest.gps.latitude, lng: latest.gps.longitude };

        if (prevPosition.current) {
            const moved =
                prevPosition.current.lat !== current.lat ||
                prevPosition.current.lng !== current.lng;

            if (moved) {
                const bearing = getBearing(prevPosition.current, current);
                setBearing(bearing);
            }
        }

        prevPosition.current = current;
    }, [latest]);

    const CarModel = CAR_COMPONENTS[selectedVehicleId]

    return (
        <Fragment>
            {CarModel && <CarModel latest={latest} bearing={bearing} />}
        </Fragment>
    )
}

export default Cars
