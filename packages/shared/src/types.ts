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
