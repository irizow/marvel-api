
//importar fetchData de la carpeta utils
import { fetchData } from "./utils/fetchData.js";
const comics = await fetchData('comics'); //Hacer el fetch

let initialIndex = 0; //Indice de donde empieza la paginación
let comicsPerPage = 9; //Numero de comics que queremos por página

const handleNext = ()=> { //Si el indice más los comics por página es más largo que los resultados, debería quedar igual
                            //si no, sumamos los comics por página al indice inicial y volvemos a renderizar
    initialIndex = initialIndex + comicsPerPage >= comics.data.results.length ? initialIndex : initialIndex + comicsPerPage;
    renderComics();
    console.log('initial', + initialIndex)
}

const handlePrev = ()=> { //Si el indice menos los comics que queremos renderizar es menor o igual a cero, ponemos el indice a 0
                        //Si no, restamos el numero de comics por página al indice y renderizamos otra vez
    initialIndex = initialIndex-comicsPerPage <= 0 ? 0 : initialIndex-comicsPerPage;
    renderComics();
}

const prevButton = document.getElementById('prev'); //Seleccionamos los botones del DOM
const nextButton = document.getElementById('next');

prevButton.addEventListener('click', handlePrev);
nextButton.addEventListener('click', handleNext);



console.log(comics.data.results) //logeamos por visualización

const loggedUser = localStorage.getItem('loggedUser'); //Sacamos el user que esta loggeado;

const comicsPage = document.getElementById('comics'); //Seleccionamos el container del DOM

if(loggedUser === '') { //Si no hay ningun usuario logeado lo anunciamos
    const p1 = document.createElement('p');
    p1.textContent = 'Lo siento, debes iniciar sesión para visualizar esta página'
    const p2 = document.createElement('p')
    const link = document.createElement('a');
    link.href = 'index.html'
    link.textContent = 'Inicia Sesión';

    comicsPage.appendChild(p1);
    comicsPage.appendChild(p2);
    p2.appendChild(link);
}

else { //Si hay un usuario logeado...
        renderComics();
}

function renderComics(){
    comicsPage.innerHTML = ''; //Vaciamos los comics
    let comicsOnDisplay = comics.data.results.slice(initialIndex, initialIndex + comicsPerPage); //Sacamos el numero de comics indicados en la paginación
    const comicWrapper = document.createElement('div'); //Creamos un container
    comicWrapper.classList.add('comic-wrapper');

    comicsOnDisplay.forEach((comic) => { //Por cada uno de los comics que hemos sacado anteriormente...
        const comicContainer = document.createElement('div'); //creamos un container para el comic
        comicContainer.classList.add('comic-container');

        const comicTitle = document.createElement('h3'); //h3 para el titulo
        comicTitle.textContent = comic.title;

        const comicImg = document.createElement('img'); //Sacamos la imagen con el path y la extensión
        comicImg.src = comic.thumbnail.path + '.' + comic.thumbnail.extension;

        const comicDescription = document.createElement('p'); //Si el comic tiene descripción la renderizamos, en caso opuesto indicamos que no hay descripción
        comicDescription.textContent = comic.description === '' ? 'No hay descripción disponible' : comic.description;

        const buttonWrapper = document.createElement('div'); //Creamos los botones para añadir a favoritos y ver detalles
        buttonWrapper.classList.add('button-wrapper')
        const addToFavorites = document.createElement('button');
        addToFavorites.textContent = 'Añadir a Favoritos'
        const viewDetails = document.createElement('a');
        viewDetails.textContent = 'Ver Detalles'

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




