import { Fragment, type FC } from 'react'
import { usePanelConfig } from '../config/PanelConfig';
import type { fleetSummaryType } from '../../../../../state/modules/DataModule/DataModuleTypes';

interface PanelSelectionProps {
    setPanelValue: (props: string | number) => void;
    fleetSummary: fleetSummaryType
}

const PanelSelection: FC<PanelSelectionProps> = ({ setPanelValue, fleetSummary }) => {

    const PANEL_CONFIG = usePanelConfig(fleetSummary)

    return (
        <Fragment>
            <h1>Fleet Summary</h1>
            {
                Object.entries(PANEL_CONFIG).map(([key, value]) => (
                    <Fragment>
                        <button key={key} className="panel-button" onClick={() => setPanelValue(value.value)}>
                            <img src={value.img} alt="" />
                            <p>{value.label}</p>
                        </button>
                    </Fragment>
                ))
            }
        </Fragment>
    )

}

export default PanelSelection
