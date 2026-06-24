import { useEffect } from "react";
import { useGlobalState } from "../../state/useGlobalState";
import type { TelemetryReading } from "@fleet/shared";

export const useTelemetryStream = () => {
  const { setLatest, setConnected } = useGlobalState((state) => {
    return {
      setLatest: state.setLatest,
      setConnected: state.setConnected,
    };
  });

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      setConnected(true);
    };

    ws.onmessage = (event) => {
      const readings: TelemetryReading = JSON.parse(event.data);
      setLatest(readings);
    };

    ws.onclose = () => {
      setConnected(false);
      console.log("WS closed");
    };

    return () => ws.close();
  }, []);
};
