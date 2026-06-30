import { type FC } from 'react'
import { ToastItemStyleContainer } from './ToastItemStyleContainer'
import type { Alert } from '@fleet/shared';
import { AnimatePresence } from 'framer-motion';

interface ToastItemProps {
    alert: Alert;
}

const ToastItem: FC<ToastItemProps> = ({ alert }) => {
    return (
        <AnimatePresence>
            {alert && (
                <ToastItemStyleContainer $severity={alert.severity} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 3 }}>
                    <p>{alert.message}</p>
                </ToastItemStyleContainer>
            )}
        </AnimatePresence>
    )
}

export default ToastItem
