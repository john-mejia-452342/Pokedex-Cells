/* eslint-disable no-unused-vars */
import { css, unsafeCSS } from 'lit-element';
import * as foundations from '@bbva-web-components/bbva-foundations-styles';

export default css`
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  place-items: center;
}

@media screen and (min-width: 37.5rem) {
  bbva-web-card-product {
    max-width: 75%;
  }
}
`;
