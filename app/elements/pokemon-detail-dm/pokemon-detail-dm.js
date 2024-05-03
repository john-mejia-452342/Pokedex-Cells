import { LitElement, html } from 'lit-element';

class PokemonDetailDm extends LitElement {

  getPokemonDetail(pokemon) {
    console.log({pokemon});
    const dp = this.shadowRoot.querySelector('#results');
    dp.host = 'https://pokeapi.co/api/v2/pokemon';
    dp.path = pokemon.id;
    dp.method = 'get';
    dp.generateRequest();

    this._customEvent('evolutions-info', pokemon.evolutions);
  }

  setPokemon(e) {
    console.log(e.detail);
    this._customEvent('detail-data-event', e.detail);
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
      <bbva-core-generic-dp
        @request-success="${this.setPokemon}"
        id="results"
      ></bbva-core-generic-dp>
    `;
  }
}
customElements.define('pokemon-detail-dm', PokemonDetailDm);
