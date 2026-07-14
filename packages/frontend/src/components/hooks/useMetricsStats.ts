import { useEffect } from "react";
import { API_BASE } from "../../const/variable";
import type { TripMetricTypes } from "@fleet/shared";
import { useGlobalState } from "../../state/useGlobalState";

const useMetricsStats = (vehicldId: number) => {
  const { setTripMetrics } = useGlobalState((state) => {
    return {
      setTripMetrics: state.setTripMetrics,
    };
  });

  useEffect(() => {
    fetch(`${API_BASE}/metrics/${vehicldId}`)
      .then((res) => res.json())
      .then((trip: TripMetricTypes) => {
        setTripMetrics(trip);
      });
  }, [vehicldId]);
};

export default useMetricsStats;
