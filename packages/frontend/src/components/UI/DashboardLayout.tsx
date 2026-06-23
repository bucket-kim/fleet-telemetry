import type { TelemetryReading } from '@fleet/shared'
import React, { useEffect, useState } from 'react'
import LocationMap from './features/LocationMap/LocationMap'
import Metrics from './features/Metrics/Metrics'
import { DashboardLayoutStyleContainer } from './DashboardLayoutStyleContainer'
import R3F from '../R3F/R3F'

const DashboardLayout = () => {


    const [readings, setReadings] = useState<TelemetryReading[]>([])

    useEffect(() => {
        fetch("http://localhost:8080/readings/10")
            .then((res) => res.json())
            .then((data: TelemetryReading[]) => {
                console.log("Got reading: ", data.length, data[0])
                setReadings(data)
            })
    }, [])

    return (
        <DashboardLayoutStyleContainer>
            <h1>HI</h1>
            <span>Loaded {readings.length} readings</span>
            <div className="layout-container">
                <div className='upper-container'>
                    <R3F />
                    <LocationMap />
                </div>
                <div className="lower-container">

                    <Metrics />
                </div>
            </div>
        </DashboardLayoutStyleContainer>
    )
}

export default DashboardLayout
