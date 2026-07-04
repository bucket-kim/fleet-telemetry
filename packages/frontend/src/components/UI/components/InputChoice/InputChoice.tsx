
import { VEHICLE_INFO } from '@fleet/shared';
import { useGlobalState } from '../../../../state/useGlobalState';
import { InputChoiceStyleContainer } from "./InputChoiceStyleContainer";
import OnlineCircle from '../OnlineCircle/OnlineCircle';
import { useMemo } from 'react';

const InputChoice = () => {

    const { setSelectedVehicleId, selectedVehicleId, isOffline, latest } = useGlobalState((state) => {
        return {
            setSelectedVehicleId: state.setSelectedVehicleId,
            selectedVehicleId: state.selectedVehicleId,
            isOffline: state.isOffline,
            latest: state.latest,
        }
    })

    const options = Object.values(VEHICLE_INFO);

    const tripId = useMemo(() => {
        return latest[selectedVehicleId]?.trip
    }, [latest])


    return (
        <InputChoiceStyleContainer>
            <div className="input-container">

                <OnlineCircle />
                <select
                    value={selectedVehicleId}
                    onChange={(e) => setSelectedVehicleId(Number(e.target.value))}
                    className='selection'
                >
                    <div className="options">
                        {options.map((v) => (
                            <option key={v.vehicleId} value={v.vehicleId}>
                                <p>
                                    {v.model}
                                </p>
                                <span>
                                    {isOffline ? "offline" : "online"}
                                </span>
                            </option>
                        ))}
                    </div>
                </select>
            </div>
            <div className="trip-container">
                <p>TRIP ID</p>
                <span>
                    TRP - {tripId}
                </span>
            </div>
        </InputChoiceStyleContainer>
    )
}

export default InputChoice
