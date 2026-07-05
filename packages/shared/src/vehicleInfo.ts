export interface VehicleInfoType {
  vehicleId: number;
  powertrain: "EV" | "PHEV" | "HEV" | "ICE";
  model?: string;
  modelFile: string;
}

export const VEHICLE_INFO: Record<number, VehicleInfoType> = {
  10: {
    vehicleId: 10,
    powertrain: "EV",
    model: "NX1 Performance",
    modelFile: "./porsche-transformed.glb?url",
  },
  8: {
    vehicleId: 8,
    powertrain: "ICE",
    model: "KB2 Vehicle",
    modelFile: "./mercedes-transformed.glb?url",
  },
  // 139: {
  //   vehicleId: 139,
  //   powertrain: "ICE",
  //   model: "139 ICE Vehicle",
  //   modelFile: "./mercedes-transformed.glb?url",
  // },
};
