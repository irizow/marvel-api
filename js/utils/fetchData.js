
const publicKey = '1e69ddd97851f4a54cb850409947ed6e';
const privateKey = 'da8095ff64d12ae2279080296da0725521788e65'
const ts = new Date().getTime() //Sacamos el time stamps
const hashString = ts + privateKey + publicKey;
const hash = md5(hashString); //Hasheamos las claves con el algoritmo md5

const modal = document.getElementById('modal'); //Sacamos el modal del dom

export async function fetchData(path) {
    if(modal) modal.style.display = 'block'; //Antes de hacer el fetch, mostramos el modal en DOM
    const url = `https://gateway.marvel.com/v1/public/${path}?ts=${ts}&apikey=${publicKey}&hash=${hash}`; 
    try {
    const response = await fetch(url) //Esperamos que la promise se resuelva
    if(response.ok){ //Si se resuelve sin errores
    const data = await response.json(); //Parseamos la respuesta de la promise
    console.log(data)
    return data; //devolvemos la respuesta parseada
    }
    }
    catch(error) { //Si hay un error lo logeamos
        console.log(error);
    }
    finally {
        if(modal) modal.style.display = 'none'; //Cuando el proceso acabe volvemos a esconder el modal.
    }
}