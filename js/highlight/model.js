class Data {

  _highlight;

  async loadResults(url) {
    // console.log(url);
    try {
      const res = await fetch(url);
      if (!res) return new Error('Oops! Could not find your drinks.');
      const {drinks} = await res.json();
      const drink = drinks[0];
      const drinkObj = {
        name: drink.strDrink,
        img: drink.strDrinkThumb,
        glass: drink.strGlass,
        instructions: drink.strInstructions,
        ing1: drink.strIngredient1,
        ing2: drink.strIngredient2,
        ing3: drink.strIngredient3,
        ing4: drink.strIngredient4,
        measure1: drink.strMeasure1,
        measure2: drink.strMeasure2
      };
      this._highlight = drinkObj;
    } catch (e) {
      console.error(`Oops! ${e.message}`);
    }
  }
}

export default new Data();