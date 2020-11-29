const grillaHTML = document.querySelector(".grilla");

const emojisFrutas = ['🍉', '🥝', '🍌', '🍇', '🍋', '🥥'];

const obtenerFrutaAlAzar = (frutas) => {
  return frutas[Math.floor(Math.random() * frutas.length)]  
}

// para commit de prueba
// GENERAR GRILLA  EN JS
let grillaDeFrutasJS = [];

const generarGrilla = (tamanio) => {
  grillaDeFrutasJS = [];
  for (let i = 0; i < tamanio; i++) {
    grillaDeFrutasJS[i] = [];
    for (let j = 0; j < tamanio; j++) {
      grillaDeFrutasJS[i][j] = obtenerFrutaAlAzar(emojisFrutas);
    }    
  }
  return grillaDeFrutasJS
}


// CREAR GRILLA EN HTML
const crearGrilla = () => {
  grillaHTML.innerHTML = ''
  for (let i = 0; i < grillaDeFrutasJS.length; i++) {
    for (let j = 0; j < grillaDeFrutasJS[i].length; j++) {
      grillaHTML.innerHTML += `<div class="item" data-x="${i}" data-y="${j}">${grillaDeFrutasJS[i][j]}</div>`;
    }
  }
  return grillaHTML
}

// TAMAÑO DE FRUTAS
const tamanioFrutas = (dificultad) => {
  const frutas = document.querySelectorAll('.item');
  for (let fruta of frutas) {
    if (dificultad === 9) {
      fruta.classList.add('frutas-facil')
    }
    else if (dificultad === 8) {
      fruta.classList.add('frutas-mediana')
    }
    else {
      fruta.classList.add('frutas-dificil')
    }    
  }
}

// DIFICULTAD DE JUEGO

let dificultad = '';
const dificultadJuego = () => {

// ************************************************************************************************ //
  // Esto tiene que ser los botones del modal//
  let rtaUsuarioDificultad = prompt('¿En qué dificultad quiere jugar: FÁCIL, MEDIANO o DIFÍCIL?')
  rtaUsuarioDificultad = rtaUsuarioDificultad.toLowerCase();
// ************************************************************************************************ //

  if (rtaUsuarioDificultad === 'facil') {
    dificultad = 9;
  }
  else if (rtaUsuarioDificultad === 'mediano') {
    dificultad = 8;
  }
  else if (rtaUsuarioDificultad === 'dificil') {
    dificultad = 7;
  }
  else {
    dificultad = ''
    return alert('formato NO valido')
  }
}

dificultadJuego();

// REINICIAR JUEGO
const botonReiniciarJuego = document.querySelector('#boton-reiniciar')

const reiniciarJuego = () => {
  grillaHTML.innerHTML = ''
  dificultadJuego();
}

botonReiniciarJuego.onclick = () => reiniciarJuego()


// BUSCAR BLOQUES INCIALES
const hayBloquesIguales = () => {
  for (let i = 0; i < grillaDeFrutasJS.length; i++) {      
    for (let j = 0; j < grillaDeFrutasJS[i].length; j++) {       
      if (grillaDeFrutasJS[i][j] === grillaDeFrutasJS[i][j + 1] && 
        grillaDeFrutasJS[i][j + 1] === grillaDeFrutasJS[i][j + 2]) {
       return true
      }    
      if (grillaDeFrutasJS[i + 1] && grillaDeFrutasJS[i + 2] && 
        grillaDeFrutasJS[i][j] === grillaDeFrutasJS[i + 1][j] && 
        grillaDeFrutasJS[i + 1][j] === grillaDeFrutasJS[i + 2][j]) {
        return true
      }           
    }      
  }
  return false
}


// HACER GRILLA en HTML Y JS
do {
  grillaDeFrutasJS = generarGrilla(dificultad)  
} 
while(hayBloquesIguales() === true)

crearGrilla()
tamanioFrutas(dificultad)