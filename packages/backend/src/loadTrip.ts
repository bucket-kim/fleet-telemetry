import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { read, readFileSync } from "fs";
import { TelemetryReading } from "@fleet/shared";

const fileName = "VED_171115_week.csv";
const __dirname = dirname(fileURLToPath(import.meta.url));

const num = (cell: string): number | null =>
  cell === "NaN" ? null : parseFloat(cell);

export const loadReadings = (): TelemetryReading[] => {
  const filePath = join(__dirname, "..", "/data", fileName);
  const result = readFileSync(filePath, "utf-8");
  const rows = result.trim().split("\n");
  const dataRows = rows.slice(1);

  return dataRows
    .map((row): TelemetryReading => {
      const c = row.split(",");

      const voltage = num(c[17]);
      const batteryCurrent = num(c[15]);

      const kW =
        voltage !== null && batteryCurrent !== null
          ? (voltage * batteryCurrent) / 1000
          : null;

      return {
        vehicleId: parseFloat(c[1]),
        trip: parseFloat(c[2]),
        timestamp: parseFloat(c[3]),
        speed: Math.round(parseFloat(c[6]) * 100) / 100,
        socPercent: num(c[16]),
        rpm: num(c[8]),
        kw: kW,
        gps: {
          latitude: parseFloat(c[4]),
          longitude: parseFloat(c[5]),
        },
      };
    })
    .filter((r) => r.vehicleId === 10);
};
