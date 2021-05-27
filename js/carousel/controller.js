import { API_URL } from './config.js';
import view from './view.js';
import model from './model.js';

// CONTROLLER
document.addEventListener('DOMContentLoaded', async () => {
	// GET INITIAL PRODUCTS
	await model.loadResults(API_URL);

	await view.renderResults(model.state);
});