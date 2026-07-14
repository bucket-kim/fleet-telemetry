import type { TelemetryReading, TripMetricTypes } from "@fleet/shared";

export interface VehicleInfoType {
  vehicleId: number;
  powertrain: "EV" | "PHEV" | "HEV" | "ICE";
  model?: string;
}

export type signalType = "speed" | "socPercent" | "kw" | "rpm";

export type fleetSummaryType = {
  onlineCount: number;
  avgSpeed: number;
  activeAlerts: number;
};

export interface DataModuletypes {
  selectedVehicleId: number;
  setSelectedVehicleId: (id: number) => void;

  readings: TelemetryReading[];
  setReadings: (readings: TelemetryReading[]) => void;

  latest: Record<number, TelemetryReading>;
  setLatest: (latest: TelemetryReading) => void;

  vehicleInfo: VehicleInfoType | null;
  setVehicleInfo: (info: VehicleInfoType) => void;

  connected: boolean;
  setConnected: (connected: boolean) => void;

  isOffline: boolean;
  setIsOffline: (isOffline: boolean) => void;

  signal: signalType;
  setSignal: (signal: signalType) => void;

  fleetSummary: fleetSummaryType;
  getFleetSummary: () => void;

  tripMetrics: TripMetricTypes;
  setTripMetrics: (tripMetrics: TripMetricTypes) => void;
}
