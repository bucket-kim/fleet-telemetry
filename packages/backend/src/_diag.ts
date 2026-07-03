import "dotenv/config";
import { initCosmos, getReadings } from "./db";
import { VEHICLE_INFO } from "../../shared/src/vehicleInfo";

const run = async () => {
  await initCosmos();
  for (const id of Object.keys(VEHICLE_INFO).map(Number)) {
    const r = await getReadings(id);
    const first = r[0] as { vehicleId?: unknown } | undefined;
    console.log(
      `vehicle ${id}: ${r.length} readings | first.vehicleId=${JSON.stringify(first?.vehicleId)} (type ${typeof first?.vehicleId})`,
    );
  }
  process.exit(0);
};
run();
