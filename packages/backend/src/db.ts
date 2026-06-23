import "dotenv/config";
import { Container, CosmosClient } from "@azure/cosmos";
import { TelemetryReading } from "@fleet/shared";

const client = new CosmosClient({
  endpoint: process.env.COSMOS_ENDPOINT!,
  key: process.env.COSMOS_KEY!,
});

let container: Container;

export const initCosmos = async () => {
  const { database } = await client.databases.createIfNotExists({
    id: "fleet",
  });

  const result = await database.containers.createIfNotExists({
    id: "readings",
    partitionKey: "/vehicleId",
  });

  container = result.container;
};

export const saveReadings = async (reading: TelemetryReading) => {
  const resourceId = `${reading.vehicleId}-${reading.trip}-${reading.timestamp}`;

  await container.items.upsert({ ...reading, id: resourceId });
};

export const getReadings = async (
  vehicleId: number,
): Promise<TelemetryReading[]> => {
  const { resources } = await container.items
    .query({
      query: "SELECT * FROM c WHERE c.vehicleId = @vehicleId",
      parameters: [{ name: "@vehicleId", value: vehicleId }],
    })
    .fetchAll();

  return resources;
};
