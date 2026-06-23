import styled from "styled-components";

export const VehicleInfoStyleContainer = styled.div`
    box-sizing: border-box;
    background-color: #7a8392;
    border-radius: 0.5rem;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    height: 100%;

    .info-header {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .info-content {
        flex: 1;            /* fill the leftover height so space-between has room */
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .info-label {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: red;
            .label {
                display: flex;
                align-items: center;
                gap: 1rem;
            }
        }
    }
`