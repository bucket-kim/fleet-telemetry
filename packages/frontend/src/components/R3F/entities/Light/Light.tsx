import { Environment } from '@react-three/drei'
import { Fragment } from 'react'

const Light = () => {
    return (
        <Fragment>
            <ambientLight intensity={.5} />
            <directionalLight position={[5, 5, 5]} intensity={6} />
            <Environment preset='city' />
        </Fragment>
    )
}

export default Light
