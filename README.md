# Cocktail API Exercise
###### By Colton Arthur Allen

## Day 1

- Set up PHP Routing System
  - Route all requests to index.html and autoload routing classes
  - use controller to route based on url=parameters

- Test API endpoints (https://www.thecocktaildb.com/api/json/v2/1/filter.php?c=Cocktail)
  - Create Controller class
    - instantiate Model class
    - send API_URL to model to fetch data
  - Create Model class
    - try/catch async function to fetch data
    - console.log destructured response.json() to determine API structure
    - return array of drinks to the Controller
  - Create View class
    - Display Drink names on index

- Insert Adjacent HTML into index within a card with an id, title, and img

- Create Pagination
  - Establish a "state" within the model that stores all the data gathered, the current page, and total pages (calculated dynamically)
  - display sliced data based on current page and items per page

- Create dynamic page buttons
  - Calculate # of pages
  - Create a web of if statements based on current page and total pages, then insert the coordinating buttons on the page
  - Using button's dataset, increment or decrement the model's state.page