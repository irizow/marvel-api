const usernameElement = document.getElementById('user-name')
const favoriteCounter = document.getElementById('favorite-counter')
import { loggedUser } from '../js/utils/getLoggedUser.js';
import {userName, logOut } from '../js/utils/getLoggedUser.js'


window.addEventListener('load', updateHeaderData);

export function updateHeaderData() {
    const favoritesCount = JSON.parse(localStorage.getItem('userFavorites')).length
    console.log('header user favorites', favoritesCount)
    usernameElement.textContent = userName;
    favoriteCounter.textContent = favoritesCount;
}

const logOutBtn = document.getElementById('log-out');

logOutBtn.addEventListener('click', logOut)