import "dotenv/config";
import { Container, CosmosClient } from "@azure/cosmos";
import { AlertRecord, TelemetryReading } from "@fleet/shared";

const client = new CosmosClient({
  endpoint: process.env.COSMOS_ENDPOINT!,
  key: process.env.COSMOS_KEY!,
});

type Containers = { readings: Container; alerts: Container };

let containers: Containers | null = null;
let initPromise: Promise<Containers> | null = null;

// Lazily create/connect the DB + containers, retrying on failure. If the very
// first attempt fails (e.g. Cosmos/subscription was temporarily unavailable at
// boot), the next DB call re-attempts instead of the process being stuck
// serving 500s until a manual restart.
const ensureCosmos = async (): Promise<Containers> => {
  if (containers) return containers;

  if (!initPromise) {
    initPromise = (async () => {
      const { database } = await client.databases.createIfNotExists({
        id: "fleet",
      });
      const { container: readings } =
        await database.containers.createIfNotExists({
          id: "readings",
          partitionKey: "/vehicleId",
        });
      const { container: alerts } =
        await database.containers.createIfNotExists({
          id: "alerts",
          partitionKey: { paths: ["/vehicleId"] },
        });
      return { readings, alerts };
    })().catch((err) => {
      initPromise = null; // allow a fresh retry on the next call
      throw err;
    });
  }

  containers = await initPromise;
  return containers;
};

// Kept for server startup; now just warms the connection (and no longer fatal
// if it fails — the first real DB call will retry).
export const initCosmos = ensureCosmos;

export const saveReadings = async (reading: TelemetryReading) => {
  const { readings } = await ensureCosmos();
  const resourceId = `${reading.vehicleId}-${reading.dayNum}-${reading.trip}-${reading.timestamp}`;
  await readings.items.upsert({ ...reading, id: resourceId });
};

export const saveAlert = async (alert: AlertRecord) => {
  const { alerts } = await ensureCosmos();
  await alerts.items.upsert(alert);
};

export const getReadings = async (
  vehicleId: number,
): Promise<TelemetryReading[]> => {
  const { readings } = await ensureCosmos();
  const { resources } = await readings.items
    .query({
      query:
        "SELECT * FROM c WHERE c.vehicleId = @vehicleId ORDER BY c.timestamp",
      parameters: [{ name: "@vehicleId", value: vehicleId }],
    })
    .fetchAll();

  return resources;
};
