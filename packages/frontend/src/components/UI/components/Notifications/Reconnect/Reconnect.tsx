import { useEffect, useRef } from 'react'
import { ReconnectStyleConatiner } from './ReconnectStyleConatiner'
import gsap from 'gsap'
import { useGlobalState } from '../../../../../state/useGlobalState'
import { AnimatePresence } from 'framer-motion'

const Reconnect = () => {

    const { connected } = useGlobalState((state) => {
        return {
            connected: state.connected
        }
    })
    const imgRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
        if (!imgRef.current) return;

        gsap.to(imgRef.current, {
            rotation: 360,
            duration: 2,
            repeat: -1,
            ease: "none"
        })
    }, [])

    return (
        <AnimatePresence mode='wait'>
            {!connected && (
                <ReconnectStyleConatiner initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .3, ease: 'easeInOut' }}>
                    <div className="reconnect-ui">
                        <p>Reconnecting</p>
                        <img src="/svg/loader.svg" alt="" ref={imgRef} />
                    </div>
                </ReconnectStyleConatiner>
            )}
        </AnimatePresence>
    )
}

export default Reconnect
