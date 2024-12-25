

import { fetchData } from "./utils/fetchData.js";
const comics = await fetchData('comics');
const initialIndex = 0;
const comicsPerPage = 12;
console.log(comics.data.results)

const isLoggedIn = localStorage.getItem('isLoggedIn');

const home = document.getElementById('home');

if(isLoggedIn === 'false') {
    const p1 = document.createElement('p');
    p1.textContent = 'Lo siento, debes iniciar sesión para visualizar esta página'
    const p2 = document.createElement('p')
    const link = document.createElement('a');
    link.href = 'index.html'
    link.textContent = 'Inicia Sesión';

    home.appendChild(p1);
    home.appendChild(p2);
    p2.appendChild(link);
}

else {
    let comicsOnDisplay = comics.data.results.slice(initialIndex, comicsPerPage);
    const comicWrapper = document.createElement('div');
    comicWrapper.classList.add('comic-wrapper');

    comicsOnDisplay.forEach((comic) => {
        const comicContainer = document.createElement('div');
        comicContainer.classList.add('comic-container');
        const comicTitle = document.createElement('h3');
        comicTitle.textContent = comic.title;
        comicContainer.appendChild(comicTitle);
        comicWrapper.appendChild(comicContainer);
        home.appendChild(comicWrapper);
    })
    
}


