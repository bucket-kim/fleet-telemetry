import styled from "styled-components";

export const MetricsStyleContainer = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) minmax(0, 1.2fr) minmax(0, 1.2fr) 1.8fr;
    gap: .5rem;
    flex: 1;
    min-height: 0;
    box-sizing: border-box;

    @media screen and (orientation: portrait) and (max-width: 440px) {
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        /* Row 1 = three null cells (". . ." — NOT "...", which is one token);
           the 3 gauge cards auto-place into them. Row 2 = the vehicleInfo area. */
        grid-template-areas:
            ". . ."
            "vehicleInfo vehicleInfo vehicleInfo";

        .vehicleInfo {
            grid-area: vehicleInfo;
        }
    }
    
`