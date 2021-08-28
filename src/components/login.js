import { onNavigate } from '../main.js';
export const login = () => {

    const loginPage = document.createElement('div');
    loginPage.classList.add('loginPage');
    const banner = document.createElement('header');
    banner.setAttribute('id', 'banner');
    const petFriends = document.createElement('h1');
    petFriends.setAttribute('id', 'petFriends');
    petFriends.textContent = 'Pet Friends';
    const logo = document.createElement('img');
    logo.setAttribute('id', 'logo');
    logo.src = './imagenes/Imagen1.png';
    const email = document.createElement('input');
    email.setAttribute('id', 'email');
    email.setAttribute('placeholder', 'Correo electrónico');
    const password = document.createElement('input');
    password.setAttribute('id', 'password');
    password.setAttribute('placeholder', 'Contraseña');
    const signIn = document.createElement('button');
    signIn.setAttribute('id', 'signIn');
    signIn.textContent = 'Iniciar sesión';
    const signInGoogle = document.createElement('button');
    signInGoogle.setAttribute('id', 'signInGoogle');
    const logoGoogle = document.createElement('img');
    logoGoogle.setAttribute('id', 'logoGoogle');
    logoGoogle.src = './imagenes/iconoGoogle.png';
    signInGoogle.textContent = 'Continuar con Google';
    const registerIn = document.createElement('h3');
    registerIn.setAttribute('id', 'registerIn');
    registerIn.textContent = '¿No tienes una cuenta?';
    const registerButton = document.createElement('button');
    registerButton.setAttribute('id', 'registerButton');
    registerButton.textContent = 'Regístrate';
    const formContainer = document.createElement('form');
    formContainer.setAttribute('id', 'formContainer');
    const registerContainer = document.createElement('div');
    registerContainer.setAttribute('id', 'lastContainer');


    
   
    loginPage.appendChild(banner);
    banner.appendChild(logo);
    banner.appendChild(petFriends);
    loginPage.appendChild(formContainer);
    formContainer.appendChild(email);
    formContainer.appendChild(password);
    formContainer.appendChild(signIn);
    signInGoogle.appendChild(logoGoogle);
    formContainer.appendChild(signInGoogle);
    loginPage.appendChild(registerContainer);
    registerContainer.appendChild(registerIn);
    registerContainer.appendChild(registerButton);
    registerButton.addEventListener('click', () => onNavigate('/register'));
   signIn.addEventListener('click', () => onNavigate('/home'));


    return loginPage;
}
