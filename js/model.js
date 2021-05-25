import { RES_PER_PAGE } from './config.js';

export default class Data {

  state = {
    data: null,
    page: 3,
    totalPages: 1
  }

  async getProducts(url) {
    try {
      // console.log(url)
      const res = await fetch(url);
      if (!res) return new Error('Oops! Could not find your drinks.');
      const {drinks} = await res.json();
      this.state.data = drinks;
      this.state.totalPages = Math.ceil(this.state.data.length / RES_PER_PAGE);
      console.log(this.state.totalPages);
      const results = await this.pagination();
      console.log(results);
      return results;
    } catch (e) {
      console.error(`Oops! ${e.message}`);
    }
  }

  pagination() {
    const trimStart = (this.state.page - 1) * RES_PER_PAGE;
    const trimEnd = trimStart + RES_PER_PAGE;
    const results = this.state.data.slice(trimStart, trimEnd);

    return results;
  }

}