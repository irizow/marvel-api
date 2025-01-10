import { Comic } from "./clases.js";
import { updateHeaderData } from "./header.js";


export function seeDetail() {
    const comic = JSON.parse(localStorage.getItem('comicDetail')); //Sacamos el detalle que hemos guardado en LS al hacer click
    const comicDetail = new Comic( //Creamos nueva instancia con los datos de LS
        comic.id,
        comic.title,
        comic.issueNumber,
        comic.description,
        comic.pageCount,
        comic.thumbnail,
        comic.prices,
        comic.creators,
        comic.characters
        )
        
    const comicContainer = document.getElementById('detail-container');

    const detailImg = document.createElement('img');
    detailImg.src = comicDetail.getThumbnailURL();
    
    const secondColumn = document.createElement('div');
    const descriptionWrapper = document.createElement('div');

    const detailTitle = document.createElement('h3');
    detailTitle.textContent = comicDetail.title

    const detailDescription = document.createElement('p');
    detailDescription.textContent = comicDetail.description === '' || comicDetail.description === null ? 'No hay descripción disponible' : comicDetail.description;
    
    descriptionWrapper.append(detailTitle, detailDescription);
    secondColumn.append(descriptionWrapper);
    comicContainer.append(detailImg, secondColumn);

}

document.addEventListener('DOMContentLoaded', seeDetail)






