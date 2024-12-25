const usernameElement = document.getElementById('user-name')
const favoriteCounter = document.getElementById('favorite-counter')

window.addEventListener('load', updateHeaderData);

function updateHeaderData() {
const loggedUser = JSON.parse(localStorage.getItem('loggedUser'))[0];
console.log(loggedUser)
usernameElement.textContent = loggedUser.username;
favoriteCounter.textContent = loggedUser.favorites.length;
}