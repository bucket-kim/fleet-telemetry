import styled from "styled-components";

export const InputChoiceStyleContainer = styled.div`
    position: absolute;
    z-index: 10;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .input-container{
        display: flex;
        align-items: center;
        gap: 0.5rem;
        position: relative;

        .selection {
            cursor: pointer;
            outline: none;
            border: none;
            font-size: 1rem;

            .options {
                position: absolute;
                top: 0;
                left: 0;
            }
        }
    }
    .trip-container {
        display: flex;
        flex-direction: column;
        line-height: 140%;
        p {
            font-size: 0.7rem;
            font-weight: 600;
        }
        span {
            font-size: 1.5rem;
            font-weight: 600;
        }
    }

     @media screen and (orientation: portrait) and (max-width: 440px) {
           .input-container{
        gap: 0.5rem;

        .selection {
            font-size: .7rem;
            
            .options {
                font-size: .7rem;
            }
        }
    }
    .trip-container {
        line-height: 140%;
        p {
            font-size: 0.5rem;
        }
        span {
            font-size: 1rem;
        }
    }
     }
     @media screen and (orientation: landscape) and (max-width: 932px) {
           .input-container{
        gap: 0.5rem;

        .selection {
            font-size: .7rem;
            
            .options {
                font-size: .7rem;
            }
        }
    }
    .trip-container {
        line-height: 140%;
        p {
            font-size: 0.5rem;
        }
        span {
            font-size: 1rem;
        }
    }
     }
`