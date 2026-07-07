import styled from "styled-components";
import { t } from "../../../../../styles/tokens";

export const PanelWidgetStyleConatainer = styled.div<{ $panelWidth: number }>`
    position: absolute;
    top: 6rem;
    left: calc(${(props) => props.$panelWidth}px + 2rem);
    width: 12rem;
    height: 6rem;
    padding: 1rem;
    background: rgba(231, 231, 231, 0.5);
    backdrop-filter: blur(3px);
    border: 1px ${t.border} solid;
    border-radius: 1rem;
    z-index: 11;

    header {
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
        button {
            cursor: pointer;
            border: 1px solid white;
            background: #969696;
            color: white;
            border-radius: 99px;
        }
    }
      @media screen and (orientation: portrait) and (max-width: 440px) {
            top: 5rem;
            width: 9rem;
    height: 5rem;
    padding: .5rem;
            left: calc(${(props) => props.$panelWidth}px + 1.5rem);

            p {
                font-size: 0.75rem;
            }
        }
        
        @media screen and (orientation: landscape) and (max-width: 940px) {
               width: 9rem;
    height: 5rem;
    padding: .5rem;
            top: 3rem;
            left: calc(${(props) => props.$panelWidth}px + 1rem);
            p {
                font-size: 0.75rem;
            }
            
        }
`