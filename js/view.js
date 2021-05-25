export default class View {

  displayProducts(data) {
    const container = document.querySelector('#drinks-container');

    data.map(drink => {
      const html = `
        <div class="card card-cocktail" data-id="${drink.idDrink}">
          <img class="img-cocktail" src="${drink.strDrinkThumb}" alt="${drink.strDrink} thumbnail" />
          <h3 class="tab-cocktail">${drink.strDrink}</h2>
        </div>
      `
      container.insertAdjacentHTML('beforeend', html);
      return;
    })  
  }

  generatePageBtns(state) {
    
    // if on 1st with no others
    if (+state.totalPages === 1) {
      const html = `
        <div class="btn-container">
          <span>${state.page}</span>
        </div>
      `
      document.querySelector('.drink-wrapper').insertAdjacentHTML('beforeend', html);
    }

    // if on 1st page of multiple pages
    if (+state.totalPages > 1 && +state.page === 1) {
      const html = `
        <div class="btn-container">
        <span>${state.page}</span>
          <button data-turn-page="1" type="button" class="page-btn">Page ${+state.page + 1} ></button>
        </div>
      `
      document.querySelector('.drink-wrapper').insertAdjacentHTML('beforeend', html);
    }

    // has pages before and after
    if (+state.totalPages > 1 && +state.page > 1 && +state.page < +state.totalPages) {
      const html = `
        <div class="btn-container">
          <button data-turn-page="-1" type="button" class="page-btn">< Page ${+state.page - 1}</button>
          <span>${state.page}</span>
          <button data-turn-page="1" type="button" class="page-btn">Page ${+state.page + 1} ></button>
        </div>
      `
      document.querySelector('.drink-wrapper').insertAdjacentHTML('beforeend', html);
    }

    // if on last page of multiple pages
    if (+state.totalPages === +state.page) {
      const html = `
        <div class="btn-container">
          <button data-turn-page="-1" type="button" class="page-btn">< Page ${+state.page - 1}</button>
          <span>${state.page}</span>
        </div>
      `
      document.querySelector('.drink-wrapper').insertAdjacentHTML('beforeend', html);
    }
    const pageBtns = document.querySelectorAll('.page-btn');

    return pageBtns;

  }

  addEventListeners(btn) {
    // btn.addEventListener('click', this.handlePageChange);
    btn.addEventListener('click', e => {
      console.log(e.target.dataset.operator);
    });
  }

  // handlePageChange(e) {
  //   console.log(e.target.dataset.operator);
  // }

}