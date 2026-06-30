import styled from "styled-components";

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
        border: 1px "#EEF0F6" solid;
        border-radius: 1rem;
        background: linear-gradient(180deg,rgba(255, 255, 255, 1) 0%, rgba(0, 0, 0, 0) 100%);
        flex: 1;     
        min-height: 0;  
        display: grid;
        grid-template-rows: minmax(0, 3fr) minmax(0, 2fr);  
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
        .layout-container {
            padding: 1rem;
            padding-top: 0rem;
                .upper-container{
                       grid-template-columns: none;
                       grid-template-rows: 1fr 1fr;
                }
        }
    }

    @media screen and (orientation: landscape) and (max-width: 932px) {
        height: calc(100dvh - 3.5rem);
       
    }
`