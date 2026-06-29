import styled from "styled-components";
import { t } from "../../../../styles/tokens";

export const VehicleInfoStyleContainer = styled.div`
    box-sizing: border-box;
    background-color: ${t.surface};
    border-radius: 0.5rem;
    border: 1px solid ${t.border};
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    /* padding-bottom: 0; */
    height: fit-content;
    /* color: ${t.text}; */
    color: ${t.textMuted};
    
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
        .header-info{
            p {
                    font-size: 1rem;
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
                p {

                    font-size: 1rem;
                }
                img {
                    width: 2rem;
                    height: 2rem;
                }
            }
        }:last-child {
            border-bottom: none;
        }
    }
    @media screen and (orientation: landscape) and (max-width: 932px) {
          span, p {
                    font-size: 0.5rem;
            }
            gap: 0.2rem;
            padding: 0.5rem;
   .info-header {
        gap: 2rem;

        .header-car-type {
            img {
                width: 1rem;
                height: 1rem;
            }
        }
        .header-info {
          p {
                    font-size: 0.5rem;
            }
        }
    }

    .info-content {
        .info-label {
            padding: 0.2rem 0rem;
            .label {
                gap: .5rem;
                p {
                    font-size: 0.5rem;
                }
                img {
                    width: 1rem;
                    height: 1rem;
                }
            }
        }
    }
}
`