import type { TelemetryReading } from "@fleet/shared";
import type { GlobalStateApiType } from "../../GlobalStateTypes";
import type { VehicleInfoType } from "./DataModuleTypes";

export const DataModule = ({ set }: GlobalStateApiType) => {
  return {
    readings: [],
    setReadings: (readings: TelemetryReading[]) => {
      set({ readings: readings });
    },

    latest: null,
    setLatest: (latest: TelemetryReading | null) => {
      set({ latest: latest });
    },

    vehicleInfo: null,
    setVehicleInfo: (info: VehicleInfoType) => {
      set({ vehicleInfo: info });
    },

    connected: false,
    setConnected: (connected: boolean) => {
      set({ connected: connected });
    },

    isOffline: false,
    setIsOffline: (isOffline: boolean) => {
      set({ isOffline: isOffline });
    },
  };
};
