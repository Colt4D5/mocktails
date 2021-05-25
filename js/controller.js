import { API_URL } from './config.js';
import View from './view.js';
import Data from './model.js';

// CONTROLLER
document.addEventListener('DOMContentLoaded', async () => {
	const view = new View();
	const data = new Data();
	
	// GET PRODUCTS
	await data.getProducts(API_URL)
    .then(data => view.displayProducts(data))
    .then(() => view.generatePageBtns(data.state))
		// .then(btns => {
		// 	console.log(btns);
		// 	btns.forEach(btn => view.addEventListeners(btn));
		// });
		// .then(btns => view.handlePageChange(btns));

	// EVENT LISTENERS
	document.querySelector('.drink-wrapper').addEventListener('click', data.changePage.bind(data));
});