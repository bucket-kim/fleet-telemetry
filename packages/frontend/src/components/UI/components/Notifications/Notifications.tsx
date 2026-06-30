
import type { Alert, TelemetryReading } from '@fleet/shared';
import { useGlobalState } from '../../../../state/useGlobalState'
import { NotificationStyleContainer } from './NotificationStyleContainer'
import { Fragment, useEffect, useRef, useState } from 'react';
import ToastItem from './Toast/ToastItem';

const Notifications = () => {

    const { latest } = useGlobalState((state) => {
        return { latest: state.latest }
    })

    const notificationRef = useRef<HTMLDivElement>(null);
    const prevAlertIds = useRef<Set<string>>(new Set())
    const [toasts, setToasts] = useState<Alert[]>([])
    // const [isOffline, setIsOffline] = useState(false)
    // const lastReadingTime = useRef<number>(0);

    const getAlert = (latest: TelemetryReading | null): Alert[] => {
        if (!latest) return [];

        const alerts: Alert[] = [];

        // SoC Low
        if (latest.socPercent != null && latest.socPercent < 20) {
            alerts.push({
                id: "low-soc",
                severity: "critical",
                message: "Low Battery"
            })
        }

        // Overspeed
        if (latest.speed > 120) {
            alerts.push({
                id: "overspeed",
                severity: "warning",
                message: "Speed exceeds limit"
            })
        }

        // high power draw
        if (latest.kw != null && latest.kw < -35) {
            alerts.push({
                id: "high-regen",
                severity: "warning",
                message: "Hard regenerative braking"
            })
        }

        return alerts
    }

    // useEffect(() => {
    //     if (latest) {
    //         lastReadingTime.current = Date.now()
    //         setIsOffline(false);
    //     }
    // }, [latest])


    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         const elapsed = Date.now() - lastReadingTime.current;
    //         if (elapsed > 5000) {
    //             setIsOffline(true)
    //         }
    //     }, 1000)

    //     return () => clearInterval(interval)
    // }, [])

    useEffect(() => {
        const currentAlerts = getAlert(latest)
        const currendIds = new Set(currentAlerts.map(a => a.id));

        const newAlerts = currentAlerts.filter(a => !prevAlertIds.current.has(a.id))

        newAlerts.forEach((alert) => {
            console.log(alert)
            setToasts(prev => [...prev, alert])
            setTimeout(() => {
                setToasts(prev => prev.filter(t => t.id !== alert.id))
            }, 4000)
        })

        prevAlertIds.current = currendIds

    }, [latest])

    return (
        <Fragment>
            {/* {isOffline ? (
                <OnlineStatus />
            ) : (

                <NotificationStyleContainer ref={notificationRef}>
                    {toasts.map((toast) => (
                        <ToastItem alert={toast} key={toast.id} />
                    ))}
                </NotificationStyleContainer>
            )} */}

            <NotificationStyleContainer ref={notificationRef}>
                {toasts.map((toast) => (
                    <ToastItem alert={toast} key={toast.id} />
                ))}
            </NotificationStyleContainer>
        </Fragment>
    )
}

export default Notifications
