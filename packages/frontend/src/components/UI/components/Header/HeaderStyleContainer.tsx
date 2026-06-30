import styled from "styled-components";

export const HeaderStyleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 1rem 0rem;
    .left-header {
        text-transform: uppercase;
        line-height: 120%;
        h3 {
            font-size: 1.25rem;
            letter-spacing: .1rem;
        }
        p {
            font-size: .75rem;
            letter-spacing: 0rem;
            font-weight: 600;
        }
    }
    .right-header {
        span {
            display: flex;
            align-items: center;
            gap: 0.35rem;

            .online-circle {
                width: 0.7rem;
                height: 0.7rem;
            }

            p {
                  letter-spacing: -0.05rem;
            }
        }
    }

     @media screen and (orientation: portrait) and (max-width: 440px) {
            .left-header {
            line-height: 70%;
        h3 {
            font-size: .75rem;
            letter-spacing: .1rem;
        }
        p {
            font-size: .5rem;
            letter-spacing: 0rem;
            font-weight: 600;
        }
    }
    .right-header {
        span {
            gap: 0.25rem;

            .online-circle {
                width: 0.5rem;
                height: 0.5rem;
            }

            p {
                 font-size: .75rem;
                  letter-spacing: -0.05rem;
            }
        }
    }
     }

     @media screen and (orientation: landscape) and (max-width: 932px) {
           padding: 0rem;
           padding-bottom: 0.5rem;
           .left-header {
            line-height: 70%;
        h3 {
            font-size: .75rem;
            letter-spacing: .1rem;
        }
        p {
            font-size: .5rem;
            letter-spacing: 0rem;
            font-weight: 600;
        }
    }
    .right-header {
        span {
            gap: 0.25rem;

            .online-circle {
                width: 0.5rem;
                height: 0.5rem;
            }

            p {
                 font-size: .75rem;
                  letter-spacing: -0.05rem;
            }
        }
    }

     }
`