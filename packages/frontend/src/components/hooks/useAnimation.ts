type Coord = { lat: number; lng: number };
import type { TelemetryReading } from "@fleet/shared";
import type { RefObject } from "react";
import * as THREE from "three";

const SPEED_FACTOR = 0.75;

export const tireRotationAnimation = (
  tireBR: RefObject<THREE.Group | null>,
  tireFR: RefObject<THREE.Group | null>,
  tireBL: RefObject<THREE.Group | null>,
  tireFL: RefObject<THREE.Group | null>,
  latest: TelemetryReading | null,
  delta: number,
) => {
  const rotationSpeed = (latest?.speed ?? 0) * SPEED_FACTOR;
  if (!tireBR.current || !tireFR.current || !tireBL.current || !tireFL.current)
    return;

  tireBR.current.rotation.x += rotationSpeed * delta;
  tireFR.current.rotation.x += rotationSpeed * delta;
  tireBL.current.rotation.x += rotationSpeed * delta;
  tireFL.current.rotation.x += rotationSpeed * delta;
};

const toRad = (deg: number) => (deg * Math.PI) / 180;

export const getBearing = (prev: Coord, curr: Coord): number => {
  const dLon = toRad(curr.lng - prev.lng);
  const y = Math.sin(dLon) * Math.cos(toRad(curr.lat));
  const x =
    Math.cos(toRad(prev.lat)) * Math.sin(toRad(curr.lat)) -
    Math.sin(toRad(prev.lat)) * Math.cos(toRad(curr.lat)) * Math.cos(dLon);

  return Math.atan2(y, x);
};
