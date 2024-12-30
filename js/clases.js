
export class Comic {
    constructor(id, title, issueNumber, description, pageCount, thumbnail, price, creators, characters) {
      this.id = id,
      this.title = title,
      this.issueNumber = issueNumber,
      this.description = description,
      this.pageCount = pageCount,
      this.thumbnail = thumbnail,
      this.price = price,
      this.creators = creators,
      this.characters = characters
    }

    getThumbnailURL() { //Metodo para facilitar el acceso al enlace del thumbnail
        return `${this.thumbnail.path}.${this.thumbnail.extension}`
    }
  }



export class Favorites {
    constructor(...comics) {
      this.comics = [...comics];
    }
  
    addFavorite(comic) {
        this.comics.push(comic); //Añadimos favoritos a la lista
        this.saveFavorites(); //Guardamos en localStorage
    }

  
    removeFavorite(comicId) {
      const filteredComics = this.comics.filter((comic) => comic.id !== comicId); //Sacamos los comics que no coinciden con el id que queremos eliminar
      this.comics.length = 0 //Vaciamos los favoritos
      this.comics.push(...filteredComics); //Actualizamos haciendo push de los comics filtrados
      this.saveFavorites(); //guardamos a localStorage
    }
  
    showFavorites() {
      this.comics.forEach((comic) => console.log(comic.title)); //Sacamos los titulos de los comics
    }
  
    addMultipleFavorites(...comics) {
      this.comics.push(...comics); //Añadimos multiples comics con el spread operator
      this.saveFavorites(); //Guardamos en localStorage
    }

    saveFavorites() {
        localStorage.setItem('userFavorites', JSON.stringify(this.comics)) //Guardamos los comics que estan en nuestros favoritos al localStorage
    }
  
    copyFavorites() { //
      const copy = new Favorite(...this.comics)
      return copy;
    }

    
    findComicById(id, index = 0) {
      if(index > this.comics.length - 1) return console.log('No podemos encontrar el comic en esta lista');

      if(this.comics[index].id === id) return this.comics[index];

      return this.findComicById( id, index + 1);
    }


    getAffordableComicTitles(maxPrice) {
        const affordableComics = this.comics.filter((comic) => comic.price <= maxPrice);
   
        const comictitles = affordableComics.map((comic) => comic.title);
        
        return comictitles
    }

    calculateAveragePrice() {
        const total = this.comics.reduce((acc, comic) => {
            return acc + comic.price;
          }, 0)
        
          const avg = total / this.comics.length;
        
          return avg.toFixed(2);
        
    }
  
  }
 
 export class User {
    constructor (name, surname, username, password, email, address, community, favorites) {
        this.name = name,
        this.surname = surname,
        this.username = username,
        this.password = password,
        this.email = email,
        this.address = address,
        this.community = community,
        this.favorites = favorites;
    }

    addFavorite(favorite) {
        this.favorites.addFavorite(favorite)
    }

    addFavorites(...favorites) {
        this.favorites = new Favorites(...favorites)
    }
}

