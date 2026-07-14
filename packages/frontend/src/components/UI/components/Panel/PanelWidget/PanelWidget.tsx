
import type { FC } from 'react';
import { PanelWidgetStyleConatainer } from './PanelWidgetStyleConatainer'

interface PanelWidgetProps {
    panelValue: string | number;
    handleClick: () => void;
    panelWidth: number;
}

const PanelWidget: FC<PanelWidgetProps> = ({ panelValue, handleClick, panelWidth }) => {
    return (
        <PanelWidgetStyleConatainer $panelWidth={panelWidth}>
            <header>
                <button onClick={handleClick}>x</button>
            </header>
            <p>{panelValue}</p>
        </PanelWidgetStyleConatainer>
    )
}

export default PanelWidget
