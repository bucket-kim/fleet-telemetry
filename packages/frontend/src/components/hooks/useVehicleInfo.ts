import { useEffect } from "react";
import { useGlobalState } from "../../state/useGlobalState";
import type { VehicleInfoType } from "../../state/modules/DataModule/DataModuleTypes";
import { API_BASE } from "../../const/variable";

export const useVehicleInfo = (vehicleId: number) => {
  const { setVehicleInfo, setSelectedVehicleId } = useGlobalState((state) => {
    return {
      setVehicleInfo: state.setVehicleInfo,
      setSelectedVehicleId: state.setSelectedVehicleId,
    };
  });

  useEffect(() => {
    fetch(`${API_BASE}/vehicle/${vehicleId}`)
      .then((res) => res.json())
      .then((info: VehicleInfoType) => {
        setVehicleInfo(info);
        setSelectedVehicleId(vehicleId);
      });
  }, [vehicleId]);
};
