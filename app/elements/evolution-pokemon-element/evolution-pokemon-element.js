import { LitElement, html } from 'lit-element';
import styles from './evolutions-pokemon-element-styles';

class EvolutionPokemon extends LitElement {

  static get properties() {
    return {
      pokemonEvolution: { type: Array },
    };
  }

  constructor() {
    super();
  }

  static get styles() {
    return [ styles ];
  }

  get buldingDetailStructure() {
    return html`
    <style>
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: #c0c1c2;
      height: 100vh;
    }

    .pokemon{
      background-color: #fff;
      border-radius: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .pokemon img{
      height: 200px;
      width:200px;
    }
    </style>
    <div data-grid="region">
      <div data-grid="zone">
        <div class="container">
          ${this.pokemonEvolution.map(EvoItem => html`
          <div class="pokemon"> 
            <img class="imagen-poke" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${EvoItem.id}.png"></img>
            <p>${EvoItem?.types[0]?.type.name.toUpperCase()}</p>
            <p>${EvoItem.name.toUpperCase()}</p>
          </div>
          
            `)}
        </div>
      </div>
      </div>
      `;
  }

  render() {
    return html`${this.buldingDetailStructure}`;
  }
}

customElements.define('evolution-pokemon-element', EvolutionPokemon);
