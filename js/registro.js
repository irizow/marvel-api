import { User } from "./clases.js";

const registerForm = document.getElementById('register-form');
registerForm.addEventListener('submit', validateForm);

function validateForm(e) {
    e.preventDefault();
    console.log('hola')
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const address = document.getElementById('address').value;
    const community = document.getElementById('community').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{6,20}$/;

    if(username === '') {
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
    else if(!emailPattern.test(email)) {
        alert('Tienes que elegir un email valido!');
        return
    }
    if(!passwordPattern.test(password)) {
        alert('La contraseña debe tener entre 6 y 20 caracteres y contener letras y numeros');
        return
    }

    const user = new User(name, surname, username, password, email, address, community)
    let existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const duplicateUserName = existingUsers.some((user) => user.username === username);
    const duplicateEmail = existingUsers.some((user) => user.email === email);

    if(duplicateUserName) {
        alert('Este nombre de usuario ya existe, elige otro')
        return;
    }

    if(duplicateEmail) {
        alert('Este email ya está en uso!')
        return
    }

    existingUsers.push(user);

    localStorage.setItem('users', JSON.stringify(existingUsers));

    alert('Usuario registrado con exito!');
    
    window.location.href = 'index.html'
}