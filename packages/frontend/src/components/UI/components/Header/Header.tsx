import { useGlobalState } from '../../../../state/useGlobalState'
import OnlineCircle from '../OnlineCircle/OnlineCircle'
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
                    <OnlineCircle />
                    <p>
                        Vehicle {isOffline ? "offline" : "online"}
                    </p>
                </span>
            </div>
        </HeaderStyleContainer>
    )
}

export default Header
