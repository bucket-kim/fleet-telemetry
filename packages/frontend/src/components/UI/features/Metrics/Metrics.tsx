
import { MetricsStyleContainer } from './MetricsStyleContainer'
import MetricGuageCard from '../../components/Guage/MetricGuageCard'
import VehicleInfo from '../VehicleInfo/VehicleInfo'
import { useGlobalState } from '../../../../state/useGlobalState'
import { useMemo } from 'react'

const batterImg = "/svg/battery.svg"
const speedometerImg = "/svg/speedometer.svg"

const Metrics = () => {

  const { latest, vehicleInfo } = useGlobalState((state) => {
    return {
      latest: state.latest,
      vehicleInfo: state.vehicleInfo
    }
  })

  const hasBattery = useMemo(() => {
    return vehicleInfo?.powertrain !== "ICE"
  }, [vehicleInfo])

  return (
    <MetricsStyleContainer>
      <MetricGuageCard icon={speedometerImg} label={"SPEED"} value={latest?.speed ?? 0} unit={"km/h"} min={0} max={240} colorA='#3D86ED' colorB='#68a7f3' />
      <MetricGuageCard icon={batterImg} label={"SoC"} value={latest?.socPercent != null ? Math.round(latest.socPercent * 100) / 100 : 0}
        unit={"%"} min={0} max={100} colorA='#1f9a4c' colorB='#32db81' />
      {hasBattery ? (
        <MetricGuageCard icon={speedometerImg} label={"power"} value={latest?.kw != null ? Math.round(latest.kw * 10) / 10 : 0} unit={"kW"} min={-50} max={50} colorA='#e17000' colorB='#ffd60b' />
      ) : (
        <MetricGuageCard icon={speedometerImg} label={"RPM"} value={latest?.rpm ?? 0} unit={"rpm"} min={0} max={8000} colorA='#e17000' colorB='#ffd60b' />

      )}
      <VehicleInfo />

    </MetricsStyleContainer>
  )
}

export default Metrics
