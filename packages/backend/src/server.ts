import express from "express";
import { createServer } from "http";
import WebSocket, { WebSocketServer } from "ws";
import { ClientMessage, TelemetryReading } from "@fleet/shared";
import { VEHICLE_INFO } from "../../shared/src/vehicleInfo";
import { getReadings, initCosmos } from "./db";
import cors from "cors";
import {
  initEventHub,
  sendReading,
  startAnalyticsConsumer,
  startConsumer,
} from "./eventhub";
import { computeTripMetrics } from "./computeMetrics";

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled rejection (caught, not crashing):", reason);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught exception (caught, not crashing):", err);
});

const USE_EVENT_HUBS = process.env.USE_EVENT_HUBS === "true";
// start app with express

const app = express();

app.use(cors());

const server = createServer(app);

const subscriptions = new Map<WebSocket, Set<number>>();

app.get("/readings/:vehicleId", async (req, res) => {
  const vehicleId = Number(req.params.vehicleId);
  try {
    const readings = await getReadings(vehicleId);
    res.json(readings);
  } catch (err) {
    console.error(`/readings/${vehicleId} failed:`, (err as Error).message);
    res.status(500).json({
      error: "Failed to fetch readings",
    });
  }
});

app.get("/vehicle/:vehicleId", async (req, res) => {
  const vehicleId = Number(req.params.vehicleId);
  const info = VEHICLE_INFO[vehicleId];

  if (!info) {
    return res.status(404).json({ error: "Vehicle not found" });
  }

  res.json(info);
});

app.get("/metrics/:vehicldId", async (req, res) => {
  const vehicldId = Number(req.params.vehicldId);
  const readings = await getReadings(vehicldId);
  const metrics = computeTripMetrics(readings);

  res.json(metrics);
});

server.listen(8080, () => console.log("HTTP + WS on :8080"));

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");

  subscriptions.set(ws, new Set());

  ws.on("message", (raw) => {
    const msg = JSON.parse(raw.toString()) as ClientMessage;
    if (msg.type === "setSubscriptions") {
      subscriptions.set(ws, new Set(msg.vehicleIds));
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log("WebSocket server running on ws://localhost:8080");

// const readings = loadReadings();

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const broadcast = (reading: TelemetryReading) => {
  for (const [ws, vehicleIds] of subscriptions) {
    if (ws.readyState === WebSocket.OPEN && vehicleIds.has(reading.vehicleId)) {
      ws.send(JSON.stringify(reading));
    }
  }
};

const replay = async (readings: TelemetryReading[]) => {
  if (readings.length === 0) return;

  // let firstLapDone = false;

  while (true) {
    let i = 0;
    while (i < readings.length) {
      const pause =
        i === 0 ? 0 : readings[i].timestamp - readings[i - 1].timestamp;
      await sleep(pause);
      if (USE_EVENT_HUBS) {
        await sendReading(readings[i]);
      } else {
        broadcast(readings[i]);
        // wss.clients.forEach((client) => {
        //   if (client.readyState === WebSocket.OPEN) {
        //     client.send(JSON.stringify(readings[i]));
        //   }
        // });
      }
      // await sendReading(readings[i]);
      // if (!firstLapDone) {
      //   saveReadings(readings[i]).catch((err) => {
      //     console.error(
      //       "Saved failed for reading ",
      //       readings[i].timestamp,
      //       err.message,
      //     );
      //   });
      // }

      // wss.clients.forEach((client) => {
      //   if (client.readyState === WebSocket.OPEN) {
      //     client.send(JSON.stringify(readings[i]));

      //   }
      // });

      i++;
    }

    // firstLapDone = true;
  }
};

const startServer = async () => {
  await initCosmos();

  const vehicleIDs = Object.keys(VEHICLE_INFO).map(Number);

  if (USE_EVENT_HUBS) {
    await initEventHub();
    startConsumer(wss);
    startAnalyticsConsumer();
  }

  for (const vehicleId of vehicleIDs) {
    try {
      const readings = await getReadings(vehicleId);
      if (readings.length === 0) {
        console.warn(`Vehicle ${vehicleId}: 0 readings — skipping.`);
        continue;
      }
      console.log(
        `Vehicle ${vehicleId}: replaying ${readings.length} readings.`,
      );
      replay(readings); // ← the ONE replay function branches internally
    } catch (err) {
      console.error(`Vehicle ${vehicleId}: failed —`, (err as Error).message);
    }
  }
};

startServer();
