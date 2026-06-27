
import { useEffect, useRef, useState, type JSX } from 'react'
import { useGLTF } from '@react-three/drei'
import posrcheModel from './porsche-transformed.glb?url'
import type { GLTFResult } from '@fleet/shared'
import { useFrame } from '@react-three/fiber'
import { useGlobalState } from '../../../state/useGlobalState'
import * as THREE from 'three';
import { useMaterials } from './Materials/Materials'
import { getBearing, tireRotationAnimation } from '../../hooks/useAnimation'

const SPEED_FACTOR = 0.75;

export function Porsche(props: JSX.IntrinsicElements['group']) {

  const { latest } = useGlobalState((state) => {
    return {
      latest: state.latest
    }
  })

  const [bearing, setBearing] = useState<number>(0)

  const tireBackrightRef = useRef<THREE.Group>(null);
  const tireFrontrightRef = useRef<THREE.Group>(null);
  const tireBackLeftRef = useRef<THREE.Group>(null);
  const tireFrontLeftRef = useRef<THREE.Group>(null);
  const prevPosition = useRef<{ lat: number, lng: number } | null>(null)
  const carRef = useRef<THREE.Group>(null)

  const { glassMaterial, redGlassMaterial } = useMaterials();

  const { nodes, materials } = useGLTF(posrcheModel) as unknown as GLTFResult;


  useEffect(() => {
    if (!latest) return;
    const current = { lat: latest.gps.latitude, lng: latest.gps.longitude };

    if (prevPosition.current) {
      const moved =
        prevPosition.current.lat !== current.lat ||
        prevPosition.current.lng !== current.lng;

      if (moved) {
        const bearing = getBearing(prevPosition.current, current);
        setBearing(bearing);
      }
    }

    prevPosition.current = current;
  }, [latest]);

  useFrame((_, delta) => {
    tireRotationAnimation(tireBackrightRef, tireFrontrightRef, tireBackLeftRef, tireFrontLeftRef, latest, delta)

    if (!carRef.current) return;
    const current = carRef.current.rotation.y;
    let diff = bearing - current;
    diff = Math.atan2(Math.sin(diff), Math.cos(diff));
    const target = current + diff;
    carRef.current.rotation.y = THREE.MathUtils.damp(current, target, 1, delta * SPEED_FACTOR);
  })

  return (
    <group {...props} dispose={null} ref={carRef}>
      <mesh name="Cube002" geometry={nodes.Cube002.geometry} material={materials.full_black} scale={[0.332, 0.318, 0.318]} />
      <mesh name="boot011" geometry={nodes.boot011.geometry} material={materials.coat} />
      <mesh name="boot010" geometry={nodes.boot010.geometry} material={materials.plastic} />
      <mesh name="boot009" geometry={nodes.boot009.geometry} material={materials.silver} />
      <mesh name="boot008" geometry={nodes.boot008.geometry} material={materials.paint} />
      <mesh name="Plane006" geometry={nodes.Plane006.geometry} material={materials.coat} position={[0, -0.432, 3.75]} rotation={[-3.06, 0, Math.PI]} scale={[0.395, 0.357, 0.395]} />
      <mesh name="Plane005" geometry={nodes.Plane005.geometry} material={materials.coat} position={[0, -0.292, -3.704]} rotation={[0.114, 0, 0]} scale={[0.393, 0.356, 0.393]} />
      <mesh name="boot007" geometry={nodes.boot007.geometry} material={materials.coat} />
      <mesh name="window_rear001" geometry={nodes.window_rear001.geometry} material={materials.full_black} >
        {glassMaterial}
      </mesh>
      <mesh name="boot006" geometry={nodes.boot006.geometry} material={materials.full_black} />
      <mesh name="boot005" geometry={nodes.boot005.geometry} material={materials.paint} />
      <mesh name="boot004" geometry={nodes.boot004.geometry} material={materials.window} >
        {glassMaterial}
      </mesh>
      <mesh name="boot003" geometry={nodes.boot003.geometry} material={materials.tex_shiny} position={[0, 0, -0.003]} />
      <mesh name="rearLight" geometry={nodes.rearLight.geometry} material={materials.tex_shiny} position={[0.005, 0.107, -3.581]}>
        {redGlassMaterial}
      </mesh>
      <mesh name="boot002" geometry={nodes.boot002.geometry} material={materials.paint} />
      <mesh name="boot001" geometry={nodes.boot001.geometry} material={materials.paint} />
      <mesh name="bumper_front009" geometry={nodes.bumper_front009.geometry} material={materials.tex_shiny} />
      <mesh name="headLight" geometry={nodes.headLight.geometry} material={materials.glass} rotation={[-0.006, 0, 0]} scale={1.036} >
        {glassMaterial}
      </mesh>
      <mesh name="Cube001" geometry={nodes.Cube001.geometry} material={materials.plastic} position={[0.036, 0.333, 1.56]} rotation={[0.727, -0.244, 0.073]} scale={[0.014, 0.012, 0.014]} />
      <group name="tire_backRight" position={[-1.336, -0.51, -2.122]} ref={tireBackrightRef}>
        <mesh name="Cylinder008" geometry={nodes.Cylinder008.geometry} material={materials.silver} />
        <mesh name="Cylinder008_1" geometry={nodes.Cylinder008_1.geometry} material={materials.plastic} />
        <mesh name="Cylinder008_2" geometry={nodes.Cylinder008_2.geometry} material={materials.rubber} />
        <mesh name="Cylinder008_3" geometry={nodes.Cylinder008_3.geometry} material={materials['Material.001']} />
      </group>
      <group name="tire_frontRight" position={[-1.336, -0.51, 2.096]} ref={tireFrontrightRef}>
        <mesh name="Cylinder008" geometry={nodes.Cylinder008.geometry} material={materials.silver} />
        <mesh name="Cylinder008_1" geometry={nodes.Cylinder008_1.geometry} material={materials.plastic} />
        <mesh name="Cylinder008_2" geometry={nodes.Cylinder008_2.geometry} material={materials.rubber} />
        <mesh name="Cylinder008_3" geometry={nodes.Cylinder008_3.geometry} material={materials['Material.001']} />
      </group>
      <mesh name="underbody" geometry={nodes.underbody.geometry} material={materials.full_black} />
      <mesh name="boot" geometry={nodes.boot.geometry} material={materials.full_black} />
      <mesh name="Plane004" geometry={nodes.Plane004.geometry} material={materials.paint} position={[-0.488, -0.328, -3.684]} rotation={[-1.461, 0.802, 0.064]} scale={0.059} />
      <mesh name="Plane003" geometry={nodes.Plane003.geometry} material={materials.paint} position={[0.436, -0.117, -3.723]} rotation={[-1.375, 0.797, -0.151]} scale={0.024} />
      <mesh name="Plane002" geometry={nodes.Plane002.geometry} material={materials.paint} position={[-1.053, -0.126, -3.51]} rotation={[-1.957, 0.606, 0.785]} scale={0.024} />
      <group name="windshield" position={[0, 0.007, 0.003]}>
        <mesh name="Plane008" geometry={nodes.Plane008.geometry} material={materials.window} >
          {glassMaterial}
        </mesh>
        <mesh name="Plane008_1" geometry={nodes.Plane008_1.geometry} material={materials.plastic} />
      </group>
      <group name="tire_backLeft" position={[1.336, -0.51, -2.122]} ref={tireBackLeftRef}>
        <mesh name="Cylinder004" geometry={nodes.Cylinder004.geometry} material={materials.silver} />
        <mesh name="Cylinder004_1" geometry={nodes.Cylinder004_1.geometry} material={materials.plastic} />
        <mesh name="Cylinder004_2" geometry={nodes.Cylinder004_2.geometry} material={materials.rubber} />
        <mesh name="Cylinder004_3" geometry={nodes.Cylinder004_3.geometry} material={materials['Material.001']} />
      </group>
      <group name="tire_frontLeft" position={[1.336, -0.51, 2.096]} ref={tireFrontLeftRef}>
        <mesh name="Cylinder004" geometry={nodes.Cylinder004.geometry} material={materials.silver} />
        <mesh name="Cylinder004_1" geometry={nodes.Cylinder004_1.geometry} material={materials.plastic} />
        <mesh name="Cylinder004_2" geometry={nodes.Cylinder004_2.geometry} material={materials.rubber} />
        <mesh name="Cylinder004_3" geometry={nodes.Cylinder004_3.geometry} material={materials['Material.001']} />
      </group>
      <mesh name="boot012" geometry={nodes.boot012.geometry} material={materials.silver} position={[0, -0.645, -3.626]} />
      {/* <mesh name="Mesh_11" geometry={nodes.Mesh_11.geometry} material={materials.plastic} /> */}
      {/* <mesh name="Mesh_12" geometry={nodes.Mesh_12.geometry} material={materials.glass} /> */}
      <mesh name="Plane004_1" geometry={nodes.Plane004_1.geometry} material={materials.plastic} />
      <mesh name="Plane004_2" geometry={nodes.Plane004_2.geometry} material={materials.silver} />
      <mesh name="Plane004_3" geometry={nodes.Plane004_3.geometry} material={materials.lights} />
      <mesh name="Plane014" geometry={nodes.Plane014.geometry} material={materials.silver} />
      <mesh name="Plane014_1" geometry={nodes.Plane014_1.geometry} material={materials.lights} />
      <mesh name="Plane014_2" geometry={nodes.Plane014_2.geometry} material={materials.plastic} />
      <mesh name="Mesh_17" geometry={nodes.Mesh_17.geometry} material={materials.window} />
      {/* <mesh name="Mesh_16" geometry={nodes.Mesh_16.geometry} material={materials.window} /> */}
    </group>
  )
}

useGLTF.preload(posrcheModel)
