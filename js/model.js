import { RES_PER_PAGE } from './config.js';

class Data {

  state = {
    allData: null,
    page: 1,
    totalPages: 1
  }

  async loadResults(url, category) {
    try {
      const res = await fetch(url + category);
      if (!res) return new Error('Oops! Could not find your drinks.');
      const {drinks} = await res.json();
      this.state.allData = drinks;
      this.state.totalPages = Math.ceil(this.state.allData.length / RES_PER_PAGE);
      console.log(`Total Pages: ${this.state.totalPages}`);
    } catch (e) {
      console.error(`Oops! ${e.message}`);
    }
  }

  pagination() {
    const trimStart = (this.state.page - 1) * RES_PER_PAGE;
    const trimEnd = trimStart + RES_PER_PAGE;
    const results = this.state.allData.slice(trimStart, trimEnd);

    return results;
  }

  // changePage(val) {
  //   this.state.page += val;
  //   view.renderProducts(this.getProducts, API_URL);
  // }

}

export default new Data();