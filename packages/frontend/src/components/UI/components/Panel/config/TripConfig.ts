import { VEHICLE_INFO } from "@fleet/shared";
import { useGlobalState } from "../../../../../state/useGlobalState";
import type { TripMetrics } from "../../../../../state/modules/DataModule/DataModuleTypes";

export const useTripConfig = (metrics: TripMetrics) => {
  const { selectedVehicleId } = useGlobalState((state) => {
    return {
      selectedVehicleId: state.selectedVehicleId,
    };
  });

  const isEV = VEHICLE_INFO[selectedVehicleId].powertrain !== "ICE";

  const fmtDuration = (ms: number) => {
    const s = ms / 1000;
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const sec = Math.floor(s % 60)
      .toString()
      .padStart(2, "0");
    return `${h}:${m}:${sec}`;
  };

  const { consumed, recovered, duration, avgSpeed, maxSpeed } = metrics;

  const evOnly = {
    energyUsed: {
      value: `${consumed} kWh`,
      label: "Energy Used",
      img: "/svg/...",
    },
    regen: {
      value: `${recovered} kWh`,
      label: "Regen Recovered",
      img: "/svg/...",
    },
  };

  const base = {
    tripTime: {
      value: fmtDuration(duration),
      label: "Trip Time",
      img: "/svg/...",
    },
    avgSpeed: {
      value: `${avgSpeed} km/h`,
      label: "Avg Speed",
      img: "/svg/...",
    },
    maxSpeed: {
      value: `${maxSpeed} km/h`,
      label: "Max Speed",
      img: "/svg/...",
    },
  };

  return isEV ? { ...base, ...evOnly } : base;
};
