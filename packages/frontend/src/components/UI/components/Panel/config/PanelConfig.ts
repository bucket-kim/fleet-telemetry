import type { fleetSummaryType } from "../../../../../state/modules/DataModule/DataModuleTypes";

export const usePanelConfig = (fleetSummary: fleetSummaryType) => {
  const PANEL_CONFIG = {
    onlineCount: {
      value: `${fleetSummary.onlineCount} Vehicles`,
      label: "Vehicles",
      img: "/svg/car.svg",
    },
    avgSpeed: {
      value: `${Math.floor(fleetSummary.avgSpeed * 100) / 100} km/h`,
      label: "Avg Speed",
      img: "/svg/barChart.svg",
    },
    activeAlerts: {
      value: fleetSummary.activeAlerts
        ? `${fleetSummary.activeAlerts} notifications`
        : "No alerts yet",
      label: "Alerts",
      img: "/svg/bell.svg",
    },
  };

  return PANEL_CONFIG;
};
