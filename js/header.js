const usernameElement = document.getElementById('user-name')
const favoriteCounter = document.getElementById('favorite-counter')
import {userName, logOut } from '../js/utils/getLoggedUser.js'


window.addEventListener('load', updateHeaderData); //Actualizamos cabecera cada vez que carga

export function updateHeaderData() { 
    const favoritesCount = JSON.parse(localStorage.getItem('userFavorites')).length //Sacamos el numero de favoritos guardados
    usernameElement.textContent = userName; //Sacamos el nombre de usuario de getLoggedUser
    favoriteCounter.textContent = favoritesCount;
}

const logOutBtn = document.getElementById('log-out');

logOutBtn.addEventListener('click', logOut) //Llamamos función logOut en click