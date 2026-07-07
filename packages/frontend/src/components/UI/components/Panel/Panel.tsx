import { Fragment, useEffect, useMemo, useRef, useState } from "react"
import { useGlobalState } from "../../../../state/useGlobalState"
import { PanelStyleContainer } from "./PanelStyleContainer"
import { usePanelConfig } from "./config/PanelConfig"
import PanelWidget from "./PanelWidget/PanelWidget"


const Panel = () => {

    const { fleetSummary } = useGlobalState((state) => {
        return {
            fleetSummary: state.fleetSummary
        }
    })

    const [panelValue, setPanelValue] = useState<string | null>(null)

    const PANEL_CONFIG = usePanelConfig(fleetSummary)

    const PanelSection = useMemo(() => {
        return Object.entries(PANEL_CONFIG).map(([key, value]) => (
            <Fragment>
                <button key={key} className="panel-button" onClick={() => setPanelValue(value.value)}>
                    <img src={value.img} alt="" />
                    <p>{value.label}</p>
                </button>
            </Fragment>
        )
        )
    }, [PANEL_CONFIG])

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
                {PanelSection}
            </PanelStyleContainer>
            {panelValue && (
                <PanelWidget panelValue={panelValue} handleClick={() => setPanelValue(null)} panelWidth={panelWidth} />
            )}
        </Fragment>
    )
}

export default Panel
