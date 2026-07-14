import { useEffect } from 'react';
import { useGlobalState } from '../../../../state/useGlobalState';
import useMetricsHandler from '../../../hooks/useMetricsHandler';

const TripMetrics = () => {

    const { readings, tripMetrics } = useGlobalState((state) => {
        return {
            readings: state.readings,
            tripMetrics: state.tripMetrics,
        };
    });

    const { distance } = useMetricsHandler(readings)

    useEffect(() => {
        console.log(tripMetrics)
    }, [tripMetrics])

    return (
        <div className="distance">
            <p>Total Distance: {distance} km</p>
        </div>
    )
}

export default TripMetrics
