export interface VehicleInfoType {
  vehicleId: number;
  powertrain: "EV" | "PHEV" | "HEV" | "ICE";
  model?: string;
}

export const VEHICLE_INFO: Record<number, VehicleInfoType> = {
  10: {
    vehicleId: 10,
    powertrain: "EV",
    model: "NX1 Performance",
  },
};
