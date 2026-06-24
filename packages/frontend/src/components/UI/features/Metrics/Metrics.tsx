
import { MetricsStyleContainer } from './MetricsStyleContainer'
import MetricGuageCard from '../../components/Guage/MetricGuageCard'
import VehicleInfo from '../VehicleInfo/VehicleInfo'
import { useGlobalState } from '../../../../state/useGlobalState'

const batterImg = "/svg/battery.svg"
const speedometerImg = "/svg/speedometer.svg"

const Metrics = () => {

  const { latest } = useGlobalState((state) => {
    return {
      latest: state.latest
    }
  })

  return (
    <MetricsStyleContainer>
      <MetricGuageCard icon={speedometerImg} label={"SPEED"} value={latest?.speed ?? 0} unit={"km/h"} min={0} max={240} colorA='#3D86ED' colorB='#68a7f3' />
      <MetricGuageCard icon={batterImg} label={"SoC"} value={(Math.round((latest?.socPercent * 100) / 100) ?? 0)} unit={"%"} min={0} max={100} colorA='#1f9a4c' colorB='#32db81' />
      <MetricGuageCard icon={speedometerImg} label={"RPM"} value={latest?.rpm ?? 0} unit={"rpm"} min={0} max={8} colorA='#e17000' colorB='#ffd60b' />
      <VehicleInfo />

    </MetricsStyleContainer>
  )
}

export default Metrics
