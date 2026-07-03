import { loadReadings } from "./loadTrip";
import { initCosmos, saveReadings } from "./db";

const seed = async () => {
  const vehicleId = Number(process.argv[2]);

  if (!vehicleId) {
    console.error(`Usage: seed <${vehicleId}>`);
    process.exit(1);
  }

  const readings = loadReadings(vehicleId);

  await initCosmos();

  const BATCH_SIZE = 50;
  for (let i = 0; i < readings.length; i += BATCH_SIZE) {
    const batch = readings.slice(i, i + BATCH_SIZE);
    await Promise.all(batch.map((reading) => saveReadings(reading)));
    console.log(
      `Saved ${Math.min(i + BATCH_SIZE, readings.length)}/${readings.length}`,
    );
  }

  console.log(`Seeded ${readings.length} readings for vehicle ${vehicleId}`);
  console.log(`Loaded ${readings.length} readings for vehicle ${vehicleId}`);
  console.log("Database: fleet, Container: readings");
  process.exit(0);
};

seed();
