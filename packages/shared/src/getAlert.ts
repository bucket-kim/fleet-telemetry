import type { Alert, TelemetryReading } from "./types";

export const getAlert = (latest: TelemetryReading | null): Alert[] => {
  if (!latest) return [];

  const alerts: Alert[] = [];

  // SoC Low
  if (latest.socPercent != null && latest.socPercent < 20) {
    alerts.push({
      id: "low-soc",
      severity: "critical",
      message: "Low Battery",
    });
  }

  // Overspeed
  if (latest.speed > 120) {
    alerts.push({
      id: "overspeed",
      severity: "warning",
      message: "Speed exceeds limit",
    });
  }

  // high power draw
  if (latest.kw != null && latest.kw < -35) {
    alerts.push({
      id: "high-regen",
      severity: "warning",
      message: "Hard regenerative braking",
    });
  }

  return alerts;
};
