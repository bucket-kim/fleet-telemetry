import LocationMap from './features/LocationMap/LocationMap'
import Metrics from './features/Metrics/Metrics'
import { DashboardLayoutStyleContainer } from './DashboardLayoutStyleContainer'
import R3F from '../R3F/R3F'
import { useReadingHistory } from '../hooks/useReadingHistory'
import { useVehicleInfo } from '../hooks/useVehicleInfo'
import { useTelemetryStream } from '../hooks/useTelemetryStream'
import { useGlobalState } from '../../state/useGlobalState'
import Loader from './components/Loader/Loader'
import { AnimatePresence } from 'framer-motion'

const DashboardLayout = () => {
    useReadingHistory(10)
    useVehicleInfo(10)
    useTelemetryStream()

    const { latest, connected } = useGlobalState((state) => {
        return {
            latest: state.latest,
            connected: state.connected,
        }
    })

    const isLoading = !latest || !connected

    return (
        <DashboardLayoutStyleContainer>
            <AnimatePresence>
                {isLoading && (
                    <Loader key={'loader'} />
                )}
            </AnimatePresence>
            {/* <Loader isLoading={isLoading} key={'loader'} /> */}
            <div className="layout-container">
                <div className='upper-container'>
                    <R3F />
                    <LocationMap />
                </div>
                <Metrics />

            </div>
        </DashboardLayoutStyleContainer>
    )
}

export default DashboardLayout
