
import { Comic, Favorites } from "./clases.js";
import { updateHeaderData } from "./header.js"; 

const favoriteWrapper = document.querySelector('.favorite-wrapper'); //seleccionar container


let userFavoritesData = JSON.parse(localStorage.getItem('userFavorites')); //Sacamos los favoritos de LS.

let userFavorites = new Favorites(...userFavoritesData.map((favorite) => { //Creamos una instancia de los favoritos
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

        deleteFavoriteBtn.addEventListener('click', ()=> { //Llamos al metodo para eliminar favoritos al hacer click
            userFavorites.removeFavorite(favorite.id);
            favoriteContainer.remove();
            alert(`${favorite.title} eliminado de tus favoritos`);
            updateHeaderData(); //Actualizamos cabecera con nuevo num de favoritos.
        })

        const favoriteImg = document.createElement('img');
        favoriteImg.src = favorite.getThumbnailURL(); //Llamamos al metodo para conseguir el Thumbnail

        infoWrapper.appendChild(favoriteTitle); //Hacemos append de todos los elementos.
        infoWrapper.appendChild(favoriteDescription);
        infoWrapper.appendChild(deleteFavoriteBtn);
        favoriteContainer.appendChild(favoriteImg);
        secondColumn.appendChild(infoWrapper);
        favoriteContainer.appendChild(secondColumn);
        favoriteWrapper.appendChild(favoriteContainer);
    })
    
}