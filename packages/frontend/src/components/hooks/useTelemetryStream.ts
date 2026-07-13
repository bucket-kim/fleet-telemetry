import { useEffect, useRef } from "react";
import { useGlobalState } from "../../state/useGlobalState";
import { WS_URL } from "../../const/variable";

export const useTelemetryStream = () => {
  const { setLatest, setConnected, selectedVehicleId } = useGlobalState(
    (state) => {
      return {
        setLatest: state.setLatest,
        setConnected: state.setConnected,
        selectedVehicleId: state.selectedVehicleId,
      };
    },
  );

  const reconnectAttempt = useRef(0);
  const reconnectTimer = useRef<number | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    let ws: WebSocket;

    let isUnmounting = false;

    const connect = () => {
      ws = new WebSocket(`${WS_URL}`);
      wsRef.current = ws;
      ws.onopen = () => {
        setConnected(true);
        ws.send(
          JSON.stringify({
            type: "setSubscriptions",
            vehicleIds: [selectedVehicleId],
          }),
        );
        reconnectAttempt.current = 0;
      };

      ws.onmessage = (event) => {
        const readings = JSON.parse(event.data);
        setLatest(readings);
      };

      ws.onclose = () => {
        setConnected(false);
        if (isUnmounting) return;

        const delay = Math.min(1000 * 2 ** reconnectAttempt.current, 30000);
        reconnectAttempt.current += 1;
        reconnectTimer.current = window.setTimeout(connect, delay);

        console.log("WS closed");
      };
    };

    connect();

    return () => {
      isUnmounting = true;
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
      ws.close();
    };
  }, []);

  useEffect(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current?.send(
        JSON.stringify({
          type: "setSubscriptions",
          vehicleIds: [selectedVehicleId],
        }),
      );
    }
  }, [selectedVehicleId]);
};
