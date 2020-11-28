const grillaHTML = document.querySelector(".grilla");


const emojisFrutas = ['🍉', '🥝', '🍌', '🍇', '🍋', '🥥'];

const obtenerNumeroAlAzar = (items) => {
  return Math.floor((Math.random() * items.length))  
}

const obtenerItemAlAzar = (items) => {
  return items[obtenerNumeroAlAzar(items)]
}


let listaDeFrutas = [];

const generarGrilla = (filas, columnas, items, tamanio) => {
 
  for (let i = 0; i < filas; i++) {
    listaDeFrutas[i] = [];
    for (let j = 0; j < columnas; j++) {
      listaDeFrutas[i][j] = obtenerItemAlAzar(items)

      grillaHTML.innerHTML += `<div class="item" font-size= "${tamanio}px" data-x="${i}" data-y="${j}">${listaDeFrutas[i][j]}</div>`
    }    
  }

  return grillaHTML
}





// DIFICULTAD DE JUEGO


let dificultad = '';
const dificultadJuego = () => {

  let rtaUsuarioDificultad = prompt('¿En qué dificultad quiere jugar: FÁCIL, MEDIANO o DIFÍCIL?')
  rtaUsuarioDificultad = rtaUsuarioDificultad.toLowerCase();

  if (rtaUsuarioDificultad === 'facil') {
    dificultad = 9;
    return generarGrilla(9, 9, emojisFrutas)
  }
  else if (rtaUsuarioDificultad === 'mediano') {
    dificultad = 8;
    return generarGrilla(8, 8, emojisFrutas)
  }
  else if (rtaUsuarioDificultad === 'dificil') {
    dificultad = 7;
    generarGrilla(7, 7, emojisFrutas, 40)
  }
  else {
    dificultad = ''
    return alert('formato NO valido')
  }
}

dificultadJuego()

