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
    /* padding-bottom: 0; */
    height: 100%;

    .info-header {
        display: flex;
        align-items: center;
        gap: 2rem;

        .header-car-type {
            display: flex;
            gap: 1rem;
            img {
                width: 2rem;
                height: 2rem;
            }
        }
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
            border-bottom: 1px solid white;
            padding: .75rem 0rem;
            .label {
                display: flex;
                align-items: center;
                gap: 1rem;

                img {
                    width: 2rem;
                    height: 2rem;
                }
            }
        }:last-child {
            border-bottom: none;
        }
    }
`