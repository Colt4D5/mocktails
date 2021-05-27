import { API_URL } from './config.js';
import view from './view.js';
import model from './model.js';

// CONTROLLER
document.addEventListener('DOMContentLoaded', async () => {
	// GET INITIAL PRODUCT
	await model.loadResults(API_URL);

	await view.renderHighlight(model._highlight);
});