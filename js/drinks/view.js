import { RES_PER_PAGE, API_KEY } from './config.js';

class View {
  _parentContainer = document.querySelector('#drinks-container');
  _data;
  _drinkInfo;
  _query;

  renderResults(data) {
    this._data = data;
    // console.log(this._data);
    const paginatedResults = this.paginateResults();

    document.querySelector('#search-bar').value = '';

    this.clearHTML();
    
    this.generateMarkup(paginatedResults);

    this.renderPageBtns();

    this.addEventHandlers();
  }

  paginateResults(data) {
    if (!data) {
      const trimStart = (this._data.page - 1) * RES_PER_PAGE;
      const trimEnd = trimStart + RES_PER_PAGE;
      const results = this._data.allData.slice(trimStart, trimEnd);
  
      return results;
    } else {
      const trimStart = (this._data.page - 1) * RES_PER_PAGE;
      const trimEnd = trimStart + RES_PER_PAGE;
      const results = data.slice(trimStart, trimEnd);
  
      return results;
    }
  }

  clearHTML() {
    this._parentContainer.innerHTML = '';
  }

  generateMarkup(results) {
    results.map(drink => {
      const markup = `
        <div class="card card-cocktail" data-id="${drink.idDrink}">
          <img class="img-cocktail" src="${drink.strDrinkThumb}" alt="${drink.strDrink} thumbnail" />
          <h3 class="tab-cocktail">${drink.strDrink}</h2>
        </div>
      `
      this.renderHTML(markup);
    })
  }

  renderHTML(html) {
    this._parentContainer.insertAdjacentHTML('beforeend', html);
  }

  renderPageBtns() {
    this._data.page = Math.ceil(this._data.page);

    let html;

    // if on last page of multiple pages
    if (+this._data.totalPages === +this._data.page) {
      html = `
        <button data-turn-page="-1" type="button" class="page-btn"><i class="fas fa-arrow-left"></i> Page ${+this._data.page - 1}</button>
        <span>Page ${this._data.page} of ${this._data.totalPages}</span>
      `
    }
    
    // if on 1st with no others
    if (+this._data.totalPages === 1) {
      html = `
        <span>Page ${this._data.page} of ${this._data.totalPages}</span>
      `
    }

    // if on 1st page of multiple pages
    if (+this._data.totalPages > 1 && +this._data.page === 1) {
      html = `
        <span>Page ${this._data.page} of ${this._data.totalPages}</span>
        <button data-turn-page="1" type="button" class="page-btn">Page ${+this._data.page + 1} <i class="fas fa-arrow-right"></i></button>
      `
    }

    // has pages before and after
    if (+this._data.totalPages > 1 && +this._data.page > 1 && +this._data.page < +this._data.totalPages) {
      html = `
        <button data-turn-page="-1" type="button" class="page-btn"><i class="fas fa-arrow-left"></i> Page ${+this._data.page - 1}</button>
        <span>Page ${this._data.page} of ${this._data.totalPages}</span>
        <button data-turn-page="1" type="button" class="page-btn">Page ${+this._data.page + 1} <i class="fas fa-arrow-right"></i></button>
      `
    }

    document.querySelector('.page-btn-container').innerHTML = html;
  }

  changePage(e) {
    const direction = Number(e.target.dataset.turnPage);
    this._data.page += direction;
    this.renderResults(this._data);
  }

  addEventHandlers() {
    const btns = document.querySelectorAll('.page-btn');

    btns.forEach(btn => {
      btn.addEventListener('click', this.changePage.bind(this));
    })
  }

  handleCarouselClick(e) {
    if (e.target.closest('.card-cocktail')) {
      const id = Number(e.target.closest('.card-cocktail').dataset.id);
      this.toggleModal(id);
    } else {
      return;
    }
  }

    // I know this is not supposed to be in the View... :(
      async toggleModal(id) {
        await this.fetchDrinkInfo(id);
        this.populateModal();
      }
    
      async fetchDrinkInfo(id) {
        const url = `https://www.thecocktaildb.com/api/json/v2/${API_KEY}/lookup.php?i=`;
        try {
          console.log(`url: ${url}${id}`);
          const res = await fetch(`${url}${id}`);
          const {drinks} = await res.json();
          const data = drinks[0];
          const drink = {
            id: id,
            name: data.strDrink,
            img: data.strDrinkThumb,
            instructions: data.strInstructions
          };
          console.log(drink);
          this._drinkInfo = drink;
        } catch(e) {
          console.log('Could not find that drink');
        }
      }
    
      populateModal() {
        document.querySelector('.modal-wrapper').classList.add('active');
        const modal = document.querySelector('.modal');
        const html = `
        <i class="far fa-times-circle"></i>
        <h4 class="header">${this._drinkInfo.name}</h4>
        <div class="img-box">
          <img src="${this._drinkInfo.img}" alt="${this._drinkInfo.name} Thumbnail">
        </div>
        <p class="instructions">${this._drinkInfo.instructions}</p>`;
        modal.insertAdjacentHTML('beforeend', html);
      }
    
      closeModal(e) {
        if (e.target.classList.contains('overlay') ||
            e.target.closest('.fa-times-circle')) {
          document.querySelector('.modal').innerHTML = '';
          document.querySelector('.modal-wrapper').classList.remove('active');
        }
      }

      searchQuery(e) {
        this._query = e.target.value;

        console.log(this._data);

        const searchItems = this._data.allData.filter(drink => drink.strDrink.toLowerCase().includes(this._query.toLowerCase()));
        
        this._data.totalPages = Math.ceil(searchItems.length / RES_PER_PAGE);
        this._page = 1;

        const paginatedResults = this.paginateResults(searchItems);
        console.log(paginatedResults);


        this.clearHTML();
        
        this.generateMarkup(paginatedResults);

        this.renderPageBtns();

        this.addEventHandlers();
      }

}

export default new View();