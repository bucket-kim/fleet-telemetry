import styled from "styled-components";

export const MetricGuageCardStyleContainer = styled.div`
width: 100%;
height: 100%;
border: 1px solid black;
border-radius: 0.5rem;
display: flex;
flex-direction: column;
justify-content: space-between;
/* gap: 1rem; */
background-color: #7a8392;
box-sizing: border-box;
padding: 1rem;

.card-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    img {
        width: 2rem;
        height: 2rem;
    }
}

.card-content {

    .card-unit {
        display: flex;
        gap: 0.25rem;
        align-items: center;
        justify-content: center;

        p {
            font-size: 2rem;
            font-weight: 700;
        }
    
    }
    
    .card-guage {
        margin: auto;
        width: 80%;

        /* The SVG has a fixed viewBox, so height follows width automatically —
           no library, no ResizeObserver, no flicker, no !important needed. */
        .gauge-svg {
            display: block;
            width: 100%;
            height: auto;
        }

        .gauge-track {
            fill: none;
            stroke: rgba(0, 0, 0, 0.2);
            stroke-width: 12;
            stroke-linecap: round;
        }

        .gauge-fill {
            fill: none;
            stroke-width: 12;
            stroke-linecap: round;
            filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.35));
            transition: stroke-dashoffset 0.4s ease;
        }

        .gauge-needle {
            transition: transform 0.4s ease;
        }

        .gauge-needle polygon,
        .gauge-hub {
            fill: #ffffff;
        }

        .card-metrics {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 0.25rem;
        }
    }
    
}
    
`