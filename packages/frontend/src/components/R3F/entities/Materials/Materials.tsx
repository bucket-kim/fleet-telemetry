import { MeshTransmissionMaterial } from "@react-three/drei"
import { useMemo } from "react"

export const useMaterials = () => {

  const glassMaterial = useMemo(() => {
    return <MeshTransmissionMaterial thickness={0.15} transmission={1} ior={1.1} backside={true} />
  }, [])
  const redGlassMaterial = useMemo(() => {
    return <MeshTransmissionMaterial thickness={0.1} transmission={.7} ior={1.1} backside={true} color={"#ff0000"} />
  }, [])

  return {
    glassMaterial, redGlassMaterial
  }
}