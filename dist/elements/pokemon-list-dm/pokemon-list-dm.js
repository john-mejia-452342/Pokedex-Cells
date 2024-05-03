import { LitElement, html } from 'lit-element';
class PokemonListDm extends LitElement {
  static get properties() {
    return {
      results: { type: Array },
      temp: { type: Array },
      name: { type: String},
      id: { type: String}
    };
  }

  constructor() {
    super();
  }

  getResults(results) {
    console.log('results ', results);
    let data = [];
    const dp = this.shadowRoot.querySelector('#results');
    dp.method = 'get';
    dp.addEventListener('request-success', ev => {
      console.log(ev);
      data.push({ name: ev.detail.chain.species.name, id: this.setID(ev.detail.chain.species.url), evolutions: ev.detail.chain.evolves_to});
      if (data.length == results.length) {
        this._customEvent('pokemon-list', data);
      }
    });
    results.map(item => {
      dp.host = item.url;
      dp.generateRequest();
    });
  }

  setID(url) {
    let id = url;
    let substring = id.substring(id.search('/+[0-9]+') + 1);
    id = substring.replace('/', '');
    return id;
  }

  _customEvent(name, detail) {
    this.dispatchEvent(new CustomEvent(name, {
      bubbles: true,
      composed: true,
      detail: detail
    }));
  }

  render() {
    return html`
      <bbva-core-generic-dp id="results"></bbva-core-generic-dp>
    `;
  }

}
customElements.define('pokemon-list-dm', PokemonListDm);
