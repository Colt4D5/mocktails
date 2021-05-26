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

		await view.renderResults(model.state);
	});
});