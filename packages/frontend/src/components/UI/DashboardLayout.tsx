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
import SpeedChart from './components/SpeedChart/SpeedChart'
import { isMobile, useMobileOrientation } from 'react-device-detect'
import { Fragment } from 'react/jsx-runtime'

const DashboardLayout = () => {

    const { isPortrait } = useMobileOrientation();

    const { selectedVehicleId } = useGlobalState((state) => {
        return {
            selectedVehicleId: state.selectedVehicleId
        }
    })

    const { latest, connected, readings } = useGlobalState((state) => {
        return {
            latest: state.latest[selectedVehicleId],
            connected: state.connected,
            readings: state.readings,
        }
    })

    useReadingHistory(selectedVehicleId)
    useVehicleInfo(selectedVehicleId)
    useTelemetryStream()

    const isLoading = !latest;
    const showReconnecting = !connected && latest;

    return (
        <DashboardLayoutStyleContainer>
            <AnimatePresence>
                {isLoading && (
                    <Loader key={'loader'} />
                )}
                {showReconnecting && (
                    <Reconnect />
                )}
            </AnimatePresence>
            <ConnectionStatus />
            <Notifications />
            {/* main content containers */}
            <Header />
            <div className="layout-container">
                <div className='upper-container'>
                    <R3F />
                    <LocationMap />
                </div>
                {isMobile && isPortrait ? (
                    <Fragment>
                        <SpeedChart readings={readings} />
                        <Metrics />
                    </Fragment>
                ) : (
                    <Fragment>

                        <Metrics />
                        <SpeedChart readings={readings} />
                    </Fragment>

                )}

            </div>
        </DashboardLayoutStyleContainer>
    )
}

export default DashboardLayout
