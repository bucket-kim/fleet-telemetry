import * as THREE from "three";
import type { GLTF } from "three/examples/jsm/Addons.js";

export interface TelemetryReading {
  vehicleId: number;
  trip: number;
  timestamp: number;
  speed: number;
  socPercent: number | null;
  rpm: number | null;
  kw: number | null;
  gps: {
    latitude: number;
    longitude: number;
  };
}

export type GLTFResult = GLTF & {
  nodes: {
    Cube002: THREE.Mesh;
    boot011: THREE.Mesh;
    boot010: THREE.Mesh;
    boot009: THREE.Mesh;
    boot008: THREE.Mesh;
    Plane006: THREE.Mesh;
    Plane005: THREE.Mesh;
    boot007: THREE.Mesh;
    window_rear001: THREE.Mesh;
    boot006: THREE.Mesh;
    boot005: THREE.Mesh;
    boot004: THREE.Mesh;
    boot003: THREE.Mesh;
    rearLight: THREE.Mesh;
    boot002: THREE.Mesh;
    boot001: THREE.Mesh;
    Mesh_11: THREE.Mesh;
    Mesh_12: THREE.Mesh;
    Plane004_1: THREE.Mesh;
    Plane004_2: THREE.Mesh;
    Plane004_3: THREE.Mesh;
    bumper_front009: THREE.Mesh;
    headLight: THREE.Mesh;
    Plane014: THREE.Mesh;
    Plane014_1: THREE.Mesh;
    Plane014_2: THREE.Mesh;
    Cube001: THREE.Mesh;
    Cylinder008: THREE.Mesh;
    Cylinder008_1: THREE.Mesh;
    Cylinder008_2: THREE.Mesh;
    Cylinder008_3: THREE.Mesh;
    underbody: THREE.Mesh;
    boot: THREE.Mesh;
    Plane004: THREE.Mesh;
    Plane003: THREE.Mesh;
    Plane002: THREE.Mesh;
    Plane008: THREE.Mesh;
    Plane008_1: THREE.Mesh;
    Mesh_16: THREE.Mesh;
    Mesh_17: THREE.Mesh;
    Cylinder004: THREE.Mesh;
    Cylinder004_1: THREE.Mesh;
    Cylinder004_2: THREE.Mesh;
    Cylinder004_3: THREE.Mesh;
    boot012: THREE.Mesh;
  };
  materials: {
    full_black: THREE.MeshStandardMaterial;
    coat: THREE.MeshStandardMaterial;
    plastic: THREE.MeshStandardMaterial;
    silver: THREE.MeshStandardMaterial;
    paint: THREE.MeshStandardMaterial;
    window: THREE.MeshStandardMaterial;
    tex_shiny: THREE.MeshStandardMaterial;
    glass: THREE.MeshStandardMaterial;
    lights: THREE.MeshStandardMaterial;
    rubber: THREE.MeshStandardMaterial;
    ["Material.001"]: THREE.MeshStandardMaterial;
  };
};
