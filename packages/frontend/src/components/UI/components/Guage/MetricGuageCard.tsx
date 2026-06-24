import { type FC } from 'react'
import { MetricGuageCardStyleContainer } from './MetricGuageCardStyleContainer';
import GuageMeter from './GuageMeter/GuageMeter';

interface MetricGuageCardProps {
    icon: string;
    label: string;
    value: number;
    unit: string;
    min: number;
    max: number;
    colorA: string;
    colorB: string;
}

const MetricGuageCard: FC<MetricGuageCardProps> = ({ icon, label, value, unit, min, max, colorA, colorB }) => {

    return (
        <MetricGuageCardStyleContainer>
            <div className="card-header">
                <img src={icon} alt="" />
                <span>{label}</span>
            </div>
            <div className="card-content">
                <div className="card-unit">
                    <p>{value}</p>
                    <span>{unit}</span>
                </div>
                <div className="card-guage">
                    <GuageMeter label={label} value={value} unit={unit} min={min} max={max} colorA={colorA} colorB={colorB} />
                    <div className="card-metrics">
                        <span>{min}</span>
                        <span>{max}</span>
                    </div>
                </div>
            </div>
        </MetricGuageCardStyleContainer>
    )
}

export default MetricGuageCard
