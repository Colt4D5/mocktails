import { API_KEY } from './config.js';

class View {
  _parentContainer = document.querySelector('.img-carousel-container');
  _data;
  _currentImg = 0;
  _dotContainer = document.querySelector('.img-dots');
  _drinkInfo;

  async renderResults(data) {
    this._data = data;
    // console.log(this._data);

    await this.generateMarkup();

    this.handleCarousel();
  }

  clearHTML() {
    this._parentContainer.innerHTML = '';
  }

  generateMarkup() {
    this._data.allImgs.map((drink, i) => {
      const markup = `
          <div data-drink-id="${drink.idDrink}" class="carousel-title-wrapper"><h4 class="carousel-title">${drink.strDrink}</h4></div>
          <img class="img-cocktail" data-index="${i}" src="${drink.strDrinkThumb}" alt="${drink.strDrink} thumbnail" />
          `;
      this.renderHTML(markup);
      this.insertDot(i);
    });
    this.setActiveDot();
  }

  insertDot(i) {
    const dot = `
        <div data-index="${i}" class="dot"></div>
      `;
    this._dotContainer.insertAdjacentHTML('beforeend', dot);
  }

  renderHTML(html) {
    this._parentContainer.insertAdjacentHTML('beforeend', html);
  }

  handleCarousel() {
    const imgs = document.querySelectorAll('.img-cocktail');
    const titles = document.querySelectorAll('.carousel-title-wrapper');
    imgs.forEach((img, i) => {
      img.style.transform = `translateX(${100 * (i - this._currentImg)}%)`;
    });
    titles.forEach((title, i) => {
      title.style.transform = `translateX(${-200 * (i - this._currentImg)}%)`;
    });
  }

  handleCarouselClick(e) {
    if (e.target.closest('button')) {
      const value = Number(e.target.closest('button').dataset.value);
      if (this._currentImg <= 0 && value === -1 ||
          this._currentImg >= this._data.allImgs.length - 1 && value === 1) return console.log("Can't Do that!");
      this.scrollCarousel(value);
    } else if (e.target.closest('.dot')) {
      const dotIndex = e.target.dataset.index;
      this.scrollCarouselTo(dotIndex);
    } else if (e.target.closest('.carousel-title-wrapper')) {
      const id = e.target.closest('.carousel-title-wrapper').dataset.drinkId;
      // console.log(id);
      this.toggleModal(id);
    } else {
      return;
    }

  }

  scrollCarousel(value) {
    this._currentImg += value;
    console.log(this._currentImg);
    const imgs = document.querySelectorAll('.img-cocktail');
    const titles = document.querySelectorAll('.carousel-title-wrapper');
    imgs.forEach((img, i) => {
      img.style.transform = `translateX(${100 * (i - this._currentImg)}%)`;
    });
    titles.forEach((title, i) => {
      title.style.transform = `translateX(${-200 * (i - this._currentImg)}%)`;
    });
    this.setActiveDot();
  }

  scrollCarouselTo(i) {
    const imgs = document.querySelectorAll('.img-cocktail');
    const titles = document.querySelectorAll('.carousel-title-wrapper');
    this._currentImg = Number(i);
    imgs.forEach((img, i) => {
      img.style.transform = `translateX(${100 * (i - this._currentImg)}%)`;
    });
    titles.forEach((title, i) => {
      title.style.transform = `translateX(${-200 * (i - this._currentImg)}%)`;
    });
    this.setActiveDot();
  }

  setActiveDot() {
    const dots = document.querySelectorAll('.dot');
    const index = Number(this._currentImg);
    dots.forEach((dot, i) => {
      dot.classList.remove('active');
      if (index === i) dot.classList.add('active');
    });
  }

    // I know this is not supposed to be in the View... :(
  async toggleModal(id) {
    await this.fetchDrinkInfo(id);
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

      this.populateModal();
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

  addEventHandlers() {
    const btns = document.querySelectorAll('.page-btn');

    btns.forEach(btn => {
      btn.addEventListener('click', this.changePage.bind(this));
    })
  }
}

export default new View();