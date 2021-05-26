import { RES_PER_PAGE } from './config.js';

class View {
  _parentContainer = document.querySelector('#drinks-container');
  _data;

  renderResults(data) {
    this._data = data;
    // console.log(this._data);
    const paginatedResults = this.paginateResults(this._data);

    this.clearHTML();
    
    this.generateMarkup(paginatedResults);

    this.renderPageBtns();

    this.addEventHandlers();
    return;
  }

  paginateResults(data) {
    const trimStart = (data.page - 1) * RES_PER_PAGE;
    const trimEnd = trimStart + RES_PER_PAGE;
    const results = data.allData.slice(trimStart, trimEnd);

    return results;
  }

  clearHTML() {
    this._parentContainer.innerHTML = '';
  }

  generateMarkup(results) {
    const html = results.map(drink => {
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
    let html;
    
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
        <button data-turn-page="1" type="button" class="page-btn">Page ${+this._data.page + 1} ></button>
      `
    }

    // has pages before and after
    if (+this._data.totalPages > 1 && +this._data.page > 1 && +this._data.page < +this._data.totalPages) {
      html = `
        <button data-turn-page="-1" type="button" class="page-btn">< Page ${+this._data.page - 1}</button>
        <span>Page ${this._data.page} of ${this._data.totalPages}</span>
        <button data-turn-page="1" type="button" class="page-btn">Page ${+this._data.page + 1} ></button>
      `
    }

    // if on last page of multiple pages
    if (+this._data.totalPages === +this._data.page) {
      html = `
        <button data-turn-page="-1" type="button" class="page-btn">< Page ${+this._data.page - 1}</button>
        <span>Page ${this._data.page} of ${this._data.totalPages}</span>
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
}

export default new View();