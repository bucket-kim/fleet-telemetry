import { useEffect } from "react";
import { useGlobalState } from "../../state/useGlobalState";
import type { TelemetryReading } from "@fleet/shared";

export const useReadingHistory = (vehicleId: number) => {
  const { setReadings } = useGlobalState((state) => {
    return {
      setReadings: state.setReadings,
    };
  });

  useEffect(() => {
    fetch(`http://localhost:8080/readings/${vehicleId}`)
      .then((res) => res.json())
      .then((data: TelemetryReading[]) => {
        setReadings(data);
      });
  }, [vehicleId]);
};
