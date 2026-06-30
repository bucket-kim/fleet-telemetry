import { useEffect, useRef } from 'react'
import { ReconnectStyleConatiner } from './ReconnectStyleConatiner'
import gsap from 'gsap'
import { useGlobalState } from '../../../../../state/useGlobalState'

const Reconnect = () => {

    const { connected, latest } = useGlobalState((state) => {
        return {
            connected: state.connected,
            latest: state.latest
        }
    })
    const imgRef = useRef<HTMLImageElement>(null);
    const hasReceivedData = useRef(false);

    useEffect(() => {
        if (latest) hasReceivedData.current = true;
    }, [latest])

    useEffect(() => {
        if (connected || !imgRef.current) return;
        const tween = gsap.to(imgRef.current, {
            rotation: 360,
            duration: 2,
            repeat: -1,
            ease: "none"
        })

        return () => {
            tween.kill()
        }
    }, [connected])

    return (
        <ReconnectStyleConatiner initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .3, ease: 'easeInOut' }}>
            <div className="reconnect-ui">
                <p>Reconnecting</p>
                <img src="/svg/loader.svg" alt="" ref={imgRef} />
            </div>
        </ReconnectStyleConatiner>
    )
}

export default Reconnect
