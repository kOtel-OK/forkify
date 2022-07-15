import { TIMIOUT_FETCH_SEC } from './config.js';

export const getJSON = async function (url) {
  try {
    const response = await Promise.race([
      fetch(url),
      timeout(TIMIOUT_FETCH_SEC),
    ]);
    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message} (${response.status})`);
    return data;
  } catch (error) {
    // Re-trhrowing the error from async to async, to catch it in model.js
    // Mark the whole Promise (async function) as rejected
    throw error;
  }
};

export const recipeNameCheck = function (recipeName, inputElement) {
  // Check if input contains numbers & empty strings
  if (
    /\D/.test(recipeName) &&
    !recipeName.includes(' ') &&
    recipeName.length > 0
  ) {
    inputElement.value = '';
    return recipeName.toLowerCase();
  } else {
    inputElement.value = '';
    throw new Error('Incorrect value! Please check the input data!');
  }
};

// Reurns Promise as rejected if the request took long time
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
