import styled from "styled-components";
import { t } from "../../../../styles/tokens";

export const MetricGuageCardStyleContainer = styled.div`
width: 100%;
height: 100%;
border: 1px solid ${t.border};
border-radius: 0.5rem;
display: flex;
flex-direction: column;
/* justify-content: space-between; */
/* gap: 1rem; */
background-color: ${t.surface};
color: ${t.text};
box-shadow: ${t.shadow};
box-sizing: border-box;
padding: 1rem;

.card-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: ${t.textMuted};
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
        color: ${t.textMuted};

        p {
            font-size: 2rem;
            font-weight: 700;
            color: ${t.textHeading};
        }

    }
    
    .card-guage {
        margin: auto;
        width: 80%;
        .gauge-svg {
            display: block;
            width: 100%;
            height: auto;
        }
        .gauge-track {
            fill: none;
            stroke: ${t.gaugeTrack};
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
            fill: ${t.gaugeNeedle};
        }

        .card-metrics {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 0.25rem;
        }
    }
    
}
@media screen and (orientation: landscape) and (max-width: 932px) {
    padding: 0.5rem;
   .card-header {
    img {
        height: 1rem;
        width: 1rem;
    }
    span {
        font-size: 0.5rem;
    }
}
.card-content {
    .card-unit {
        p {
            font-size: 1.2rem;
        }
        span {
            font-size: 0.5rem;
        }
    }
    .card-guage {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .gauge-svg {
            width: 80%;
        }
        .card-metrics {
            width: 80%;
            span {
                font-size: 0.5rem;
            }
        }
    }
   }
}

`