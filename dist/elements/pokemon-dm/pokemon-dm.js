import { LitElement, html } from 'lit-element';
class PokemonDm extends LitElement {
  static get properties() {
    return {
      host: { type: String },
      path: { type: String },
      page: { type: String, notify: true },
      results: { type: Array },
    };
  }

  constructor() {
    super();
    this.host = 'https://pokeapi.co/api/v2';
    this.path = 'evolution-chain/?offset=0&limit=30';
    console.log('constructor');
  }

  getPage(page) {
    const dp = this.shadowRoot.querySelector('#results');
    dp.host = this.host;
    dp.path = `evolution-chain/?offset=${page}&limit=30`;
    dp.method = 'get';
    dp.generateRequest();
  }

  firstUpdated() {
    console.log('First');
    const dp = this.shadowRoot.querySelector('#results');
    dp.host = this.host;
    dp.path = this.path;
    dp.method = 'get';
    dp.generateRequest();
  }

  getResults(e) {
    console.log(e.detail.results);
    this.dispatchEvent(new CustomEvent('firstData-event', {
      bubbles: true,
      composed: true,
      detail: e.detail.results
    }));
  }

  render() {
    console.log('render');
    return html`
      <bbva-core-generic-dp @request-success="${this.getResults}" id="results"></bbva-core-generic-dp>
    `;
  }

}
customElements.define('pokemon-dm', PokemonDm);
