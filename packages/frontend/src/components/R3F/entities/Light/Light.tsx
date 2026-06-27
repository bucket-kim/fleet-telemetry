import { Environment } from '@react-three/drei'
import { Fragment } from 'react'

const Light = () => {
    return (
        <Fragment>
            <Environment preset='city' />
        </Fragment>
    )
}

export default Light
