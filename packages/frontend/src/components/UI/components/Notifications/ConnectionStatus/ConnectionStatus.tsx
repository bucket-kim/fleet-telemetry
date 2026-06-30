import { useEffect, useRef } from 'react'
import { useGlobalState } from '../../../../../state/useGlobalState';
import { ConnectionStatusStyleContainer } from './ConnectionStatusStyleContainer';
import { AnimatePresence } from 'framer-motion';

const ConnectionStatus = () => {

    const { latest, isOffline, setIsOffline } = useGlobalState((state) => {
        return {
            latest: state.latest,
            isOffline: state.isOffline,
            setIsOffline: state.setIsOffline,
        }
    })

    const lastReadingTime = useRef<number>(0)

    useEffect(() => {
        if (latest) {
            lastReadingTime.current = Date.now()
            if (isOffline) setIsOffline(false);
        }
    }, [latest, isOffline, setIsOffline])

    useEffect(() => {
        const interval = setInterval(() => {
            const elapsed = Date.now() - lastReadingTime.current;
            if (elapsed > 5000) {
                setIsOffline(true)
            }
        }, 1000)

        return () => clearInterval(interval)
    }, [setIsOffline])

    return (
        <AnimatePresence>
            {isOffline && (
                <ConnectionStatusStyleContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .3, ease: 'easeInOut' }}>
                    <div className="container">
                        <h1>Offline</h1>
                        <p>No data received</p>
                    </div>
                </ConnectionStatusStyleContainer>
            )}
        </AnimatePresence>
    )
}

export default ConnectionStatus
