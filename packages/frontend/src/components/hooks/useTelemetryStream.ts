import { useEffect, useRef } from "react";
import { useGlobalState } from "../../state/useGlobalState";
import type { TelemetryReading } from "@fleet/shared";
import { WS_URL } from "../../const/variable";

export const useTelemetryStream = () => {
  const { setLatest, setConnected } = useGlobalState((state) => {
    return {
      setLatest: state.setLatest,
      setConnected: state.setConnected,
    };
  });

  const reconnectAttempt = useRef(0);
  const reconnectTimer = useRef<number | null>(null);

  useEffect(() => {
    let ws: WebSocket;
    let isUnmounting = false;

    const connect = () => {
      ws = new WebSocket(`${WS_URL}`);

      ws.onopen = () => {
        setConnected(true);
        reconnectAttempt.current = 0;
      };

      ws.onmessage = (event) => {
        const readings: TelemetryReading = JSON.parse(event.data);
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
};
