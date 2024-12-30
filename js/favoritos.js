
import { Comic, Favorites } from "./clases.js";
import { updateHeaderData } from "./header.js"; 

const favoriteWrapper = document.querySelector('.favorite-wrapper'); //seleccionar container


let userFavoritesData = JSON.parse(localStorage.getItem('userFavorites'));
console.log('gooser favs', userFavoritesData)
let userFavorites = new Favorites(...userFavoritesData.map((favorite) => {
    return new Comic(
        favorite.id,
        favorite.title,
        favorite.issueNumber,
        favorite.description,
        favorite.pageCount,
        favorite.thumbnail,
        favorite.price,
        favorite.creators,
        favorite.characters,
    )
}))
console.log('gooser favorites 2', userFavorites)


if(userFavorites.comics.length) { //Si hay favoritos...
    userFavorites.comics.forEach((favorite) => { //Crear un container con su información por cada favorito
        const favoriteContainer = document.createElement('div');
        favoriteContainer.classList.add('favorite-container');

        const infoWrapper = document.createElement('div');
        const secondColumn = document.createElement('div');

        const favoriteTitle = document.createElement('h3');
        favoriteTitle.textContent = favorite.title;

        const favoriteDescription = document.createElement('p');
        favoriteDescription.textContent = favorite.description === ('' || null) ? 'No hay descripción disponible' : favorite.description;

        const deleteFavoriteBtn = document.createElement('button');
        deleteFavoriteBtn.textContent = 'Eliminar de Favoritos';

        console.log('favorite', favorite)
        deleteFavoriteBtn.addEventListener('click', ()=> {
            userFavorites.removeFavorite(favorite.id);
            favoriteContainer.remove();
            alert(`${favorite.title} eliminado de tus favoritos`);
            updateHeaderData();
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