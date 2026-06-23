import express from "express";
import { createServer } from "http";
import WebSocket, { WebSocketServer } from "ws";
import { loadReadings } from "./loadTrip";
import { TelemetryReading } from "@fleet/shared";
import { VEHICLE_INFO } from "../../shared/src/vehicleInfo";
import { getReadings, initCosmos, saveReadings } from "./db";
import cors from "cors";

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled rejection (caught, not crashing):", reason);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught exception (caught, not crashing):", err);
});

// start app with express

const app = express();

app.use(cors());

const server = createServer(app);

app.get("/readings/:vehicleId", async (req, res) => {
  const vehicleId = Number(req.params.vehicleId);
  try {
    const readings = await getReadings(vehicleId);
    res.json(readings);
  } catch (err) {
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

server.listen(8080, () => console.log("HTTP + WS on :8080"));

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");

  //   ws.send("Hello from the server!");

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log("WebSocket server running on ws://localhost:8080");

const readings = loadReadings();

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const replay = async (readings: TelemetryReading[]) => {
  let firstLapDone = false;

  while (true) {
    let i = 0;
    while (i < readings.length) {
      const pause =
        i === 0 ? 0 : readings[i].timestamp - readings[i - 1].timestamp;
      await sleep(pause);

      if (!firstLapDone) {
        saveReadings(readings[i]).catch((err) => {
          console.error(
            "Saved failed for reading ",
            readings[i].timestamp,
            err.message,
          );
        });
      }

      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(readings[i]));
        }
      });

      i++;
    }

    firstLapDone = true;
  }
};

const startServer = async () => {
  await initCosmos();
  replay(readings);
};

startServer();
