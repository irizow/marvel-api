
const publicKey = '1e69ddd97851f4a54cb850409947ed6e';
const privateKey = 'da8095ff64d12ae2279080296da0725521788e65'
const ts = new Date().getTime()
console.log('ts', ts);
const hashString = ts + privateKey + publicKey;
const hash = md5(hashString);
console.log('hash', hashString)



export async function fetchData(path) {
    const url = `https://gateway.marvel.com/v1/public/${path}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    try {
    const response = await fetch(url)
    if(response.ok){
    const data = await response.json();
    console.log(data)
    return data;
    }
    }
    catch(error) {
        console.log(error);
    }
}