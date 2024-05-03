//import { CellsPage } from '@cells/cells-page';
import { LitElement, html, css } from 'lit-element';
import styles from './list-pokemon-elements-styles.js';

class ListPokemon extends LitElement {

  static get properties() {
    return {
      dataPokeInfo: { Type: Array },
      page: { Type: Number, notify: true },
      pokImage: { type: String },
    };
  }

  static get styles() {
    return [ styles ];
  }

  constructor() {
    super();
    this.dataPokeInfo = [];
    this.page = 0;
  }

  firstUpdated() {
    const pagination = this.shadowRoot.querySelector('#pagination');

    pagination.addEventListener('next-click', ev => {
      this.page += 20;
      console.log('Next Page', this.page);
      this._CustomEvent('navigation-event', this.page);
    });

    pagination.addEventListener('back-click', ev => {
      this.page -= 20;
      console.log('Back Page', this.page);
      this._CustomEvent('navigation-event', this.page);
    });

    pagination.addEventListener('first-click', () => {
      this.page = 0;
      console.log('First Page', this.page);
      this._CustomEvent('navigation-event', this.page);
    });

    pagination.addEventListener('number-click', (ev) => {
      console.log('Number Page', (ev.detail * 10) * 2);
      this.page = (ev.detail * 10) * 2 - 20;
      this._CustomEvent('navigation-event', this.page);
    });
  }

  _CustomEvent(name, detail) {
    this.dispatchEvent(new CustomEvent(name, {
      bubbles: true,
      composed: true,
      detail: detail
    }));
  }

  render() {
    console.log(this.dataPokeInfo);
    return html`${this.dataTemplate}`;
  }

  _goToPokeDetail(pokeDetail) {
    this.dispatchEvent(new CustomEvent('detail-event', {
      bubbles: true,
      composed: true,
      detail: pokeDetail
    }));
  }

  get dataTemplate() {
    this.dataPokeInfo.map(pokeItem => console.log('datatempolate', pokeItem));
    return html`

    <style>
      .container-main{
        
      }
      .pokemon{
        border-radius: 1rem;
        background-color: #dad8d8;
        box-shadow: 1px 10px 5px 0px rgba(0,0,0,0.75);
        -webkit-box-shadow: 1px 10px 5px 0px rgba(0,0,0,0.75);
        -moz-box-shadow: 1px 10px 5px 0px rgba(0,0,0,0.75);
        padding-block: 1rem;
        text-transform: uppercase;
        position: relative;
        margin: 5px;
      }
      .pokemon-id-back{
          position: absolute;
          top: 1rem;
          left: 50%;
          transform: translateX(-50%);
          font-size: 6rem;
          font-weight: 800;
          color: rgb(189, 189, 189);
          z-index: -1;
      }
      .pokemon-imagen{
          padding-inline: 1rem;
          display: flex;
          justify-content: center;
      }
      .pokemon-imagen img{
          width: 100%;
          max-width: 10rem;
      }
      .pokemon-info{
          display: flex;
          flex-direction: column;
          gap: .5rem;
          padding-inline: 1rem;
          align-items: center;
          text-align: center;
      }
      .pokemon-id{
        font-size: 2rem;
        font-weight: 800;
      }
    </style>
    <div data-grid="region">
      <div class="container-main" style="background-color:#c3c3c3;">
        <div class="container">
          ${this.dataPokeInfo.map(pokeItem => html`
          ${console.log('nuevo', pokeItem)}

          <div class="pokemon" @click="${() => this._goToPokeDetail(pokeItem)}" >
            <p class="pokemon-id-back">${pokeItem.id}</p>
            <div class="pokemon-imagen">
              <img src="${`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeItem.id}.png`}" alt="">
            </div>
            <div class="pokemon-info">
              <p class="pokemon-id">${pokeItem.id}</p>
              <h2 class="pokemon_nombre">${pokeItem.name.toUpperCase()}</h2>
            </div>
          </div>
        </div>`
  )}
      </div>
    </div>
    </div>
          `;
  }


}
customElements.define('list-pokemon-elements', ListPokemon);

