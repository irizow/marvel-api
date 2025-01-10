import { Favorites, User } from "./clases.js"; //Importar las clases usuario y favorites

const registerForm = document.getElementById('register-form'); 
registerForm.addEventListener('submit', validateForm);

const cities =  async () => {
    try {
    const response = await fetch('../js/utils/datos.json');
    if(!response.ok) {
        return console.log('Error fetching cities', response.statusText)
    }
    const data = await response.json();
    return data;
    }
    catch(err) {
        console.log('error fetching cities')
    }
}

const populateCities = async () => {
    const selectInput = document.getElementById('city');
    const postcodeInput = document.getElementById('postcode');
    const citiesData = await cities();

    if(citiesData) {
        citiesData.forEach(city => {
            const option = document.createElement('option');
            option.value = city.name;
            option.textContent = city.name
            selectInput.appendChild(option);
        })
    }

    selectInput.addEventListener('change', (e)=> {
        const selectValue = e.target.value;
        console.log(selectValue)

        const selectedCity = citiesData.find(city => city.name === selectValue);
        if(selectedCity) {
            postcodeInput.value = selectedCity.postcode;
        }
    })

    postcodeInput.addEventListener('input', (e)=> {
        const postCodeValue = e.target.value;
        const selectedCity = citiesData.find(city => city.postcode === postCodeValue);
        if(selectedCity) {
            selectInput.value = selectedCity.name
        }
    })

}

window.onload = () => {
    populateCities();
}

const emailInput = document.getElementById('email');
emailInput.addEventListener('keyup', (e)=> {
    if(e.key === '@') {
        console.log('@ pressed')
        let prevText = emailInput.value;
        emailInput.value = prevText + 'uoc.edu'
    }
})


function validateForm(e) {
    e.preventDefault(); //Evitar la submisión del formulario por defecto

    const name = document.getElementById('name').value; //Sacar todos los valores del formulario
    const surname = document.getElementById('surname').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const passwordRepeat = document.getElementById('password-repeat').value.trim();

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; //Regular expression del email
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,20}$/; //Regex de la contraseña (min 8 caracteres, max 20, min 1 letra, número y caracter especial)

    if(username === '') { //Si el usuario, nombre o email estan vacíos, parar la submisión del formulario
        alert('Tienes que elegir un nombre de usuario');
        return
    }
    if(name === '') {
        alert('No puedes dejar el nombre vacío');
        return
    }
    if(email === '') {
        alert('Tienes que introducir un email');
        return
    }
    else if(!emailPattern.test(email)) { //Si el email o contraseña no siguen el patrón, parar submisión.
        alert('Tienes que elegir un email valido!');
        return
    }
    if(!passwordPattern.test(password)) { 
        alert('La contraseña debe tener entre 8 y 20 caracteres y contener letras, números y al menos un carácter especial');
        return
    }
    if(password !== passwordRepeat) {
        alert('Las contraseñas no coinciden!');
        return
    }

    const user = new User(name, surname, username, password, email, address, city, new Favorites()) //Si los datos están bien, crear un nuevo usuario
    let existingUsers = JSON.parse(localStorage.getItem('users')) || []; //Sacamos usuarios existentes, si los hay, si no, inicializamos una array vacía
    const duplicateUserName = existingUsers.some((user) => user.username === username); //Chequeamos si existe un usuario con el nombre de usuario introducido.
    const duplicateEmail = existingUsers.some((user) => user.email === email); //Chequeamos si existe un usuario con el email introducido

    if(duplicateUserName) { //Alertamos en caso de usuario o email duplicado
        alert('Este nombre de usuario ya existe, elige otro')
        return;
    }

    if(duplicateEmail) {
        alert('Este email ya está en uso!')
        return
    }

    existingUsers.push(user); //Si todo esta OK, hacemos push del usuario a la lista de usuarios existentes.

    localStorage.setItem('users', JSON.stringify(existingUsers)); //Guardamos nuestro array de objetos en localStorage

    alert('Usuario registrado con exito!'); //Alertamos de que todo está OK
    
    window.location.href = 'index.html' //Redirigimos al usuario para que haga el login
}

