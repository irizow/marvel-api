import { Comic } from "./clases.js";
import { updateHeaderData } from "./header.js";


export function seeDetail() {
    updateHeaderData();
    const comic = JSON.parse(localStorage.getItem('comicDetail'));
    const comicDetail = new Comic(
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
    console.log('accessing function detail')
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






