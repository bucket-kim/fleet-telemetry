import styled from "styled-components";
import { t } from "../../../../styles/tokens";

export const PanelStyleContainer = styled.div`
    background-color: ${t.whiteBG};
    width: 6rem;
    box-shadow: ${t.shadow};
    padding: 1rem; 
    border-radius: 1rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;

    .panel-button {
        background: ${t.bg};
        border: ${t.border} 1px solid;
        border-radius: 0.5rem;
        height: 5rem;
        width: 5rem;
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

      @media screen and (orientation: portrait) and (max-width: 440px) {
              width: 3rem;
              padding: .5rem; 
                 gap: 1rem;
                     border-radius: .5rem;
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
      }

       @media screen and (orientation: landscape) and (max-width: 940px) {
            width: 3rem;
              padding: .5rem; 
                 gap: 1rem;
                     border-radius: .5rem;
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
       }
`