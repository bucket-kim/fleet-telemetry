import { ContactShadows, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Light from './entities/Light/Light'
import { Fragment } from 'react/jsx-runtime'
import Cars from './entities/Cars/Cars'

const R3F = () => {

    return (
        <Fragment>
            <Canvas
                camera={{ position: [0, 4, -12], fov: 35 }}
            >
                <Light />
                <OrbitControls enablePan={false} minDistance={10} maxDistance={12} minPolarAngle={Math.PI / 2.75} maxPolarAngle={Math.PI / 2.25} />
                <Cars />
                <ContactShadows position={[0, -1, 0]} opacity={.5} />
            </Canvas>
        </Fragment>
    )
}

export default R3F
