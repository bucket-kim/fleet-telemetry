import { Fragment, useEffect, useRef, useState } from 'react'
import { CAR_COMPONENTS } from './CAR_REGISTRY'
import { useGlobalState } from '../../../../state/useGlobalState'
import { carGPSAnimation, getBearing } from '../../../hooks/useAnimation'
import Dashlines from '../Dashlines/Dashlines'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

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
    const dashlineRef = useRef<THREE.Group>(null)

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

    useFrame((_, delta) => {
        if (!dashlineRef.current) return;
        carGPSAnimation(dashlineRef, bearing, delta)
    })

    const CarModel = CAR_COMPONENTS[selectedVehicleId]

    return (
        <Fragment>
            {CarModel && <CarModel latest={latest} bearing={bearing} />}
            <group position={[0, -1.1, 0]} ref={dashlineRef}>
                <Dashlines position={[-1.5, 0, 0]} />
                <Dashlines position={[1.5, 0, 0]} />
            </group>
        </Fragment>
    )
}

export default Cars
