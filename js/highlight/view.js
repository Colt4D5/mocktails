class View {
  _parentContainer = document.querySelector('#highlight-container');
  _data;

  renderHighlight(data) {
    this._data = data;
    
    const html = this.generateMarkup(this._data);

    this.insertHighlight(html);
  }

  generateMarkup(data) {
    const html = `
      <div class="img-highlight-wrapper">
        <img class="img-highlight" src="${data.img}" alt="${data.name} highlight">
        <div class="overlay-highlight">
          <p><strong>Glass</strong>: ${data.glass}</p>
          <p><strong>Instructions</strong>: ${data.instructions}</p>
          <p><strong>Ingredients</strong>:</p>
            <div class="ingredients-list">
              <ul>
                <li>${data.ing1} - ${data.measure1}</li>
                <li>${data.ing2} - ${data.measure2}</li>
                <li>${data.ing3}</li>
                <li>${data.ing4}</li>
              </ul>
            </div>
        </div>
      </div>
      <h3 class="title-highlight">${data.name}</h3>
      `;
      return html;
  }

  insertHighlight(html) {
    this._parentContainer.insertAdjacentHTML('beforeend', html);
  }
}

export default new View();