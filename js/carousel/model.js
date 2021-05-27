class Data {

  state = {
    allImgs: null,
    index: 1,
    totalImgs: 1
  }

  async loadResults(url) {
    console.log(url);
    try {
      const res = await fetch(url);
      console.log(res);
      if (!res.ok) return new Error('Oops! Could not find your drinks.');
      const {drinks} = await res.json();
      this.state.allImgs = drinks;
      this.state.totalImgs = Math.ceil(this.state.allImgs.length);
      console.log(`Total Images: ${this.state.totalImgs}`);
    } catch (e) {
      console.error(`Oops! ${e.message}`);
    }
  }

  // pagination() {
  //   const trimStart = (this.state.page - 1) * RES_PER_PAGE;
  //   const trimEnd = trimStart + RES_PER_PAGE;
  //   const results = this.state.allData.slice(trimStart, trimEnd);

  //   return results;
  // }

  // changePage(val) {
  //   this.state.page += val;
  //   view.renderProducts(this.getProducts, API_URL);
  // }

}

export default new Data();