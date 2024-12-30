import { renderComics } from "./comicRenderer.js";
import { comicsArr } from "./comicRenderer.js";

export let initialIndex = 0; //Indice de donde empieza la paginación
export let comicsPerPage = 9; //Numero de comics que queremos por página

export const handleNext = (length)=> { //Si el indice más los comics por página es más largo que los resultados, debería quedar igual
    //si no, sumamos los comics por página al indice inicial y volvemos a renderizar
initialIndex = initialIndex + comicsPerPage >= length ? initialIndex : initialIndex + comicsPerPage;
let slicedComics =  comicsArr.slice(initialIndex, initialIndex + comicsPerPage);
renderComics(slicedComics);
}

export const handlePrev = ()=> { //Si el indice menos los comics que queremos renderizar es menor o igual a cero, ponemos el indice a 0
//Si no, restamos el numero de comics por página al indice y renderizamos otra vez
initialIndex = initialIndex-comicsPerPage <= 0 ? 0 : initialIndex-comicsPerPage;
let slicedComics =  comicsArr.slice(initialIndex, initialIndex + comicsPerPage);
renderComics(slicedComics);
}
