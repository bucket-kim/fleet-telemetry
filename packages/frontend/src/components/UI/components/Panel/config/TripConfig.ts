import { VEHICLE_INFO, type TripMetricTypes } from "@fleet/shared";
import { useGlobalState } from "../../../../../state/useGlobalState";

export const useTripConfig = (metrics: TripMetricTypes) => {
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

  const evOnly = {
    energyUsed: {
      value: `${metrics.consumed.toFixed(1)} kWh`,
      label: "Energy Used",
      img: "/svg/...",
    },
    regen: {
      value: `${metrics.recovered.toFixed(1)} kWh`,
      label: "Regen Recovered",
      img: "/svg/...",
    },
  };

  const base = {
    tripTime: {
      value: fmtDuration(metrics.duration),
      label: "Trip Time",
      img: "/svg/...",
    },
    avgSpeed: {
      value: `${metrics.avgSpeed.toFixed(1)} km/h`,
      label: "Avg Speed",
      img: "/svg/...",
    },
    maxSpeed: {
      value: `${metrics.maxSpeed.toFixed(1)} km/h`,
      label: "Max Speed",
      img: "/svg/...",
    },
  };

  return isEV ? { ...base, ...evOnly } : base;
};
