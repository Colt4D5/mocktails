import { API_URL } from './config.js';
import view from './view.js';
import model from './model.js';

// const testCategory = 'Coffee / Tea';

// CONTROLLER
document.addEventListener('DOMContentLoaded', async () => {
	// GET INITIAL PRODUCTS
	const category = document.querySelector('#category-selector').value;

	await model.loadResults(API_URL, category);

	await view.renderResults(model.state);

	// EVENT LISTENERS
	document.querySelector('#category-selector').addEventListener('change', async (e) => {
		const selection = e.target.value;

		await model.loadResults(API_URL, selection);

		model.state.page = 1;

		// switch(selection) {
		// 	case 'Cocktail':
		// 		document.querySelector('.drink-wrapper').style.backgroundColor = 'palegreen';
		// 		break;
		// 	case 'Ordinary Drink':
		// 		document.querySelector('.drink-wrapper').style.backgroundColor = 'paleTurquoise';
		// 		break;
		// 	case 'Milk / Float / Shake':
		// 		document.querySelector('.drink-wrapper').style.backgroundColor = 'lightpink';
		// 		break;
		// }

		await view.renderResults(model.state);
	});
	
	document.querySelector('#drinks-container').addEventListener('click', view.handleCarouselClick.bind(view));
	document.querySelector('.modal-wrapper').addEventListener('click', view.closeModal);
});