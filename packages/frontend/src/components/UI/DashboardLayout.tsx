import LocationMap from './features/LocationMap/LocationMap'
import Metrics from './features/Metrics/Metrics'
import { DashboardLayoutStyleContainer } from './DashboardLayoutStyleContainer'
import R3F from '../R3F/R3F'
import { useReadingHistory } from '../hooks/useReadingHistory'
import { useVehicleInfo } from '../hooks/useVehicleInfo'
import { useTelemetryStream } from '../hooks/useTelemetryStream'

const DashboardLayout = () => {
    useReadingHistory(10)
    useVehicleInfo(10)
    useTelemetryStream()

    return (
        <DashboardLayoutStyleContainer>
            <div className="layout-container">
                <div className='upper-container'>
                    <R3F />
                    <LocationMap />
                </div>
                <div className="lower-container">

                    <Metrics />
                </div>
            </div>
        </DashboardLayoutStyleContainer>
    )
}

export default DashboardLayout
