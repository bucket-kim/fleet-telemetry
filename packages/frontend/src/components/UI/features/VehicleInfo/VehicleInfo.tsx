import React from 'react'
import { VehicleInfoStyleContainer } from './VehicleInfoStyleContainer'

const INFO_DATA = [
    {
        img: "/svg/VIN.svg",
        labelTitle: "VIN",
        labelInfo: "NX1PF23A5R1002478"
    },
    {
        img: "/svg/VIN.svg",
        labelTitle: "VIN",
        labelInfo: "NX1PF23A5R1002478"
    },
    {
        img: "/svg/VIN.svg",
        labelTitle: "VIN",
        labelInfo: "NX1PF23A5R1002478"
    },
    {
        img: "/svg/VIN.svg",
        labelTitle: "VIN",
        labelInfo: "NX1PF23A5R1002478"
    },
]

const VehicleInfo = () => {
    return (
        <VehicleInfoStyleContainer>
            <div className="info-header">
                <img src="" alt="header-img" />
                <div className="header-info">
                    <span>HERO MODEL</span>
                    <p>NX1 Performance</p>
                </div>
            </div>
            <div className="info-content">
                {INFO_DATA.map((data, index) => (
                    <div className="info-label" key={index}>
                        <div className="label">
                            <img src={data.img} alt="label_img" />
                            <span>{data.labelTitle}</span>
                        </div>
                        <p>
                            {data.labelInfo}
                        </p>
                    </div>
                ))}
            </div>
        </VehicleInfoStyleContainer>
    )
}

export default VehicleInfo
