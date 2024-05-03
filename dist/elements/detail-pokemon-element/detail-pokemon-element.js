import { LitElement, html } from 'lit-element';
import styles from './detail-pokemon-element-styles';

class DetailPokemon extends LitElement {
  static get properties() {
    return {
      pokemonDetail: { type: Object },
      evolutions: { type: Array },
    };
  }

  constructor() {
    super();
  }

  static get styles() {
    return [ styles ];
  }

  _goToEvolution({ evolutions }) {
    console.log('Click on button Evolution', evolutions);
    this.dispatchEvent(new CustomEvent('evolution-event', {
      bubbles: true,
      composed: true,
      detail: evolutions
    }));
  }

  get buldingDetailStructure() {
    console.log(this.pokemonDetail);
    return html`
      <style>

      .container-main{
          display: flex;
          background-color: #c3c3c3;
          flex-direction: column;
          align-items: center;
          height: 100vh;
      }
      .container{
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
      }

      .imagen-poke{
        height: 300px;
        width: 300px;
      }
      .card{
        width: 500px;
      }
        
      </style>


      <div data-grid="region">
        <div class="container-main">
          <div class="container">


            <img class="imagen-poke" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.pokemonDetail.id}.png"></img>
            <bbva-web-card-product class="card"
              heading="${this.pokemonDetail.name.toUpperCase()}" subheading="Type: ${this.pokemonDetail.types[0].type.name.toUpperCase()}"
              categories-list-label="Categories List" main-link-icon="bbva:info"
              button-text="${this.evolutions.length > 0 ? 'Evolutions' : ''}"
              @button-click="${() => this._goToEvolution(this.pokemonDetail)}">  
            </bbva-web-card-product>
          </div>
        </div>
      </div>
    `;
  }

  render() {
    return html`${this.buldingDetailStructure}`;
  }
}

customElements.define('detail-pokemon-element', DetailPokemon);
