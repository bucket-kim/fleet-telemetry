import styled from "styled-components";

export const MapLocationStyleContainer = styled.div`
    .gps-marker {
        width: 1.25rem;
        height: 1.25rem;
        border: 2px white solid;
        background: #2A64F5;
        border-radius: 99px;
    }

           @media screen and (orientation: landscape) and (max-width: 932px) {
    .gps-marker {
        width: .8rem;
        height: .8rem;
        border: 1.5px white solid;
    }


     @media screen and (orientation: portrait) and (max-width: 440px) {
    .gps-marker {
        width: .8rem;
        height: .8rem;
        border: 1.5px white solid;
    }
}
}
`