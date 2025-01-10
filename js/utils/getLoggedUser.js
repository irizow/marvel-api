import { User, Favorites } from "../clases.js"; //importamos clases necesarias

if(!localStorage.getItem('loggedUser')) { //Si no hay ningun usuario logeado lo anunciamos
    alert('Debes iniciar sesión para visualizar esta página');
    window.location.href = 'index.html';
}
//Conseguimos los datos del usuario
const loggedUserData = localStorage.getItem('loggedUser') ? JSON.parse(localStorage.getItem('loggedUser')) : '';


if(!localStorage.getItem('userFavorites')) { //Si aún no hay favoritos en la sesión, hacemos set en LS de los favoritos 
                                            // que el usuario tenía antes del log in
    localStorage.setItem('userFavorites', JSON.stringify(loggedUserData.favorites.comics));
}


export const loggedUser = new User( //Creamos una instancia de User con los datos del loggedUser
        loggedUserData.name,
        loggedUserData.surname,
        loggedUserData.username,
        loggedUserData.password,
        loggedUserData.email,
        loggedUserData.address,
        loggedUserData.community,
        new Favorites(...JSON.parse(localStorage.getItem('userFavorites'))),
)

export let userName = loggedUser.username //exportamos el nombre de usuario para el header


export function logOut() {
    const userFavorites = JSON.parse(localStorage.getItem('userFavorites')); //Sacamos los favoritos guardados en LS
    loggedUser.addFavorites(...userFavorites); //Añadimos los favoritos a nuestro usuario
    const existingUsers = JSON.parse(localStorage.getItem('users')); //Sacamos todos los users de LS
    const filteredUsers = existingUsers.filter((user) => user.username !== loggedUser.username); //Filtramos LS para sacar nuestro usuario logeado de la lista 
                                                                                               // de usuarios (ya que los datos están desactualizados)
    const updatedUsers = [...filteredUsers, loggedUser]; //Actualizamos con el resto de usuarios más nuestro loggedUser (actualizado)
    localStorage.setItem('users', JSON.stringify(updatedUsers)); //Guardamos en LS
    localStorage.removeItem('loggedUser'); //Eliminamos el loggedUser de LS para indicar que no hay nadie en la sesión
    localStorage.removeItem('userFavorites'); //Reseteamos los favoritos de LS
    window.location.href = 'index.html'; //Redirigimos al log in
}
