import * as d3 from 'd3'
import { SpeedChartStyleContainer } from './SpeedChartStyleContainer'
import type { TelemetryReading } from '@fleet/shared';
import { useMemo, type FC } from 'react';
import { useGlobalState } from '../../../../state/useGlobalState';
import { isMobile, useMobileOrientation } from 'react-device-detect';

interface SpeedChartProps {
    readings: TelemetryReading[]
}

const SpeedChart: FC<SpeedChartProps> = ({ readings }) => {

    const { signal } = useGlobalState((state) => {
        return {
            signal: state.signal
        }
    })

    const { isPortrait, isLandscape } = useMobileOrientation()

    const signalConfig = {
        speed: {
            accessor: (d: TelemetryReading) => d.speed,
            domain: [0, 120],
            label: "Speed (km/h)",
            color: "#3D86ED"
        },
        socPercent: {
            accessor: (d: TelemetryReading) => d.socPercent,
            domain: [0, 100],
            label: "Batter (%)",
            color: "#32db81"
        },
        kw: {
            accessor: (d: TelemetryReading) => d.kw,
            domain: [-50, 50],
            label: "Power (kW)",
            color: "#ffb60b"
        },
    }

    const active = signalConfig[signal]

    const width = window.innerWidth;
    const height = isMobile && isPortrait ? 200 : isMobile && isLandscape ? 80 : 280;
    const margin = { top: isMobile && isPortrait ? 25 : isMobile && isLandscape ? 0 : 20, right: 40, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;



    const { linePath, xScale, yScale } = useMemo(() => {
        const xScale = d3.scaleLinear()
            // .domain([0, readings.length - 1])
            .domain([0, readings.length - 1])
            .range([(margin.left / 2) - 3.5, innerWidth]);

        const yScale = d3.scaleLinear()
            .domain(active.domain)
            .range([innerHeight, 0]);

        const line = d3.line<TelemetryReading>()
            .x((_, i) => xScale(i))
            .y(d => yScale(active.accessor(d) as d3.NumberValue));

        return { linePath: line(readings) ?? "", xScale, yScale };
    }, [readings, innerWidth, innerHeight, active]);

    return (
        <SpeedChartStyleContainer>
            <p>{active.label}</p>
            <svg width={innerWidth} height={height} transform={`translate(0, ${margin.top})`}>
                <g >
                    <path d={linePath} fill='none' stroke={active.color} strokeWidth={2} />
                </g>
                {yScale.ticks(isMobile && isLandscape ? 3 : 5).map((tick) => (
                    <g key={tick} transform={`translate(0, ${yScale(tick)})`}>
                        <line x1={0} x2={width} stroke='#67676778' strokeWidth={0.5} />
                        <text x={19} dy={"1.25rem"} textAnchor='end' fill='#888' fontSize={isMobile ? 8 : 12} >
                            {tick}
                        </text>
                    </g>
                ))}

                {xScale.ticks(6).map((tick) => {
                    return (
                        <g key={tick} transform={`translate(${xScale(tick)}, ${innerHeight})`}>
                            <line y1={0} y2={5} stroke="#888" />
                            <text y={20} dx={"0rem"} textAnchor="middle" fill="#888" fontSize={isMobile ? 8 : 12}>
                                {tick}
                            </text>
                        </g>
                    )
                })}
                {/* <text y={height - 10} x={window.innerWidth / 2} textAnchor='middle' fontSize={12}>
                    Indicies
                </text> */}
            </svg>
        </SpeedChartStyleContainer>
    )
}

export default SpeedChart
