const logInForm = document.getElementById('log-in-form');
logInForm.addEventListener('submit', validateLogIn);



function validateLogIn(e) {
    e.preventDefault();
    localStorage.setItem('isLoggedIn', 'false');
    const username = document.getElementById('username').value; //Sacamos el usuario y el password de el formulario
    const password = document.getElementById('password').value;

    const existingUsers = localStorage.getItem('users') || []; //Sacamos los usuarios guardados en localStorage
    if(!existingUsers.length) {
        alert('Debes crear un usuario');
        return
    }
    else{
    const parsedUsers = JSON.parse(existingUsers); //Si hay usuarios guardados, parseamos el JSON
    const matchingUser = parsedUsers.some((user) => user.username === username && user.password === password); //Comprobamos si hay un usuario con la misma contraseña y usuario
    const incorrectPassword = parsedUsers.some((user) => user.username === username && user.password !== password); //Comprobamos si hay un usuario pero la contraseña introducida es erronea;
    
    

    if(password === "" || username === "") {
        alert('No puedes dejar ningún campo vacío');
    }

    else if(!matchingUser) { //Si no hay ningún nombre de usuario que coincida con los users en localStorage
        alert('Este nombre de usuario no está registrado')
    }

    else if(incorrectPassword) {
        alert('La contraseña es incorrecta');
    }

    else if(matchingUser) { //Si hay un match de usuario y contraseña, pasamos el loggedIn a true y redirigimos al usuario a la págian de inicio
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'home.html'
    }
    }
}