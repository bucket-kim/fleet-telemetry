import styled from "styled-components";

export const OnelineCircleStyleContainer = styled.div`
    
    .online-circle {
        width: 0.7rem;
        height: 0.7rem;
    }

         @media screen and (orientation: landscape) and (max-width: 932px) {
   .online-circle {
                width: 0.5rem;
                height: 0.5rem;
            }
         }


     @media screen and (orientation: portrait) and (max-width: 440px) {
   .online-circle {
                width: 0.5rem;
                height: 0.5rem;
            }
     }
`;
