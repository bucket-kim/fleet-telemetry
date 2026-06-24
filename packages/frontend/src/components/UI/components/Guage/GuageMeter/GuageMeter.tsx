import React, { useId, type FC } from 'react'

interface GuageMeterProps {
    label: string;
    value: number;
    unit: string;
    colorA: string;
    colorB: string;
    max: number;
    min: number
}

const GuageMeter: FC<GuageMeterProps> = ({ label, value, unit, colorA, colorB, max, min }) => {
    const CX = 100;
    const CY = 100;
    const R = 80; // centerline radius of the stroked arc

    const polar = (angleDeg: number, radius = R) => {
        const a = (angleDeg * Math.PI) / 180;
        return { x: CX + radius * Math.cos(a), y: CY - radius * Math.sin(a) };
    };

    const ARC_PATH = (() => {
        const s = polar(180);
        const e = polar(0);
        return `M ${s.x} ${s.y} A ${R} ${R} 0 0 1 ${e.x} ${e.y}`;
    })();

    const NEEDLE_POINTS = `${CX},${CY - 60} ${CX + 6},${CY} ${CX},${CY + 4} ${CX - 6},${CY}`;

    const safeValue = Number.isFinite(value) ? value : min;
    const fraction = max > min ? Math.min(Math.max((safeValue - min) / (max - min), 0), 1) : 0;

    const needleAngle = 180 * fraction - 90;

    const gradientId = `gauge-grad-${useId().replace(/:/g, '')}`;

    return (
        <svg
            className="gauge-svg"
            viewBox="0 0 200 112"
            role="img"
            aria-label={`${label}: ${value} ${unit}`}
        >
            <defs>
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={colorA} />
                    <stop offset="100%" stopColor={colorB} />
                </linearGradient>
            </defs>

            <path className="gauge-track" d={ARC_PATH} />

            {fraction > 0 && (
                <path
                    className="gauge-fill"
                    d={ARC_PATH}
                    stroke={`url(#${gradientId})`}
                    pathLength={100}
                    strokeDasharray={100}
                    strokeDashoffset={100 * (1 - fraction)}
                />
            )}

            {/* needle + center hub */}
            <g className="gauge-needle" transform={`rotate(${needleAngle} ${CX} ${CY})`}>
                <polygon points={NEEDLE_POINTS} />
            </g>
            <circle className="gauge-hub" cx={CX} cy={CY} r={7} />
        </svg>
    )
}

export default GuageMeter
