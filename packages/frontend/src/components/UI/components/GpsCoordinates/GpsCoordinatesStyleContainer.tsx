import styled from "styled-components";
import { t } from "../../../../styles/tokens";

export const GpsCoordinatesStyleContainer = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-left: 1rem;
    
.header {
    h1 {
        color: ${t.text};
        font-size: 1.3rem;
    }
}

    .content {
        display: flex;
        p {
            color: ${t.text};
            border: 1px solid ${t.border};
            padding: 0.4rem 0.8rem;
            background-color: rgba(0, 0, 0, 0.2);
            border-radius: 0.5rem;
            font-weight: 600;
        }
    }

    @media screen and (orientation: portrait) and (max-width: 440px) {
               gap: 0.1rem;
        .header {
    h1 {
        font-size: 0.8rem;
    }
}
    .content {
        display: flex;
        p {
            font-size: 0.8rem;
        }
    }
    }

    @media screen and (orientation: landscape) and (max-width: 932px) {
            gap: 0.1rem;
        .header {
    h1 {
        font-size: 0.8rem;
    }
}
    .content {
        display: flex;
        p {
            font-size: 0.8rem;
        }
    }
    }
`