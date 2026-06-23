import styled from "styled-components";

export const MetricGuageCardStyleContainer = styled.div`
width: 100%;
height: 100%;
border: 1px solid black;
border-radius: 0.5rem;
display: flex;
flex-direction: column;
justify-content: space-between;
gap: 1rem;
background-color: #7a8392;
box-sizing: border-box;
padding: 1rem;

.card-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    img {
        width: 2rem;
        height: 2rem;
    }
}
.card-unit {
    display: flex;
    align-items: center;
    justify-content: center;

}

.card-metrics {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
    
`