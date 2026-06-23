import styled from "styled-components";

export const DashboardLayoutStyleContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100dvh;
    width: 100dvw;
    
    .layout-container {
        flex: 1;     
        min-height: 0;  
        display: grid;
        grid-template-rows: 2fr 1fr;
        box-sizing: border-box;
        padding: 2rem;
        gap: 0.5rem;
        .upper-container{
            display: grid;
            grid-template-columns: 2.025fr 1fr;
            gap: 0.5rem;
            .Three-D {
                border-radius: 0.5rem;
                background-color: blue;
            }
        }
        .lower-container{
            display: grid;
        }
    }
`