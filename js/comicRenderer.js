import { Comic } from "./clases.js";
import { initialIndex, comicsPerPage } from "./pagination.js";
import { loggedUser } from "./utils/getLoggedUser.js";
import { updateHeaderData } from "./header.js";

export let comicsArr = [];//Creamos un empty array para guardar los objeto

export function createComics(comics) {
    updateHeaderData();
    comicsArr = [];
    comics.forEach((comic) => { //Creamos una instancia de la clase comic por cada comic sacado de la API
        const comicObj = new Comic(
            comic.id,
            comic.title,
            comic.issueNumber,
            comic.description,
            comic.pageCount,
            comic.thumbnail,
            comic.prices[0],
            comic.creators,
            comic.characters
        )
        comicsArr.push(comicObj);
    })
    renderComics(comicsArr.slice(initialIndex, initialIndex + comicsPerPage)); //Renderizamos los comics
}

    
    
export function renderComics(comicsArr){
        const comicsPage = document.getElementById('comics'); //Seleccionamos el container del DOM
        comicsPage.innerHTML = ''; //Vaciamos los comics
        const comicWrapper = document.createElement('div'); //Creamos un container
        comicWrapper.classList.add('comic-wrapper');
    
        comicsArr.forEach((comic) => { //Por cada uno de los comics que hemos sacado anteriormente...
            const comicContainer = document.createElement('div'); //creamos un container para el comic
            comicContainer.classList.add('comic-container');
    
            const comicTitle = document.createElement('h3'); //h3 para el titulo
            comicTitle.textContent = comic.title;
    
            const comicImg = document.createElement('img'); //Sacamos la imagen con el path y la extensión
            comicImg.src = comic.getThumbnailURL();
    
            const comicDescription = document.createElement('p'); //Si el comic tiene descripción la renderizamos, en caso opuesto indicamos que no hay descripción
            comicDescription.textContent = comic.description === '' || comic.description === null ? 'No hay descripción disponible' : comic.description;
    
            const buttonWrapper = document.createElement('div'); //Creamos los botones para añadir a favoritos y ver detalles
            buttonWrapper.classList.add('button-wrapper')
            const addToFavorites = document.createElement('button');
            addToFavorites.textContent = 'Añadir a Favoritos'
    
            addToFavorites.addEventListener('click', ()=> {
                if(loggedUser.favorites.comics.some((favorite) => favorite.id === comic.id)) {
                    alert('Este comic ya está en favoritos!') //Comprobamos si el comic al que hacemos ya está en favoritos
                }
                else {
                    loggedUser.favorites.addFavorite(comic); //Llamamos al método de clase para añadirlo
                    alert(`${comic.title} añadido a favoritos`)
                    updateHeaderData() //actualizamos el numero de favoritos en la cabezera
                }
            });
    
            const viewDetails = document.createElement('a');
            viewDetails.textContent = 'Ver Detalles';

            viewDetails.addEventListener('click', ()=> {
                localStorage.setItem('comicDetail', JSON.stringify(comic)); //Añadimos el comic del que queremos ver el detalle en LS
                window.location.href = 'detail.html'; //Redirigimos a details
            })
    
            comicContainer.appendChild(comicTitle); //Hacemos append de todos los elementos creados
            comicContainer.appendChild(comicImg);
            comicContainer.appendChild(comicDescription);
            buttonWrapper.appendChild(addToFavorites);
            buttonWrapper.appendChild(viewDetails);
            comicContainer.appendChild(buttonWrapper);
            comicWrapper.appendChild(comicContainer);
            comicsPage.appendChild(comicWrapper);
        }) 
}

