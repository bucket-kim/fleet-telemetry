import { Porsche } from "./Porsche/Porsche";
import { Mercedes } from "./Mercedes/Mercedes";
import type { FC } from "react";
import type { TelemetryReading } from "@fleet/shared";

export interface CarsProps {
  latest: TelemetryReading | null;
  bearing: number;
}

export const CAR_COMPONENTS: Record<number, FC<CarsProps>> = {
  10: Porsche,
  8: Mercedes,
};
