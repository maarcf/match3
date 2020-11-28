const grillaHTML = document.querySelector(".grilla");

const emojisFrutas = ['🍉', '🥝', '🍌', '🍇', '🍋', '🥥'];

const obtenerNumeroAlAzar = (items) => {
  return Math.floor((Math.random() * items.length))  
}

const obtenerItemAlAzar = (items) => {
  return items[obtenerNumeroAlAzar(items)]
}

// GENERAR GRILLA EN HTML Y EN JS
let listaDeFrutas = [];

const generarGrilla = (filas, columnas, items, tamanio) => {
 
  for (let i = 0; i < filas; i++) {
    listaDeFrutas[i] = [];
    for (let j = 0; j < columnas; j++) {
      listaDeFrutas[i][j] = obtenerItemAlAzar(items)

      grillaHTML.innerHTML += `<div class="item" data-x="${i}" data-y="${j}">${listaDeFrutas[i][j]}</div>`
    }    
  }

  return grillaHTML
}



// TAMAÑO DE FRUTAS
const tamanioFrutas = (clase) => {
  const frutas = document.querySelectorAll('.item');
  for (let fruta of frutas) {
    fruta.classList.add(`${clase}`)
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
    generarGrilla(9, 9, emojisFrutas)
    tamanioFrutas('frutas-facil')
  }
  else if (rtaUsuarioDificultad === 'mediano') {
    dificultad = 8;
    generarGrilla(8, 8, emojisFrutas)
    tamanioFrutas('frutas-mediana')
  }
  else if (rtaUsuarioDificultad === 'dificil') {
    dificultad = 7;
    generarGrilla(7, 7, emojisFrutas)
    tamanioFrutas('frutas-dificil')
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
