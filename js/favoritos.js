import { loggedUserInstance } from "./utils/getLoggedUser.js" //Importar usuario
import { updateHeaderData } from "./header.js";

const userFavorites = loggedUserInstance.favorites.getFavorites(); //Conseguir los favorites
loggedUserInstance.favorites.addMultipleFavorites(...userFavorites);
console.log('favorites', loggedUserInstance.favorites.comics);
const favoriteWrapper = document.querySelector('.favorite-wrapper'); //seleccionar container


if(loggedUserInstance.favorites.comics.length) { //Si hay favoritos...
    loggedUserInstance.favorites.comics.forEach((favorite) => { //Crear un container con su información por cada favorito
        const favoriteContainer = document.createElement('div');
        favoriteContainer.classList.add('favorite-container');

        const infoWrapper = document.createElement('div');
        const secondColumn = document.createElement('div');

        const favoriteTitle = document.createElement('h3');
        favoriteTitle.textContent = favorite.title;

        const favoriteDescription = document.createElement('p');
        favoriteDescription.textContent = favorite.description === '' ? 'No hay descripción disponible' : favorite.description;

        const deleteFavoriteBtn = document.createElement('button');
        deleteFavoriteBtn.textContent = 'Eliminar de Favoritos';

        console.log('favorite', favorite)
        deleteFavoriteBtn.addEventListener('click', ()=> {
            console.log('removing', favorite.id);
            loggedUserInstance.favorites.removeFavorite(favorite.id);
            updateHeaderData();
            favoriteContainer.remove();
        })

        const favoriteImg = document.createElement('img');
        favoriteImg.src = favorite.getThumbnailURL();

        infoWrapper.appendChild(favoriteTitle);
        infoWrapper.appendChild(favoriteDescription);
        infoWrapper.appendChild(deleteFavoriteBtn);
        favoriteContainer.appendChild(favoriteImg);
        secondColumn.appendChild(infoWrapper);
        favoriteContainer.appendChild(secondColumn);
        favoriteWrapper.appendChild(favoriteContainer);
    })
    
}