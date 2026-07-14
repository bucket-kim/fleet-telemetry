import { Fragment, useEffect, useRef, useState } from "react"
import { useGlobalState } from "../../../../state/useGlobalState"
import { PanelStyleContainer } from "./PanelStyleContainer"
import PanelWidget from "./PanelWidget/PanelWidget"
import TripEnergy from "../TripEnergy/TripEnergy"
import PanelSelection from "./PanelSelection/PanelSelection"


const Panel = () => {
    const { fleetSummary } = useGlobalState((state) => {
        return {
            fleetSummary: state.fleetSummary
        }
    })

    const [panelValue, setPanelValue] = useState<string | number | null>(null)

    const PanelRef = useRef<HTMLDivElement>(null);
    const [panelWidth, setPanelWidth] = useState(0);

    useEffect(() => {
        if (PanelRef.current) {
            setPanelWidth(PanelRef.current.clientWidth);
        }
    }, []);

    return (
        <Fragment>
            <PanelStyleContainer ref={PanelRef}>
                <PanelSelection setPanelValue={setPanelValue} fleetSummary={fleetSummary} />
                <TripEnergy />
            </PanelStyleContainer>
            {panelValue && (
                <PanelWidget panelValue={panelValue} handleClick={() => setPanelValue(null)} panelWidth={panelWidth} />
            )}
        </Fragment>
    )
}

export default Panel
