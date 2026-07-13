import {
  EventHubConsumerClient,
  EventHubProducerClient,
} from "@azure/event-hubs";
import { getAlert, type TelemetryReading } from "@fleet/shared";
import { saveAlert } from "./db";
import { WebSocket, WebSocketServer } from "ws";
import { ContainerClient } from "@azure/storage-blob";
import { BlobCheckpointStore } from "@azure/eventhubs-checkpointstore-blob";

let producer: EventHubProducerClient;

const connectionString = process.env.EVENTHUB_CONNECTION_STRING;
const storageString = process.env.STORAGE_CONNECTION_STRING;

export const initEventHub = () => {
  producer = new EventHubProducerClient(connectionString!, "telemetry");
};

export const sendReading = async (reading: TelemetryReading) => {
  const batch = await producer.createBatch({
    partitionKey: String(reading.vehicleId),
  });

  batch.tryAdd({ body: reading });
  await producer.sendBatch(batch);
  //   console.log("sent to EH:", reading.vehicleId, reading.timestamp);
};

export const startConsumer = (wss: WebSocketServer) => {
  const consumer = new EventHubConsumerClient(
    "$Default",
    connectionString!,
    "telemetry",
  );

  consumer.subscribe(
    {
      processEvents: async (events) => {
        for (const event of events) {
          const reading = event.body as TelemetryReading;

          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify(reading));
            }
          });
        }
      },
      processError: async (err) => {
        console.error("consumer error: ", err);
      },
    },
    {
      startPosition: {
        enqueuedOn: new Date(),
      },
    },
  );
};

export const startAnalyticsConsumer = () => {
  if (!connectionString) throw new Error("EVENTHUB_CONNECTION_STRING is not set");
  if (!storageString) throw new Error("STORAGE_CONNECTION_STRING is not set");
  if (!storageString.startsWith("DefaultEndpointsProtocol=")) {
    throw new Error(
      "STORAGE_CONNECTION_STRING must be an Azure Storage account connection string " +
        "starting with 'DefaultEndpointsProtocol=https;...'. Did you accidentally " +
        "prefix it with 'Endpoint=' (that's the Event Hub format)?",
    );
  }

  // Created lazily (not at module load) so importing this file never requires
  // the storage/eventhub config — only starting the analytics consumer does.
  const containerClient = new ContainerClient(storageString, "checkpoints");
  const checkpointStore = new BlobCheckpointStore(containerClient);

  const consumer = new EventHubConsumerClient(
    "analytics",
    connectionString,
    "telemetry",
    checkpointStore,
  );

  consumer.subscribe({
    processEvents: async (events, context) => {
      for (const event of events) {
        const reading = event.body as TelemetryReading;
        const alerts = getAlert(reading);
        if (alerts.length)
          console.log(
            "alerts:",
            reading.vehicleId,
            alerts.map((a) => a.id),
          );
        for (const alert of alerts) {
          await saveAlert({
            id: `${reading.vehicleId}-${reading.dayNum}-${reading.trip}-${reading.timestamp}-${alert.id}`,
            vehicleId: reading.vehicleId,
            trip: reading.trip,
            timestamp: reading.timestamp,
            alertId: alert.id,
            severity: alert.severity,
            message: alert.message,
          });
        }
      }
      if (events.length) {
        await context.updateCheckpoint(events[events.length - 1]);
      }
    },
    processError: async (err) =>
      console.error("analytics consumer error: ", err),
  });
};
