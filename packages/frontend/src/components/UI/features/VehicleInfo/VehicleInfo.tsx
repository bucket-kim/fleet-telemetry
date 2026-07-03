import { VehicleInfoStyleContainer } from './VehicleInfoStyleContainer'
import { useGlobalState } from '../../../../state/useGlobalState'

const carImg = "/svg/car.svg"

const formatTime = (timestamp: number) => {
    const hours = Math.floor(timestamp / 3600);
    const minutes = Math.floor((timestamp % 3600) / 60);
    const seconds = Math.floor(timestamp % 60);

    return [hours, minutes, seconds].map((val) => val.toString().padStart(2, "0")).join(":")

}

const VehicleInfo = () => {
    const { selectedVehicleId } = useGlobalState((state) => {
        return {
            selectedVehicleId: state.selectedVehicleId
        }
    })
    const { vehicleInfo, latest, connected } = useGlobalState((state) => {
        return {
            vehicleInfo: state.vehicleInfo,
            latest: state.latest[selectedVehicleId],
            connected: state.connected,
        }
    })

    const INFO_DATA = [
        {
            img: "/svg/VIN.svg",
            labelTitle: "VIN",
            labelInfo: "NX1PF23A5R1002478",
            color: "#8a94a6"
        },
        {
            img: "/svg/avatar.svg",
            labelTitle: "DRIVER",
            labelInfo: "Brian Kim",
            color: "#8a94a6"
        },
        {
            img: "/svg/online.svg",
            labelTitle: "STATUS",
            labelInfo: connected ? "Online" : "Offline",
            color: connected ? "#27c456" : "#da231a"
        },
        {
            img: "/svg/clock.svg",
            labelTitle: "LAST UPDATE",
            labelInfo: latest?.timestamp != null ? formatTime(latest.timestamp / 1000) : "—",
            color: "#8a94a6"
        },
    ]

    return (
        <VehicleInfoStyleContainer className="vehicleInfo">
            <div className="info-header">
                <div className='header-car-type'>
                    <img src={carImg} alt="header-img" />
                    <span>{vehicleInfo?.powertrain}</span>
                </div>
                <div className="header-info">
                    <span>HERO MODEL</span>
                    <p>{vehicleInfo?.model}</p>
                </div>
            </div>
            <div className="info-content">
                {INFO_DATA.map((data, index) => (
                    <div className="info-label" key={index}>
                        <div className="label">
                            <img src={data.img} alt="label_img" />
                            <span>{data.labelTitle}</span>
                        </div>
                        <p style={{ color: `${data.color}` }}>
                            {data.labelInfo}
                        </p>
                    </div>
                ))}
            </div>
        </VehicleInfoStyleContainer>
    )
}

export default VehicleInfo
