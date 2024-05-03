import { LitElement, html } from 'lit-element';

class EvolutionDM extends LitElement {

  static get properties() {
    return {
      nameEvolutions: { type: Array },
    };

  }

  constructor() {
    super();
    this.nameEvolutions = [];
  }


  getEvolutionDetail(name) {
    console.log({ name });
    const dp = this.shadowRoot.querySelector('#results');
    dp.host = 'https://pokeapi.co/api/v2/pokemon';
    dp.path = name;
    dp.method = 'get';
    dp.generateRequest();
  }

  _customEvent(name, detail) {
    this.dispatchEvent(new CustomEvent(name, {
      bubbles: true,
      composed: true,
      detail: detail
    }));
  }

  getEvolution(evolution) {

    let total = 1;
    let evoName = evolution[0].species.name;
    this.getEvolutionDetail(evoName);
    const dp = this.shadowRoot.querySelector('#results');
    dp.method = 'get';
    dp.addEventListener('request-success', ev => {
      this.nameEvolutions.push(ev.detail);
      console.log('COMPARANDO TOTAL', total, this.nameEvolutions.length);
      if (this.nameEvolutions.length == total) {
        console.log('Mis Evoluciones', this.nameEvolutions);
        this._customEvent('evolutionsData-event', this.nameEvolutions);
      }
    });
    let firstEnvolve = evolution[0].evolves_to;
    while (firstEnvolve.length > 0) {
      this.getEvolutionDetail(firstEnvolve[0].species.name);
      if (firstEnvolve.length > 0) {
        total += 1;
        this.nameEvolutions = [];
      }
      firstEnvolve = firstEnvolve[0].evolves_to;
    }
  }

  render() {
    return html`
      <bbva-core-generic-dp id="results"></bbva-core-generic-dp>
    `;
  }
}
customElements.define('evolution-dm', EvolutionDM);
