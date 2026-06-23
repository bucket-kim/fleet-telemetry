import { Box, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

const R3F = () => {
    return (
        <Canvas
            camera={{ position: [3, 3, 3], fov: 35 }}
        >
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <OrbitControls />
            <Box>
                <meshNormalMaterial />
            </Box>
        </Canvas>
    )
}

export default R3F
