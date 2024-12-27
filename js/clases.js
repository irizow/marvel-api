
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

    getThumbnailURL() {
        return `${this.thumbnail.path}.${this.thumbnail.extension}`
    }
  }

export class Favorites {
    constructor(...comics) {
      this.comics = [...comics];
    }
  
    addFavorite(comic) {
      this.comics.push(comic)
      localStorage.setItem('userFavorites', JSON.stringify(this.comics));
    }

    createNewInstance(favorites) {
        const favoriteInstances = [];
        if(favorites.length) {
            favorites.forEach((favorite) => {
            const favoriteInstance = new Comic(
                favorite.id,
                favorite.title,
                favorite.issueNumber,
                favorite.description,
                favorite.pageCount,
                favorite.thumbnail,
                favorite.prices,
                favorite.creators,
                favorite.characters
            )
            favoriteInstances.push(favoriteInstance);
        })
        }
        return favoriteInstances;

    }

    getFavorites() {
        const favorites = JSON.parse(localStorage.getItem('userFavorites')) || [];
        return this.createNewInstance(favorites);
    }
  
    removeFavorite(comicId) {
      const filteredComics = this.comics.filter((comic) => comic.id !== comicId);
      this.comics.length = 0
      this.comics.push(...filteredComics);
      const newFavorites = this.createNewInstance(filteredComics);
      localStorage.setItem('userFavorites', JSON.stringify(newFavorites));
    }
  
    showFavorites() {
      this.comics.forEach((comic) => console.log(comic.title));
    }
  
    addMultipleFavorites(...comics) {
      this.comics.push(...comics)
    }
  
    copyFavorites() {
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
}

