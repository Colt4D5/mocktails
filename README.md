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

## Day 2

- Completely refactored MVC to support pagination  :(
  - Pagination is now a feature of the View instead of the Model... because I'm stupid, Idk
    - To accomplish this, all the fetched data is stored in the View Class immediately after the initial fetch, and the pagination is handled internally instead of communicating with the Model (which was stupid). This allows for less behind-the-scenes work, as the data is already there and does not need to be refetched or resent
- Created a dropdown selector to change categories
  - Add an event listener to selector and console log the value of the change
  - Pass the new value to the model to refetch data with new category
  - send new state to the view for rendering

## Day 3

- Create design & layout in Figma
- Refactor request for highlighted drink section
  - Fetch Amaretto Sour by ID
  - Create object literal of drink w/ necessary info
  - Pass object to View where markup is generated and rendered in coresponding container
- Starting with mobile design, begin building and styling mobile site.
- Create drink of the week carousel
  - Refactor fetch for drink of the week carousel and pass drinks to View for markup to be generated and rendered
  - Design container with next and previous btns for carousel and active/inactive bubbles display
  - (Finishing carousel tomorrow)


## Day 4

- Finished Carousel functionality
  - Dynamically add images and drink names to gallery using the cocktailDB's patreon-supporter API key, as well as dynamically adding the dots at the bottom that determine which index you are currently on
  - Gallery scrolls with the left and right buttons as well as to a specific index when pushing the dots at the bottom
- Added a modal to the Carousel and the paginated drinks list
  - When an image is clicked, the drink ID is pulled and fetches the database (www.thecocktaildb.com/api/json/v2/${myPatreonApiKey}/lookup.php?i=${11007}) for that drink ID and returns the information
  - Populate the modal dynamically based on returned API data
  - Add event listeners to close button as well as the dark overlay to exit MODAL
- Finish mobile design
  - Added footer with mockup info

## Day Five

- Finished responsive styling
- Added mobile menu for easy access with smaller screens
  - Nav smooth scrolls to corresponding sections
- Removed PHP routing elements and requires, replaced with single-page html
- Installed Parcel Bundler for distribution
  - Added a script to start a dev environment session as well as a build script for deployment
