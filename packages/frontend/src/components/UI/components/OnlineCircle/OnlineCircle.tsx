
import { useGlobalState } from '../../../../state/useGlobalState'
import { OnelineCircleStyleContainer } from './OnelineCircleStyleContainer'

const OnlineCircle = () => {
    const { isOffline } = useGlobalState((state) => {
        return {

            isOffline: state.isOffline
        }
    })

    return (
        <OnelineCircleStyleContainer>
            <div className='online-circle' style={{ backgroundColor: isOffline ? "#da231a" : "#27c456", borderRadius: "50%" }} />
        </OnelineCircleStyleContainer>
    )
}

export default OnlineCircle
