import styled from "styled-components";
import { t } from "../../../../styles/tokens";

export const LocationMapStyleContainer = styled.div`
   border-radius: 0.5rem;
   border: ${t.border} 1px solid;
   overflow: hidden;
   position: relative;
   /* mapbox-gl injects the logo <a> into the DOM at runtime, so it can't be
      removed from JSX — hide it with CSS instead (scoped to this map). */
   .mapboxgl-ctrl-logo {
      display: none;
   }
`