import styled from "styled-components";
import { t } from "../../../../../styles/tokens";
import { motion } from "framer-motion";

export const ToastItemStyleContainer = styled(motion.div) <{ $severity: string }>`
    width: 10rem;
    background-color: white;
    padding: 1.5rem 2rem;
    border: ${t.border} 1px solid;
    border-radius: 0.5rem;
    border-left: ${({ $severity }) => $severity === 'critical' ? "r#b70000 1rem solid" : $severity === 'warning' ? "#ffd000 1rem solid" : "none"} ;
    font-weight: 600;
`