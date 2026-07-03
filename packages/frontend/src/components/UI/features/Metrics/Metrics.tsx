
import { MetricsStyleContainer } from './MetricsStyleContainer'
import MetricGuageCard from '../../components/Guage/MetricGuageCard'
import VehicleInfo from '../VehicleInfo/VehicleInfo'
import { useGlobalState } from '../../../../state/useGlobalState'
import { useEffect, useMemo } from 'react'

const batterImg = "/svg/battery.svg"
const speedometerImg = "/svg/speedometer.svg"

const Metrics = () => {
  const { selectedVehicleId } = useGlobalState((state) => {
    return {
      selectedVehicleId: state.selectedVehicleId
    }
  })
  const { latest, vehicleInfo, setSignal } = useGlobalState((state) => {
    return {
      latest: state.latest[selectedVehicleId],
      vehicleInfo: state.vehicleInfo,
      setSignal: state.setSignal,
    }
  })

  const hasBattery = useMemo(() => {
    return vehicleInfo?.powertrain !== "ICE"
  }, [vehicleInfo])

  useEffect(() => {
    console.log(latest)
  }, [latest])

  return (
    <MetricsStyleContainer>

      <MetricGuageCard icon={speedometerImg} label={"SPEED"} value={latest?.speed ?? 0} unit={"km/h"} min={0} max={240} colorA='#3D86ED' colorB='#68a7f3' handleClick={() => setSignal('speed')} />
      <MetricGuageCard icon={batterImg} label={"SoC"} value={latest?.socPercent != null ? Math.round(latest.socPercent * 100) / 100 : 0}
        unit={"%"} min={0} max={100} colorA='#1f9a4c' colorB='#32db81' handleClick={() => setSignal('socPercent')} />
      {hasBattery ? (
        <MetricGuageCard icon={speedometerImg} label={"power"} value={latest?.kw != null ? Math.round(latest.kw * 10) / 10 : 0} unit={"kW"} min={-50} max={50} colorA='#e17000' colorB='#ffd60b' handleClick={() => setSignal('kw')} />
      ) : (
        <MetricGuageCard icon={speedometerImg} label={"RPM"} value={latest?.rpm ?? 0} unit={"rpm"} min={0} max={8000} colorA='#e17000' colorB='#ffd60b' handleClick={() => setSignal('kw')} />

      )}
      <div className="vehicleInfo">
        <VehicleInfo />
      </div>

    </MetricsStyleContainer>
  )
}

export default Metrics
