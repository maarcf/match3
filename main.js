 /**
 * ～*～♡～*～♥～*～♡～*～♥～*～♡～*～♥～*～♡～*～
 *         VARIABLES GLOBALES Y CONFIGURACION
 * ～*～♡～*～♥～*～♡～*～♥～*～♡～*～♥～*～♡～*～
 */

const grillaHTML = document.querySelector(".grilla");

const frutas = ['🍉', '🥝', '🍌', '🍇', '🍋', '🥥'];


let columnas = 9 
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

  const generarCuadrado = (x, y) => {
 
    const cuadrado = document.createElement('div')
    cuadrado.dataset.x = y
    cuadrado.dataset.y = x
  
    cuadrado.innerHTML = grillaJS[y][x]
  
    cuadrado.style.top = `${y * anchoDeDiv}px`
    cuadrado.style.left = `${x * anchoDeDiv}px`
    cuadrado.style.width = `${anchoDeDiv}px`
    cuadrado.style.height = `${anchoDeDiv}px`
  
    return cuadrado
  }
  

const crearGrilla = (items) => {

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


const elegirDificultad = () => {

// ************************************************************************************************ //
  // Esto tiene que ser los botones del modal//
  let rtaUsuarioDificultad = prompt('¿En qué dificultad quiere jugar: FÁCIL, MEDIANO o DIFÍCIL?')
  rtaUsuarioDificultad = rtaUsuarioDificultad.toLowerCase();
// ************************************************************************************************ //

  if (rtaUsuarioDificultad === 'facil') {
    columnas = 9;
  }
  else if (rtaUsuarioDificultad === 'mediano') {
    columnas = 8;
  }
  else if (rtaUsuarioDificultad === 'dificil') {
    columnas = 7;
  }
  else {
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
const darBienvenida = () => {
  console.log("aca se puede meter el codigo del modal de bienvenida")
}

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
