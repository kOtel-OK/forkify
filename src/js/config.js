export const API_URL = 'https://forkify-api.herokuapp.com/api/v2/recipes';
export const TIMIOUT_FETCH_SEC = 10;
export const RESULTS_PER_PAGE = 10;
export const DOMElements = {
  recipeContainer: document.querySelector('.recipe'),
  allRecipesContainer: document.querySelector('.search-results .results'),
  btnSearch: document.querySelector('.search__btn'),
  // btnBookmark: document.querySelector('.recipe__details .btn--round'),
  inptSearch: document.querySelector('.search__field'),
  paginationContainer: document.querySelector('.pagination'),
  bookmarks: document.querySelector('.bookmarks__list'),
};
