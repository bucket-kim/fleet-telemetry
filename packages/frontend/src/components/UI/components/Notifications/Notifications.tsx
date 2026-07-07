
import type { Alert } from '@fleet/shared';
import { useGlobalState } from '../../../../state/useGlobalState'
import { NotificationStyleContainer } from './NotificationStyleContainer'
import { Fragment, useEffect, useRef, useState } from 'react';
import ToastItem from './Toast/ToastItem';
import useGetAlert from '../../../hooks/useGetAlert';

const Notifications = () => {

    const { selectedVehicleId } = useGlobalState((state) => {
        return {
            selectedVehicleId: state.selectedVehicleId
        }
    })
    const { latest } = useGlobalState((state) => {
        return { latest: state.latest[selectedVehicleId] }
    })

    const getAlert = useGetAlert();

    const notificationRef = useRef<HTMLDivElement>(null);
    const prevAlertIds = useRef<Set<string>>(new Set())
    const [toasts, setToasts] = useState<Alert[]>([])



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

            <NotificationStyleContainer ref={notificationRef}>
                {toasts.map((toast) => (
                    <ToastItem alert={toast} key={toast.id} />
                ))}
            </NotificationStyleContainer>
        </Fragment>
    )
}

export default Notifications
