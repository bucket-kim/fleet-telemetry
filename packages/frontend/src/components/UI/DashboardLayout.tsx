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
import Notifications from './components/Notifications/Notifications'
import ConnectionStatus from './components/Notifications/ConnectionStatus/ConnectionStatus'
import Header from './components/Header/Header'
import Reconnect from './components/Notifications/Reconnect/Reconnect'

const DashboardLayout = () => {
    useReadingHistory(10)
    useVehicleInfo(10)
    useTelemetryStream()

    const { latest, connected, isOffline } = useGlobalState((state) => {
        return {
            latest: state.latest,
            connected: state.connected,
            isOffline: state.isOffline,
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
            <ConnectionStatus />
            <Notifications />
            <AnimatePresence>
                {!connected && isOffline && (
                    <Reconnect />
                )}
            </AnimatePresence>
            {/* main content containers */}
            <Header />
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
