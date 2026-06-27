import { useEffect } from "react";
import { useGlobalState } from "../../state/useGlobalState";
import type { TelemetryReading } from "@fleet/shared";
import { API_BASE } from "../../const/variable";

export const useReadingHistory = (vehicleId: number) => {
  const { setReadings } = useGlobalState((state) => {
    return {
      setReadings: state.setReadings,
    };
  });

  useEffect(() => {
    fetch(`${API_BASE}/readings/${vehicleId}`)
      .then((res) => res.json())
      .then((data: TelemetryReading[]) => {
        setReadings(data);
      });
  }, [vehicleId]);
};
