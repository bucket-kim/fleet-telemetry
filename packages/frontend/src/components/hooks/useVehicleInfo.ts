import { useEffect } from "react";
import { useGlobalState } from "../../state/useGlobalState";
import type { VehicleInfoType } from "../../state/modules/DataModule/DataModuleTypes";
import { API_BASE } from "../../const/variable";

export const useVehicleInfo = (vehicleId: number) => {
  const { setVehicleInfo } = useGlobalState((state) => {
    return {
      setVehicleInfo: state.setVehicleInfo,
    };
  });

  useEffect(() => {
    fetch(`${API_BASE}/vehicle/${vehicleId}`)
      .then((res) => res.json())
      .then((info: VehicleInfoType) => setVehicleInfo(info));
  }, [vehicleId]);
};
