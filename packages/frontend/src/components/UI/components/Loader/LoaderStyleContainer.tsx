import { motion } from 'framer-motion';
import styled from "styled-components";
import { t } from '../../../../styles/tokens';

export const LoaderStyleContainer = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${t.bg};
    z-index: 10;
    p {
        font-weight: 600;
        text-transform: uppercase;
    }
`