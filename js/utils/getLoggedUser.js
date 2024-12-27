import { User, Favorites } from '../clases.js'

const loggedUser = JSON.parse(localStorage.getItem('loggedUser'))[0];
console.log(loggedUser) //Sacamos el user que esta loggeado;

export const loggedUserInstance = new User(
    loggedUser.name,
    loggedUser.surname,
    loggedUser.username,
    loggedUser.password,
    loggedUser.email,
    loggedUser.address,
    loggedUser.community,
    new Favorites()
)