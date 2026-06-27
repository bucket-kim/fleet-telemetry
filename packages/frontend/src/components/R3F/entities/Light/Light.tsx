import { Environment } from '@react-three/drei'
import React, { Fragment } from 'react'

const Light = () => {
    return (
        <Fragment>
            <Environment preset='city' />
        </Fragment>
    )
}

export default Light
