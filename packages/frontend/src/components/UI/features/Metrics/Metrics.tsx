import React from 'react'
import { MetricsStyleContainer } from './MetricsStyleContainer'
import MetricGuageCard from '../../components/Guage/MetricGuageCard'
import VehicleInfo from '../VehicleInfo/VehicleInfo'

const batterImg = "/svg/battery.svg"
const speedometerImg = "/svg/speedometer.svg"

const Metrics = () => {
  return (
    <MetricsStyleContainer>
      <MetricGuageCard icon={speedometerImg} label={"SPEED"} value={82} unit={"km/h"} min={0} max={240} />
      <MetricGuageCard icon={batterImg} label={"SoC"} value={65} unit={"%"} min={0} max={100} />
      <MetricGuageCard icon={speedometerImg} label={"RPM"} value={3240} unit={"rpm"} min={0} max={8} />
      <VehicleInfo />

    </MetricsStyleContainer>
  )
}

export default Metrics
