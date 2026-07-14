import { useGlobalState } from "../../../../state/useGlobalState"
import { useTripConfig } from "../Panel/config/TripConfig"


const TripEnergy = () => {

    const { tripMetrics } = useGlobalState((state) => {
        return {
            tripMetrics: state.tripMetrics,
        }
    })

    const TRIP_CONFIG = useTripConfig(tripMetrics)

    return (
        <div className="trip-energy">
            <h1>Trip Summary</h1>
            {Object.entries(TRIP_CONFIG).map(([key, value]) => (
                <p key={key}>
                    {value.label}
                    <span>{value.value}</span>
                </p>
            ))}
        </div>
    )
}

export default TripEnergy
