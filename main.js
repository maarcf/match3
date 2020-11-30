const modalBienvenida = document.getElementById('modal-bienvenida');
const modalDificultad = document.getElementById('modal-dificultad');
const modalGameOver = document.getElementById('modal-gameover');
const modalReiniciarJuego = document.getElementById('modal-reiniciar');
const botonAyuda = document.getElementById('boton-ayuda');
const botonReiniciar = document.getElementById('boton-reiniciar');
const botonAJugar = document.getElementById('inicio-juego');
const cancelarReiniciar = document.getElementById('cancelar');
const nuevoJuegoReiniciar = document.getElementById('nuevo-juego-reiniciar');

botonAJugar.onclick=()=>{
    modalBienvenida.classList.add('hidden');
    modalDificultad.classList.remove('hidden');
    
}

botonAyuda.onclick=()=>{
    modalBienvenida.classList.remove('hidden');
}

botonReiniciar.onclick=()=>{
    modalReiniciarJuego.classList.remove('hidden');
}

cancelarReiniciar.onclick=()=>{
    modalReiniciarJuego.classList.add('hidden');
}

nuevoJuegoReiniciar.onclick=()=>{
    modalReiniciarJuego.classList.add('hidden');
    modalDificultad.classList.remove('hidden');
}

 /**
 * ～*～♡～*～♥～*～♡～*～♥～*～♡～*～♥～*～♡～*～
 *         VARIABLES GLOBALES Y CONFIGURACION
 * ～*～♡～*～♥～*～♡～*～♥～*～♡～*～♥～*～♡～*～
 */

const grillaHTML = document.querySelector(".grilla");

const frutas = ['🍉', '🥝', '🍌', '🍇', '🍋', '🥥'];


let columnas = 9 
let anchoDeDiv = 0
const anchoDeGrilla = 480
let dificultad = ""
let grillaJS = [];  



const obtenerNumeroAlAzar = (array) => {
  return Math.floor((Math.random() * array.length))
}

const obtenerItemAlAzar = (array) => {
  return array[obtenerNumeroAlAzar(array)]
}


const borrarGrilla = () => {
  grillaHTML.innerHTML = ""
  grillaJS = [];
  
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
const hayMatch = () => {
  for (let i = 0; i < grillaJS.length; i++) {      
    for (let j = 0; j < grillaJS[i].length; j++) {       
      if (grillaJS[i][j] === grillaJS[i][j + 1] && 
        grillaJS[i][j + 1] === grillaJS[i][j + 2]) {
       return true
      }    
      if (grillaJS[i + 1] && grillaJS[i + 2] && 
        grillaJS[i][j] === grillaJS[i + 1][j] && 
        grillaJS[i + 1][j] === grillaJS[i + 2][j]) {
        return true
      }           
    }      
  }
  return false
}



const buscarMatchesHorizontales = () => {
  for (let i = 0; i < grillaJS.length; i++) {
    for (let j = 0; j < grillaJS[i].length; j++) {
 
      if(grillaJS[i][j+1]) {
        if(grillaJS[i][j+2]){
          const div1 = document.querySelector(`div[data-x = '${i}'][data-y = '${j}']`)
          const div2 = document.querySelector(`div[data-x = '${i}'][data-y = '${j + 1}']`)
          const div3 = document.querySelector(`div[data-x = '${i}'][data-y = '${j + 2}']`)
            
          const match3 = [ div1, div2, div3]
           
          for(let div of match3) {
            if (div1.textContent === div2.textContent && div2.textContent === div3.textContent) {
                  marcarMatches(match3)
                }  
          }
        }
      }
    }
  }
}

const buscarMatchesVerticales = () => {
  for (let i = 0; i < grillaJS.length; i++) {
   
    for (let j = 0; j < grillaJS[i].length; j++) {
    // VERTICALES -match de 3 elementos
    // Buscar solo si hay mas elementos abajo
    console.log(`estoy en la posicion: i = ${i} y j =  ${j}`)
   
      if(grillaJS[i+1]) {
        if(grillaJS[i+2]){
          const div1 = document.querySelector(`div[data-x = '${i}'][data-y = '${j}']`)
          const div2 = document.querySelector(`div[data-x = '${i + 1}'][data-y = '${j}']`)
          const div3 = document.querySelector(`div[data-x = '${i + 2}'][data-y = '${j}']`)
          
          const match3 = [div1, div2, div3]
          
          for(let div of match3) {
            if (div1.textContent === div2.textContent && div2.textContent === div3.textContent) {
              marcarMatches(match3)
            }
          }
        }
      }
    }
  }
}


const buscarMatches = () =>{
   buscarMatchesHorizontales()
   buscarMatchesVerticales()
 }


const crearGrillaSinMatches = (frutas) => {
  

  do {
       borrarGrilla()
       crearGrilla(frutas)
} 
while(hayMatch() === true)

}




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



/**
 * ～*～♡～*～♥～*～♡～*～♥～*～♡～*～♥～*～♡～*～
 *                MODALES
 * ～*～♡～*～♥～*～♡～*～♥～*～♡～*～♥～*～♡～*～
 */
// const darBienvenida = () => {
//   console.log("aca se puede meter el codigo del modal de bienvenida")
// }

// const iniciarModales = () => {
//   darBienvenida() 
//   elegirDificultad()
// }





/**
 * ～*～♡～*～♥～*～♡～*～♥～*～♡～*～♥～*～♡～*～
 *        INICIALIZAR JUEGO
 * ～*～♡～*～♥～*～♡～*～♥～*～♡～*～♥～*～♡～*～
 */

// // REINICIAR JUEGO
// const botonReiniciarJuego = document.querySelector('#boton-reiniciar')

// const reiniciarJuego = () => {
//   borrarGrilla()
//   elegirDificultad()
//   crearGrillaSinMatches(frutas) 
// }

// botonReiniciarJuego.onclick = () => reiniciarJuego()


// const iniciarJuego = () => {
//   iniciarModales()
//   crearGrillaSinMatches(frutas) 
// }
 
// window.onload = () => {
//   iniciarJuego()
// }

