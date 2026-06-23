import React, { type FC } from 'react'
import { MetricGuageCardStyleContainer } from './MetricGuageCardStyleContainer';

interface MetricGuageCardProps {
    icon: string;
    label: string;
    value: number;
    unit: string;
    min: number;
    max: number
}

const MetricGuageCard: FC<MetricGuageCardProps> = ({ icon, label, value, unit, min, max }) => {
    return (
        <MetricGuageCardStyleContainer>
            <div className="card-header">
                <img src={icon} alt="" />
                <span>{label}</span>
            </div>
            <div className="card-unit">
                <p>{value}</p>
                <span>{unit}</span>
            </div>
            <div className="card-metrics">
                <span>
                    {min}
                </span>
                <span>
                    {max}
                </span>
            </div>
        </MetricGuageCardStyleContainer>
    )
}

export default MetricGuageCard
