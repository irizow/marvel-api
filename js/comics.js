
//importar fetchData de la carpeta utils
import { fetchData } from "./utils/fetchData.js";
import { comicsArr } from "./comicRenderer.js";
import { updateHeaderData } from "./header.js";
import { handleNext, handlePrev } from "./pagination.js";
import { createComics } from "./comicRenderer.js";

updateHeaderData();
if(!localStorage.getItem('loggedUser')) { //Si no hay ningun usuario logeado lo anunciamos
    alert('Debes iniciar sesión para visualizar esta página');
    window.location.href = 'index.html';
}
let comics = await fetchData('comics'); //Hacer el fetch inicial



const prevButton = document.getElementById('prev'); //Seleccionamos los botones del DOM
const nextButton = document.getElementById('next');

prevButton.addEventListener('click', () => handlePrev(comics.data.results.length));
nextButton.addEventListener('click', () => handleNext());



const heroeButtons = document.querySelectorAll('.heroe-button');

heroeButtons.forEach((button) => {
    button.addEventListener('click', fetchHeroeComics);
})

async function fetchHeroeComics(e) {
    if(e.target.textContent === 'Todos') {
        comics = await fetchData('comics');
    }
    else {
        console.log('fetching heroes')
        comics = await fetchData(`characters/${e.target.id}/comics`);
    }
        createComics(comics.data.results, comicsArr);
    }
   

createComics(comics.data.results);


    






