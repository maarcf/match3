 /**
 * ～*～♡～*～♥～*～♡～*～♥～*～♡～*～♥～*～♡～*～
 *         VARIABLES GLOBALES Y CONFIGURACION
 * ～*～♡～*～♥～*～♡～*～♥～*～♡～*～♥～*～♡～*～
 */

const grillaHTML = document.querySelector(".grilla");

const emojisFrutas = ['🍉', '🥝', '🍌', '🍇', '🍋', '🥥'];


let columnas = 0 
let anchoDeDiv = 0
const anchoDeGrilla = 500
let dificultad = ""
let grillaJS = [];  



const obtenerNumeroAlAzar = (array) => {
  return Math.floor((Math.random() * array.length))
}

const obtenerItemAlAzar = (array) => {
  return array[obtenerNumeroAlAzar(array)]
}


/**
 * ～*～♡～*～♥～*～♡～*～♥～*～♡～*～♥～*～♡～*～
 *               CREAR GRILLA 
 * ～*～♡～*～♥～*～♡～*～♥～*～♡～*～♥～*～♡～*～
 */
const definirCantidadDeColumnas = () => {
 
  switch (dificultad) {
    case "1":  
        columnas = 10
       break;
    case "2":
        columnas = 8 
      break;
    case "3":
        columnas = 6  
      break;
    default:
      alert("Ingrese una opción válida")
      iniciarJuego()
      break;
  }
}
const dibujarAnchoDeGrilla = () => { 
  grillaHTML.style.width = `${anchoDeGrilla}px`
  }

const redimensionarAnchoDeDiv = () => {
    anchoDeDiv = anchoDeGrilla / columnas
  }

const creargrillaJS = (columnas, array) => {
    for (let i = 0; i < columnas; i++) {
      grillaJS[i] = []
      for (let j = 0; j < columnas; j++) {
        grillaJS[i][j] = obtenerItemAlAzar(array)
      }
    }
  }

const dibujarGrillaHTML = () => {
    for (let i = 0; i < grillaJS.length; i++) {
      for (let j = 0; j < grillaJS[i].length; j++) {
        const cuadrado = generarCuadrado(j, i)
          grillaHTML.appendChild(cuadrado)
        
      }
    }
  }


const crearGrilla = (items) => {
  
  definirCantidadDeColumnas()   
  dibujarAnchoDeGrilla()
  redimensionarAnchoDeDiv()
  creargrillaJS(columnas, items)
  dibujarGrillaHTML() 

}

 /**
 * ～*～♡～*～♥～*～♡～*～♥～*～♡～*～♥～*～♡～*～
 *              MOVER ELEMENTOS
 * ～*～♡～*～♥～*～♡～*～♥～*～♡～*～♥～*～♡～*～
 */


/**
 * ～*～♡～*～♥～*～♡～*～♥～*～♡～*～♥～*～♡～*～
 *              BUSCAR MATCHES
 * ～*～♡～*～♥～*～♡～*～♥～*～♡～*～♥～*～♡～*～
 */

/*
const iniciarSinMatches = () => {
  do {
  grillaDeFrutasJS = generarGrilla(dificultad)  
} 
while(hayBloquesIguales() === true)

}

*/


// para commit de prueba2
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


const elegirDificultad = () => {

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




/**
 * ～*～♡～*～♥～*～♡～*～♥～*～♡～*～♥～*～♡～*～
 *                MODALES
 * ～*～♡～*～♥～*～♡～*～♥～*～♡～*～♥～*～♡～*～
 */

const iniciarModales = () => {
  darBienvenida()
  elegirDificultad()
}





/**
 * ～*～♡～*～♥～*～♡～*～♥～*～♡～*～♥～*～♡～*～
 *        INICIALIZAR JUEGO
 * ～*～♡～*～♥～*～♡～*～♥～*～♡～*～♥～*～♡～*～
 */

const iniciarJuego = () => {
  iniciarModales()
  crearGrilla(frutas) 
}
 
window.onload = () => {
  iniciarJuego()
}
