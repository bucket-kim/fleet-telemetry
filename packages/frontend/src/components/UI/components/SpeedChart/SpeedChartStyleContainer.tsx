import styled from "styled-components";
import { t } from "../../../../styles/tokens";

export const SpeedChartStyleContainer = styled.div`
    box-sizing: border-box;
    /* padding: 1rem; */
    background-color: ${t.whiteBG};
    border-radius: .5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    min-height: 0;
    overflow: hidden;

    svg {
        display: block;
        width: 100%;
        height: 100%;
    }

    p {
        color: ${t.textMuted};
        font-weight: 700;
        position: absolute;
        top: 1rem;
        left: .5rem;
        font-size: 0.85rem
    }
  @media screen and (orientation: landscape) and (max-width: 940px) {
    p {
        font-size: 0.35rem;
        top: 0.1rem;
    }
  }

`