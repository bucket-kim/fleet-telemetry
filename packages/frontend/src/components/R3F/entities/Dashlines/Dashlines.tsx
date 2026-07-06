
import { useFrame } from "@react-three/fiber";
import { useRef, type FC } from "react";
import * as THREE from 'three';
import vertexShader from '../Materials/DashlineShader/Vertex.glsl'
import fragmentShader from '../Materials/DashlineShader/Fragment.glsl'
import { useGlobalState } from "../../../../state/useGlobalState";

interface DashlinesProps {
    position: [number, number, number]
}

const Dashlines: FC<DashlinesProps> = ({ position }) => {

    const { selectedVehicleId } = useGlobalState((state) => {
        return {
            selectedVehicleId: state.selectedVehicleId
        }
    })
    const { latest } = useGlobalState((state) => {
        return {
            latest: state.latest[selectedVehicleId]
        }
    })

    const materialRef = useRef<THREE.ShaderMaterial>(null);

    useFrame((_, delta) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uOffset.value += (latest?.speed ?? 0) * 0.05 * delta;
        }
    });

    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={position}>
            <planeGeometry args={[.1, 10]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                transparent
                uniforms={{
                    uOffset: { value: 0 },
                    uColor: { value: new THREE.Color("#E1EDF7") },
                }}
            />
        </mesh>
    )
}

export default Dashlines
