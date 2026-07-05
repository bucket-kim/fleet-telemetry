import * as THREE from 'three'
import { useRef, type FC } from 'react'
import { useGLTF } from '@react-three/drei'
import { type GLTF } from 'three-stdlib'
import MercedesModel from './mercedes-transformed.glb?url'
import type { CarsProps } from '../CAR_REGISTRY'
import { useFrame } from '@react-three/fiber'
import { carGPSAnimation, tireRotationAnimation } from '../../../../hooks/useAnimation'

type GLTFResult = GLTF & {
  nodes: {
    Object_4001: THREE.Mesh
    Object_4001_1: THREE.Mesh
    Object_4001_2: THREE.Mesh
    Object_4001_3: THREE.Mesh
    Object_4002: THREE.Mesh
    Object_4002_1: THREE.Mesh
    Object_4002_2: THREE.Mesh
    Object_4002_3: THREE.Mesh
    Object_72001: THREE.Mesh
    Object_75001: THREE.Mesh
    Object_78001: THREE.Mesh
    Object_80001: THREE.Mesh
    Object_83001: THREE.Mesh
    Object_85001: THREE.Mesh
    Object_87001: THREE.Mesh
    Object_90001: THREE.Mesh
    Object_93001: THREE.Mesh
    Object_96001: THREE.Mesh
    Object_99001: THREE.Mesh
    Object_102001: THREE.Mesh
    Object_104001: THREE.Mesh
    Object_107001: THREE.Mesh
    Object_110001: THREE.Mesh
    Object_112001: THREE.Mesh
    Object_115001: THREE.Mesh
    Object_117001: THREE.Mesh
    Object_119001: THREE.Mesh
    Object_122001: THREE.Mesh
    Object_124001: THREE.Mesh
    Object_127001: THREE.Mesh
    Object_130001: THREE.Mesh
    Object_133001: THREE.Mesh
    Object_4004: THREE.Mesh
    Object_4004_1: THREE.Mesh
    Object_4004_2: THREE.Mesh
    Object_4004_3: THREE.Mesh
  }
  materials: {
    MMercedesAMG_GT_2015CalliperBadgeA_Material1: THREE.MeshStandardMaterial
    MMercedesAMG_GT_2015_Wheel1A_3D_3DWheel1A_Material1: THREE.MeshStandardMaterial
    phong4: THREE.MeshStandardMaterial
    MMercedesAMG_GT_2015CalliperGloss_Material1: THREE.MeshStandardMaterial
    MMercedesAMG_GT_2015Coloured_Material1: THREE.MeshStandardMaterial
    MMercedesAMG_GT_2015ManufacturerPlateA_Material1: THREE.MeshStandardMaterial
    MMercedesAMG_GT_2015LightA_Material1: THREE.MeshStandardMaterial
    mETAL_lIGHT: THREE.MeshStandardMaterial
    MMercedesAMG_GT_2015WindowInside_Material1: THREE.MeshPhysicalMaterial
    RED_GLASS: THREE.MeshStandardMaterial
    ORANGE_GLASS: THREE.MeshStandardMaterial
    MMercedesAMG_GT_2015EngineA_Material1: THREE.MeshStandardMaterial
    MMercedesAMG_GT_2015Carbon1_Material1: THREE.MeshPhysicalMaterial
    MMercedesAMG_GT_2015Base_Material1: THREE.MeshStandardMaterial
    MMercedesAMG_GT_2015Grille2A_Material1: THREE.MeshStandardMaterial
    MMercedesAMG_GT_2015InteriorA_Material1: THREE.MeshStandardMaterial
    emiss: THREE.MeshStandardMaterial
    MMercedesAMG_GT_2015BadgeA_Material1: THREE.MeshStandardMaterial
    MMercedesAMG_GT_2015Paint_Material1: THREE.MeshStandardMaterial
    color_2: THREE.MeshStandardMaterial
    MMercedesAMG_GT_2015Grille1A_Material1: THREE.MeshStandardMaterial
    MMercedesAMG_GT_2015Grille3A_Material1: THREE.MeshStandardMaterial
    MMercedesAMG_GT_2015InteriorColourZoneA_Material1: THREE.MeshStandardMaterial
  }
}

export const Mercedes: FC<CarsProps> = ({ latest, bearing }) => {
  const tireBackrightRef = useRef<THREE.Group>(null);
  const tireFrontrightRef = useRef<THREE.Group>(null);
  const tireBackLeftRef = useRef<THREE.Group>(null);
  const tireFrontLeftRef = useRef<THREE.Group>(null);
  const carRef = useRef<THREE.Group>(null)

  const { nodes, materials } = useGLTF(MercedesModel) as unknown as GLTFResult;

  useFrame((_, delta) => {
    tireRotationAnimation(tireBackrightRef, tireFrontrightRef, tireBackLeftRef, tireFrontLeftRef, latest, delta)

    carGPSAnimation(carRef, bearing, delta)
  })

  return (
    <group dispose={null} ref={carRef}>
      <group name="tire_backLeft" position={[1.477, -0.508, -2.118]} ref={tireBackLeftRef}>
        <mesh name="Object_4001" geometry={nodes.Object_4001.geometry} material={materials.MMercedesAMG_GT_2015CalliperBadgeA_Material1} />
        <mesh name="Object_4001_1" geometry={nodes.Object_4001_1.geometry} material={materials.MMercedesAMG_GT_2015_Wheel1A_3D_3DWheel1A_Material1} />
        <mesh name="Object_4001_2" geometry={nodes.Object_4001_2.geometry} material={materials.phong4} />
        <mesh name="Object_4001_3" geometry={nodes.Object_4001_3.geometry} material={materials.MMercedesAMG_GT_2015CalliperGloss_Material1} />
      </group>
      <group name="tire_frontLeft" position={[1.477, -0.508, 2.213]} ref={tireFrontLeftRef}>
        <mesh name="Object_4002" geometry={nodes.Object_4002.geometry} material={materials.MMercedesAMG_GT_2015CalliperBadgeA_Material1} />
        <mesh name="Object_4002_1" geometry={nodes.Object_4002_1.geometry} material={materials.MMercedesAMG_GT_2015_Wheel1A_3D_3DWheel1A_Material1} />
        <mesh name="Object_4002_2" geometry={nodes.Object_4002_2.geometry} material={materials.phong4} />
        <mesh name="Object_4002_3" geometry={nodes.Object_4002_3.geometry} material={materials.MMercedesAMG_GT_2015CalliperGloss_Material1} />
      </group>
      <mesh name="Object_72001" geometry={nodes.Object_72001.geometry} material={materials.MMercedesAMG_GT_2015Coloured_Material1} position={[0, -0.022, -0.003]} />
      <mesh name="Object_75001" geometry={nodes.Object_75001.geometry} material={materials.MMercedesAMG_GT_2015ManufacturerPlateA_Material1} position={[0, -0.022, -0.003]} />
      <mesh name="Object_78001" geometry={nodes.Object_78001.geometry} material={materials.MMercedesAMG_GT_2015LightA_Material1} position={[0, -0.022, -0.003]} />
      <mesh name="Object_80001" geometry={nodes.Object_80001.geometry} material={materials.mETAL_lIGHT} position={[0, -0.022, -0.003]} />
      <mesh name="Object_83001" geometry={nodes.Object_83001.geometry} material={materials.MMercedesAMG_GT_2015WindowInside_Material1} position={[0, -0.022, -0.003]} />
      <mesh name="Object_85001" geometry={nodes.Object_85001.geometry} material={materials.RED_GLASS} position={[0, -0.022, -0.003]} />
      <mesh name="Object_87001" geometry={nodes.Object_87001.geometry} material={materials.ORANGE_GLASS} position={[0, -0.022, -0.003]} />
      <mesh name="Object_90001" geometry={nodes.Object_90001.geometry} material={materials.MMercedesAMG_GT_2015EngineA_Material1} position={[0, -0.022, -0.003]} />
      <mesh name="Object_93001" geometry={nodes.Object_93001.geometry} material={materials.MMercedesAMG_GT_2015Carbon1_Material1} position={[0, -0.022, -0.003]} />
      <mesh name="Object_96001" geometry={nodes.Object_96001.geometry} material={materials.MMercedesAMG_GT_2015Base_Material1} position={[0, -0.022, -0.003]} />
      <mesh name="Object_99001" geometry={nodes.Object_99001.geometry} material={materials.MMercedesAMG_GT_2015Grille2A_Material1} position={[0, -0.022, -0.003]} />
      <mesh name="Object_102001" geometry={nodes.Object_102001.geometry} material={materials.MMercedesAMG_GT_2015InteriorA_Material1} position={[0, -0.022, -0.003]} />
      <mesh name="Object_104001" geometry={nodes.Object_104001.geometry} material={materials.emiss} position={[0, -0.022, -0.003]} />
      <mesh name="Object_107001" geometry={nodes.Object_107001.geometry} material={materials.MMercedesAMG_GT_2015BadgeA_Material1} position={[0, -0.022, -0.003]} />
      <mesh name="Object_110001" geometry={nodes.Object_110001.geometry} material={materials.MMercedesAMG_GT_2015WindowInside_Material1} position={[0, -0.022, -0.003]} />
      <mesh name="Object_112001" geometry={nodes.Object_112001.geometry} material={materials.RED_GLASS} position={[0, -0.022, -0.003]} />
      <mesh name="Object_115001" geometry={nodes.Object_115001.geometry} material={materials.MMercedesAMG_GT_2015Paint_Material1} position={[0, -0.022, -0.003]} />
      <mesh name="Object_117001" geometry={nodes.Object_117001.geometry} material={materials.color_2} position={[0, -0.022, -0.003]} />
      <mesh name="Object_119001" geometry={nodes.Object_119001.geometry} material={materials.mETAL_lIGHT} position={[0, -0.022, -0.003]} />
      <mesh name="Object_122001" geometry={nodes.Object_122001.geometry} material={materials.MMercedesAMG_GT_2015Coloured_Material1} position={[0, -0.022, -0.003]} />
      <mesh name="Object_124001" geometry={nodes.Object_124001.geometry} material={materials.mETAL_lIGHT} position={[0, -0.022, -0.003]} />
      <mesh name="Object_127001" geometry={nodes.Object_127001.geometry} material={materials.MMercedesAMG_GT_2015Grille1A_Material1} position={[0, -0.022, -0.003]} />
      <mesh name="Object_130001" geometry={nodes.Object_130001.geometry} material={materials.MMercedesAMG_GT_2015Grille3A_Material1} position={[0, -0.022, -0.003]} />
      <mesh name="Object_133001" geometry={nodes.Object_133001.geometry} material={materials.MMercedesAMG_GT_2015InteriorColourZoneA_Material1} position={[0, -0.022, -0.003]} />
      <group name="tire_frontRight" position={[-1.469, -0.508, 2.213]} ref={tireFrontrightRef}>
        <mesh name="Object_4004" geometry={nodes.Object_4004.geometry} material={materials.MMercedesAMG_GT_2015CalliperBadgeA_Material1} />
        <mesh name="Object_4004_1" geometry={nodes.Object_4004_1.geometry} material={materials.MMercedesAMG_GT_2015_Wheel1A_3D_3DWheel1A_Material1} />
        <mesh name="Object_4004_2" geometry={nodes.Object_4004_2.geometry} material={materials.phong4} />
        <mesh name="Object_4004_3" geometry={nodes.Object_4004_3.geometry} material={materials.MMercedesAMG_GT_2015CalliperGloss_Material1} />
      </group>
      <group name="tire_backRight" position={[-1.469, -0.508, -2.115]} ref={tireBackrightRef}>
        <mesh name="Object_4004" geometry={nodes.Object_4004.geometry} material={materials.MMercedesAMG_GT_2015CalliperBadgeA_Material1} />
        <mesh name="Object_4004_1" geometry={nodes.Object_4004_1.geometry} material={materials.MMercedesAMG_GT_2015_Wheel1A_3D_3DWheel1A_Material1} />
        <mesh name="Object_4004_2" geometry={nodes.Object_4004_2.geometry} material={materials.phong4} />
        <mesh name="Object_4004_3" geometry={nodes.Object_4004_3.geometry} material={materials.MMercedesAMG_GT_2015CalliperGloss_Material1} />
      </group>
    </group>
  )
}

useGLTF.preload(MercedesModel)
