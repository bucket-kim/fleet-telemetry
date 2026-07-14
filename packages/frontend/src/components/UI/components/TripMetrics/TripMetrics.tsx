import { useGlobalState } from '../../../../state/useGlobalState';
import useMetricsHandler from '../../../hooks/useMetricsHandler';

const TripMetrics = () => {

    const { readings } = useGlobalState((state) => {
        return {
            readings: state.readings,
        };
    });

    const { distance } = useMetricsHandler(readings)

    return (
        <div className="distance">
            <p>Total Distance: {distance} km</p>
        </div>
    )
}

export default TripMetrics
