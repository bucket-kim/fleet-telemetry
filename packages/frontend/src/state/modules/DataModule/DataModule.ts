import type { TelemetryReading } from "@fleet/shared";
import type { GlobalStateApiType } from "../../GlobalStateTypes";
import type { signalType, VehicleInfoType } from "./DataModuleTypes";

export const DataModule = ({ set }: GlobalStateApiType) => {
  return {
    selectedVehicleId: 10,
    setSelectedVehicleId: (id: number) => {
      set({ selectedVehicleId: id });
    },

    readings: [],
    setReadings: (readings: TelemetryReading[]) => {
      set({ readings: readings });
    },

    latest: {},
    setLatest: (reading: TelemetryReading) => {
      set((state) => ({
        latest: { ...state.latest, [reading.vehicleId]: reading },
      }));
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

    signal: "speed" as signalType,
    setSignal: (signal: signalType) => {
      set({ signal: signal });
    },
  };
};
