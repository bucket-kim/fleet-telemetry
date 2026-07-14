import { useGlobalState } from "../../../../state/useGlobalState"
import useMetricsHandler from "../../../hooks/useMetricsHandler"
import { useTripConfig } from "../Panel/config/TripConfig"


const TripEnergy = () => {

    const { readings } = useGlobalState((state) => {
        return {
            readings: state.readings
        }
    })

    const metrics = useMetricsHandler(readings);

    const TRIP_CONFIG = useTripConfig(metrics)


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
