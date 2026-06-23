import styled from "styled-components";

export const LocationMapStyleContainer = styled.div`
   border-radius: 0.5rem;
   overflow: hidden;

   /* mapbox-gl injects the logo <a> into the DOM at runtime, so it can't be
      removed from JSX — hide it with CSS instead (scoped to this map). */
   .mapboxgl-ctrl-logo {
      display: none;
   }
`