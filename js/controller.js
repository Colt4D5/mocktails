import { API_URL } from './config.js';
import View from './view.js';
import Data from './model.js';

// CONTROLLER
document.addEventListener('DOMContentLoaded', () => {
	const view = new View();
	const data = new Data();
	
	// GET PRODUCTS
	data.getProducts(API_URL)
    .then(data => view.displayProducts(data))
    .then(() => view.generatePageBtns(data.state));
    // .then(products => {
    //   console.log(products);
		  // ui.displayProducts(products);
	  // });
	
	// EVENT LISTENERS
	// productsContainer.addEventListener('click', ui.addToCart.bind(ui));
	// cartDOM.addEventListener('click', ui.handleCartClick.bind(ui));
	// cartBtn.addEventListener('click', ui.toggleCart);
	// hamburger.addEventListener('click', () => menu.classList.toggle('hidden'));
});