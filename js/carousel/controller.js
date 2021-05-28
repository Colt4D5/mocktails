import { API_URL } from './config.js';
import view from './view.js';
import model from './model.js';

// CONTROLLER
document.addEventListener('DOMContentLoaded', async () => {
	// GET INITIAL PRODUCTS
	await model.loadResults(API_URL);

	await view.renderResults(model.state);

	// EVENT LISTENERS
	document.querySelector('.img-carousel-container').addEventListener('click', view.handleCarouselClick.bind(view));
	document.querySelector('.modal-wrapper').addEventListener('click', view.closeModal);
});