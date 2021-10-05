/* eslint-disable no-unused-expressions */
import { onNavigate } from '../main.js';
import { allFunctions } from '../lib/validFunc.js';
import {
  logOut, getUser, postInFirestore, updatePost, deletePost, stateCheck, getTaskForEdit, editPost,
} from '../firebaseAuth.js';

export const home = () => {
  let userEmail = getUser();
  if (userEmail !== '') {
    userEmail = userEmail.email;
  }
  let editStatus = false;
  const homePage = document.createElement('div');

  stateCheck(homePage);

  homePage.setAttribute('id', 'homePage');
  const htmlNodes = `<header id = "wallBanner" >
  <img id="logoWall" src="./imagenes/Imagen1.png">
  <h1 id="petFriendsWall">Pet Friends</h1>
  <img id="signOut" src= "./imagenes/exit.png"></header>
  <h2 id= "welcomeMessage">Bienvenid@ ${userEmail}</h2>
  <p id= "catchPost"></p>
  <div id="postContainer">
  <img id= "yellowDog" src="./imagenes/Güero.png">
  <button id="postInput">Cuéntanos sobre tu petFriend</button>
  </div>   
  <div id="backModal">
  <div id="modal">
  <h3 id="close">x</h3>
  <textarea id="post" placeholder = "Cuéntanos sobre tu petFriend"></textarea>
  <button id="share" class="send" >Publicar</button>
  </div>
  </div>
  <div id="posts"></div>
  `;
  homePage.innerHTML = htmlNodes;
  const modal = homePage.querySelector('#backModal');
  const postDivPublish = homePage.querySelector('#posts');

  // Botón de cerrar sesión
  homePage.querySelector('#signOut').addEventListener('click', () => logOut(onNavigate));

  // Botón para abrir el modal
  homePage.querySelector('#postInput').addEventListener('click', () => {
    modal.style.visibility = 'visible';
    homePage.querySelector('#post').value = '';
  });

  // Es la x para cerrar el modal
  homePage.querySelector('#close').addEventListener('click', () => {
    modal.style.visibility = 'hidden';
  });

  // Botón para publicar el post
  homePage.querySelector('#share').addEventListener('click', () => {
    modal.style.visibility = 'hidden';
    const postPublish = homePage.querySelector('#post').value;
    // const catchPost = homePage.querySelector('#catchPost');
    if (!editStatus) {
      postInFirestore(postPublish, userEmail);
    } else {
      homePage.querySelector('#share').innerHTML = 'Guardar';
    }

    if (allFunctions.validPost(postPublish) === false) {
      alert('No has publicado un post aún');
    } else {
      postInFirestore(postPublish, userEmail);
    }
  });

  // Imprime los post ya existentes en pantalla
  updatePost((snapshot) => {
    postDivPublish.innerHTML = '';
    snapshot.forEach((doc) => {
      const comentId = doc.id;
      const htmlPostsPublished = `<div id= "recentPostDiv" class= "completePost">
          <p id="userMail">${doc.data().user}:</p>
          <p id="recentPost">${doc.data().post}</p>
          <div id= "divButtons">
          <button id= "edit" class= "btnEdit" data-id= ${comentId} >Editar</button>
          <button id= "deletes" class="btndeletes" data-id= ${comentId} > Eliminar</button> 
          <img id="img"  class= "like" src="./imagenes/patitaGris.png">
          <div class="deleteBackModal">
          <div class="deleteModal" >
          <h2 class= "confirmText">¿Estás segur@ que deseas eliminar este post? </h2>
          <button class="si">Si</button>
          <button class="no" >No</button>
          </div>
          </div>
          </div>
          </div>`;

      postDivPublish.innerHTML += htmlPostsPublished;

      // Función para manipular el like
      const colorPaw = postDivPublish.querySelectorAll('.like');

      colorPaw.forEach((postLike) => {
        postLike.addEventListener('click', (e) => {
          if (e.target.getAttribute('src') === './imagenes/patitaGris.png') {
            postLike.setAttribute('src', './imagenes/patitaColor.png');
          } else {
            postLike.setAttribute('src', './imagenes/patitaGris.png');
          }
        });
      });

      // Botón para eliminar post
      const deletebtn = postDivPublish.querySelectorAll('.btndeletes');

      const deleteModal = postDivPublish.querySelector('.deleteBackModal');
      deletebtn.forEach((btnDelete) => {
        btnDelete.addEventListener('click', (f) => {
          deleteModal.style.visibility = 'visible';
          const confirmDelete = () => deletePost(f.target.dataset.id);
          deleteModal.addEventListener('click', (e) => {
            if (e.target.classList.contains('si')) {
              confirmDelete();
              deleteModal.style.visibility = 'hidden';
            } else {
              deleteModal.style.visibility = 'hidden';
            }
          });
        });
      });

      // Botón para editar el post
      const btnEdit = postDivPublish.querySelectorAll('.btnEdit');

      btnEdit.forEach((edtPost) => {
        edtPost.addEventListener('click', async (event) => {
          modal.style.visibility = 'visible';
          const docForEdit = await getTaskForEdit(event.target.dataset.id);

          console.log(docForEdit.data());

          homePage.querySelector('#post').value = docForEdit.data().post;
          editStatus = true;
          if (editStatus === true) {
            // editPost(docForEdit, homePage.querySelector('#post').value);
            editPost(event.target.dataset.id, homePage.querySelector('#post').value);
            console.log('hola');
            // postDivPublish.querySelectorAll('.send').textContent = 'Actualizar';
          }
        });
      });
    });
  });

  return homePage;
};
