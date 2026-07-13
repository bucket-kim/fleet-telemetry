import { getAlert, type TelemetryReading } from "@fleet/shared";
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
      set((state) => {
        {
          const latest = { ...state.latest, [reading.vehicleId]: reading };
          const readings = Object.values(latest);
          return {
            latest: { ...state.latest, [reading.vehicleId]: reading },
            fleetSummary: {
              onlineCount: readings.length,
              avgSpeed:
                readings.reduce((sum, r) => sum + r.speed, 0) / readings.length,
              activeAlerts: readings.reduce(
                (sum, r) => sum + getAlert(r).length,
                0,
              ),
            },
          };
        }
      });
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

    fleetSummary: {
      onlineCount: 0,
      avgSpeed: 0,
      activeAlerts: 0,
    },
  };
};
