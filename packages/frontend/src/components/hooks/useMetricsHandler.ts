import { useMemo } from "react";
import type { TelemetryReading } from "@fleet/shared";

const useMetricsHandler = (readings: TelemetryReading[]) => {
  const haversine = (
    p1: { latitude: number; longitude: number },
    p2: { latitude: number; longitude: number },
  ): number => {
    const toRad = (deg: number) => (deg * Math.PI) / 180;

    const dLat = toRad(p2.latitude - p1.latitude);
    const dLng = toRad(p2.longitude - p1.longitude);
    const lat1 = toRad(p1.latitude);
    const lat2 = toRad(p2.latitude);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return 6371 * c;
  };

  const tripDistance = (readings: TelemetryReading[]): number => {
    let total = 0;
    for (let i = 1; i < readings.length; i++) {
      total += haversine(readings[i - 1]?.gps, readings[i]?.gps);
    }

    return total;
  };

  const tripDuration = (readings: TelemetryReading[]) => {
    if (readings.length < 2) return 0;
    return readings[readings.length - 1].timestamp - readings[0].timestamp;
  };

  const tripSpeed = (readings: TelemetryReading[]) => {
    if (readings.length === 0) return { avg: 0, max: 0 };
    let sum = 0,
      max = 0;
    for (const r of readings) {
      sum += r.speed;
      if (r.speed > max) max = r.speed;
    }

    return { avg: sum / readings.length, max };
  };

  const distance = useMemo(() => {
    const roundedString = tripDistance(readings!).toFixed(2);
    return parseFloat(roundedString);
  }, [readings]);

  const tripEnergy = (readings: TelemetryReading[]) => {
    let consumed = 0;
    let recovered = 0;
    // let energyInterval = 0;
    for (let i = 1; i < readings.length; i++) {
      const kWValue = readings[i].kw;
      if (kWValue == null) continue;
      const interval =
        (kWValue * (readings[i].timestamp - readings[i - 1].timestamp)) / 3600;

      if (interval > 0) {
        consumed += interval;
      } else {
        recovered += Math.abs(interval);
      }
    }
    // return energyInterval
    return { consumed, recovered };
  };

  const energy = useMemo(() => tripEnergy(readings), [readings]);

  const duration = tripDuration(readings);
  const avgSpeed = tripSpeed(readings).avg.toFixed(2);
  const maxSpeed = tripSpeed(readings).max.toFixed(2);

  const consumed = (energy.consumed / distance).toFixed(2);
  const recovered = (energy.recovered / distance).toFixed(2);

  return { distance, consumed, recovered, duration, avgSpeed, maxSpeed };
};

export default useMetricsHandler;
