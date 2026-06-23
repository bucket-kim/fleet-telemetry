import WebSocket from "ws";
import { TelemetryReading } from "@fleet/shared";

const ws = new WebSocket("ws://localhost:8080");

ws.on("open", () => {
  console.log("Connected to the server!");
});

ws.on("close", () => {
  console.log("Disconnected.");
});

ws.on("message", (data) => {
  const reading = JSON.parse(data.toString()) as TelemetryReading;
  console.log(
    "Received: ",
    reading.timestamp / 1000,
    "speed: ",
    reading.speed,
    "tripId: ",
    reading.trip,
  );
});
