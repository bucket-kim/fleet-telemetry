import styled from "styled-components";
import { t } from "../../../../../styles/tokens";
import { motion } from "framer-motion";

export const ReconnectStyleConatiner = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: #2b2b2b9b;
    backdrop-filter: blur(0.5rem);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 11;

    .reconnect-ui {
       background-color: #2b2b2b;
        padding: 1rem 2rem;
        border: ${t.border} 1px solid;
        border-radius: 0.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        p {
            color: white;
            font-size: 2rem;
        }
        img {
            width: 2rem;
            height: 2rem;
        }
    }
`