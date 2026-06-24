import { useEffect } from "react";
import { useGlobalState } from "../../state/useGlobalState";
import type { VehicleInfoType } from "../../state/modules/DataModule/DataModuleTypes";

export const useVehicleInfo = (vehicleId: number) => {
  const { setVehicleInfo } = useGlobalState((state) => {
    return {
      setVehicleInfo: state.setVehicleInfo,
    };
  });

  useEffect(() => {
    fetch(`http://localhost:8080/vehicle/${vehicleId}`)
      .then((res) => res.json())
      .then((info: VehicleInfoType) => setVehicleInfo(info));
  }, [vehicleId]);
};
