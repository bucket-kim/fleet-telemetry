import type { TelemetryReading } from "@fleet/shared";

export interface VehicleInfoType {
  vehicleId: number;
  powertrain: "EV" | "PHEV" | "HEV" | "ICE";
  model?: string;
}

export interface DataModuletypes {
  readings: TelemetryReading[];
  setReadings: (readings: TelemetryReading[]) => void;

  latest: TelemetryReading | null;
  setLatest: (latest: TelemetryReading | null) => void;

  vehicleInfo: VehicleInfoType | null;
  setVehicleInfo: (info: VehicleInfoType) => void;

  connected: boolean;
  setConnected: (connected: boolean) => void;
}
