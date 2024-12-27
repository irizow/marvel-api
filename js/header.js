const usernameElement = document.getElementById('user-name')
const favoriteCounter = document.getElementById('favorite-counter')
import { loggedUserInstance } from '../js/utils/getLoggedUser.js'

window.addEventListener('load', updateHeaderData);

export function updateHeaderData() {
const userFavorites = loggedUserInstance.favorites.getFavorites();
usernameElement.textContent = loggedUserInstance.username;
favoriteCounter.textContent = userFavorites.length;
}