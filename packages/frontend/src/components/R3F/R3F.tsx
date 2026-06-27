import { ContactShadows, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Porsche } from './entities/Porsche'
import Light from './entities/Light/Light'

const R3F = () => {
    return (
        <Canvas
            camera={{ position: [0, 4, -12], fov: 35 }}
        >
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <Light />
            <OrbitControls enablePan={false} minDistance={10} maxDistance={12} minPolarAngle={Math.PI / 2.75} maxPolarAngle={Math.PI / 2.25} />
            <Porsche />
            <ContactShadows position={[0, -1, 0]} opacity={.5} />
            {/* <Box>
                <meshNormalMaterial />
            </Box> */}
        </Canvas>
    )
}

export default R3F
