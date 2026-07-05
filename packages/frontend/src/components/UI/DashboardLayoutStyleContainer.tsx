import styled from "styled-components";
import { t } from "../../styles/tokens";

export const DashboardLayoutStyleContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    height: 100dvh;
    width: 100%;
    box-sizing: border-box;
    padding: 1rem;
    
    .layout-container {
        /* border: 1px ${t.border} solid; */
       box-shadow: ${t.shadow};
        border-radius: 1rem;
        background: linear-gradient(180deg, ${t.whiteBG} 0%, rgba(0, 0, 0, 0) 100%);
        min-height: 0;  
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        grid-template-rows: minmax(0, 1.5fr) minmax(0, 1fr) minmax(0, 1fr);  
        box-sizing: border-box;
        gap: 1rem;
        padding: 1rem ;
        .upper-container{
            display: grid;
            grid-template-columns: 2.025fr 1fr;
            gap: 0.5rem;
            box-sizing: border-box;
            .Three-D {
                border-radius: 0.5rem;
            }
        }
   
    }

    @media screen and (orientation: portrait) and (max-width: 440px) {
        overflow-y: scroll;
        .layout-container {
            padding: 0.5rem;
            padding-top: 0rem;
                .upper-container{
                       grid-template-columns: none;
                       grid-template-rows: 1fr 1fr;
                }
        }
    }

    @media screen and (orientation: landscape) and (max-width: 940px) {
        height: calc(100dvh);
        padding: 0.5rem;
       .layout-container{
            gap: .25rem;
            padding: .5rem;
       }
    }
`