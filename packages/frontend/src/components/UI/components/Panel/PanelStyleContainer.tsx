import styled from "styled-components";
import { t } from "../../../../styles/tokens";

export const PanelStyleContainer = styled.div`
    background-color: ${t.whiteBG};
    height: 100%;
    width: 6rem;
    box-shadow: ${t.shadow};
    padding: 1rem; 
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;

    h1 {
        color: ${t.text};
        font-size: .75rem;
        border-bottom: 1px solid black;
        letter-spacing: -.05rem;
    }

    .panel-button {
        background: ${t.bg};
        border: ${t.border} 1px solid;
        border-radius: 0.5rem;
        height: 5rem;
        width: 6rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: .5rem;
        cursor: pointer;
        img {
            width: 2rem;
            height: 2rem;
        }
        p {
            color: ${t.textMuted};
            font-size: 0.7rem;
        }
        
    }
    .trip-energy {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
        box-sizing: border-box;
        
        p {
            display: flex;
            flex-direction: column;
            font-size: .7rem;
            line-height: 100%;
            gap: .5rem;
            font-weight: 700;
            padding-bottom: 1rem;
            border-bottom: 1px solid ${t.border};

          
            span {
                font-weight: 400;
            }
        }  :last-child{
                border: none;
                padding-bottom: 0;
            }
    }

      @media screen and (orientation: portrait) and (max-width: 440px) {
            width: 3rem;
            padding: .5rem; 
            gap: .75rem;
            border-radius: .5rem;
            h1 {
            font-size: .4rem;
            }
          .panel-button {
                height: 3rem;
                width: 3rem;
            img{
                width: 1rem;
                height: 1rem;
            }
            p{
                 font-size: 0.5rem;
            }
         }
          .trip-energy {
            gap: .5rem;
              p {
                gap:.5rem;
                padding-bottom: 0.5rem;
                  font-size: .45rem;
            }
          }
      }

       @media screen and (orientation: landscape) and (max-width: 940px) {
            width: 3rem;
            padding: .5rem; 
            gap: .45rem;
            border-radius: .5rem;
            h1 {
            font-size: .4rem;
            }
          .panel-button {
                height: 3rem;
                width: 3rem;
            img{
                width: 1rem;
                height: 1rem;
            }
            p{
                 font-size: 0.5rem;
            }
         }
           .trip-energy {
            gap: .4rem;
              p {
                gap:.4rem;
                padding-bottom: 0.4rem;
                  font-size: .45rem;
            }
          }
       }
`