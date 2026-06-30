import { useGlobalState } from '../../../../state/useGlobalState'
import { HeaderStyleContainer } from './HeaderStyleContainer'

const Header = () => {

    const { isOffline } = useGlobalState((state) => {
        return {
            isOffline: state.isOffline
        }
    })

    return (
        <HeaderStyleContainer>
            <div className="left-header">
                <h3>Fleet</h3>
                <p>Telemetry</p>
            </div>
            <div className="right-header">
                <span>
                    <div className='online-circle' style={{ backgroundColor: isOffline ? "#da231a" : "#27c456", borderRadius: "50%" }} />
                    <p>
                        Vehicle {isOffline ? "offline" : "online"}
                    </p>
                </span>
            </div>
        </HeaderStyleContainer>
    )
}

export default Header
