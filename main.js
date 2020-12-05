
/**
 * ～*～♡～*～♥～*～♡～*～♥～*～♡～*～♥～*～♡～*～
 *         VARIABLES GLOBALES Y CONFIGURACION
 * ～*～♡～*～♥～*～♡～*～♥～*～♡～*～♥～*～♡～*～
 */

const grillaHTML = document.querySelector(".grilla");

const frutas = ['🍉', '🥝', '🍌', '🍇', '🍋', '🥥'];


let columnas = 9;
let anchoDeDiv = 0;
const anchoDeGrilla = 440;
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

const obtenerCuadrado = (x, y) => {
    return document.querySelector(`.cuadrado[data-x="${x}"][data-y="${y}"]`)
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
    cuadrado.classList.add("item")
    cuadrado.dataset.x = y
    cuadrado.dataset.y = x

    cuadrado.innerHTML = grillaJS[y][x]
    cuadrado.addEventListener('click', seleccionarItem)
   
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

const intercambiarCuadrados = (elem1, elem2) => {
    const datax1 = Number(elem1.dataset.x)
    const datax2 = Number(elem2.dataset.x)
    const datay1 = Number(elem1.dataset.y)
    const datay2 = Number(elem2.dataset.y)

    // aquí modifico grilla JS
    let variableTemporal = grillaJS[datax1][datay1]
    grillaJS[datax1][datay1] = grillaJS[datax2][datay2]
    grillaJS[datax2][datay2] = variableTemporal

    // acá modifico grilla HTML
    if (datax1 === datax2 && (datay1 === datay2 + 1 || datay1 === datay2 - 1)) {
        elem1.style.left = `${datay2 * anchoDeDiv}px`
        elem2.style.left = `${datay1 * anchoDeDiv}px`
        elem1.dataset.y = datay2
        elem2.dataset.y = datay1
    } else if (datay1 === datay2 && (datax1 === datax2 + 1 || datax1 === datax2 - 1)) {
        elem1.style.top = `${datax2 * anchoDeDiv}px`
        elem2.style.top = `${datax1 * anchoDeDiv}px`
        elem1.dataset.x = datax2
        elem2.dataset.x = datax1
    }
   
}


const sonAdyacentes = (elem1, elem2) => {
    const datax1 = Number(elem1.dataset.x)
    const datax2 = Number(elem2.dataset.x)
    const datay1 = Number(elem1.dataset.y)
    const datay2 = Number(elem2.dataset.y)

    if ((datax1 === datax2 && datay1 === datay2 + 1) || (datax1 === datax2 && datay1 === datay2 - 1) ||
        (datay1 === datay2 && datax1 === datax2 + 1) || (datay1 === datay2 && datax1 === datax2 - 1)) {
        return true
    } else {
        return false
    }
}


const seleccionarItem = (e) => {
    let primerCuadrado = document.querySelector(".seleccionado")

    if (primerCuadrado != null) {
        if (sonAdyacentes(primerCuadrado, e.target)) {
            console.log("son adyacentes, intercambiense")
            intercambiarCuadrados(primerCuadrado, e.target)

            if(hayMatch()){
               console.log("hay match, buscalos, borralos y reacomoda")
               buscarMatches()
               reacomodarFrutas()
               
            }else {
                console.log("no hay match, volve a tu lugar")
                intercambiarCuadrados(primerCuadrado, e.target)
            }
            
        } else {
            primerCuadrado.classList.remove("seleccionado")
            e.target.classList.add("seleccionado")
        }
    } else (
        e.target.classList.add("seleccionado")
    )
}



/**
 * ～*～♡～*～♥～*～♡～*～♥～*～♡～*～♥～*～♡～*～
 *              BUSCAR y BORRAR MATCHES
 * ～*～♡～*～♥～*～♡～*～♥～*～♡～*～♥～*～♡～*～
 */


const borrarMatches = (matches) => {
    for (let div of matches) {
        div.innerHTML = ""
        div.classList.add('desaparecer-item')
    }
}

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

const hayCuadradosVacios = () => {

    const cuadradosDeGrillaHTML = document.querySelectorAll(".grilla > div");

    for(let cuadrado of cuadradosDeGrillaHTML){
        if(cuadrado.innerHTML === ""){
           return true 
        } 
    }
}

const reacomodarFrutas = () => {

console.log("reacomodando frutitas")

const cuadradosDeGrillaHTML = document.querySelectorAll(".grilla > div");
console.log(cuadradosDeGrillaHTML)

console.log(hayCuadradosVacios())

    if(hayCuadradosVacios()){
        for(let cuadrado of cuadradosDeGrillaHTML){

                let dataX = Number(cuadrado.dataset.x)
                let dataY = Number(cuadrado.dataset.y)

            if(cuadrado.innerHTML === "" ){

                console.log("estoy rellenando espacios vacios")    
                grillaJS[dataX][dataY] = obtenerItemAlAzar(frutas)
                console.log(grillaJS[dataX][dataY])
                cuadrado.innerHTML =  grillaJS[dataX][dataY] 
                cuadrado.classList.toggle("desaparecer-item")
                console.log(cuadrado.innerHTML)
            
            }
          
        }
        
    }
 
}

     


const buscarMatchesHorizontales = () => {
    for (let i = 0; i < grillaJS.length; i++) {
        for (let j = 0; j < grillaJS[i].length; j++) {

            if (grillaJS[i][j + 1]) {
                if (grillaJS[i][j + 2]) {
                    const div1 = document.querySelector(`div[data-x = '${i}'][data-y = '${j}']`)
                    const div2 = document.querySelector(`div[data-x = '${i}'][data-y = '${j + 1}']`)
                    const div3 = document.querySelector(`div[data-x = '${i}'][data-y = '${j + 2}']`)

                    const match3 = [div1, div2, div3]

                    for (let div of match3) {
                        if (div1.textContent === div2.textContent && div2.textContent === div3.textContent) {
                            borrarMatches(match3)
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
           if (grillaJS[i + 1]) {
                if (grillaJS[i + 2]) {
                    const div1 = document.querySelector(`div[data-x = '${i}'][data-y = '${j}']`)
                    const div2 = document.querySelector(`div[data-x = '${i + 1}'][data-y = '${j}']`)
                    const div3 = document.querySelector(`div[data-x = '${i + 2}'][data-y = '${j}']`)

                    const match3 = [div1, div2, div3]

                    for (let div of match3) {
                        if (div1.textContent === div2.textContent && div2.textContent === div3.textContent) {
                            borrarMatches(match3)
                        }
                    }
                }
            }
        }
    }
}


const buscarMatches = () => {
  
    buscarMatchesHorizontales()
    buscarMatchesVerticales()

}


const crearGrillaSinMatches = (frutas) => {
    do {
        borrarGrilla()
        crearGrilla(frutas)
    }
    while (hayMatch() === true)

}



/**
 * ～*～♡～*～♥～*～♡～*～♥～*～♡～*～♥～*～♡～*～
 *                MODALES
 * ～*～♡～*～♥～*～♡～*～♥～*～♡～*～♥～*～♡～*～
 */

const modalBienvenida = document.getElementById('modal-bienvenida');
const modalDificultad = document.getElementById('modal-dificultad');
const modalGameOver = document.getElementById('modal-gameover');
const modalReiniciarJuego = document.getElementById('modal-reiniciar');
const botonAyuda = document.getElementById('boton-ayuda');
const botonReiniciar = document.getElementById('boton-reiniciar');
const botonAJugar = document.getElementById('inicio-juego');
const cancelarReiniciar = document.getElementById('cancelar');
const nuevoJuegoReiniciar = document.getElementById('nuevo-juego-reiniciar');
const dificultadFacil = document.getElementById('facil');
const dificultadMediano = document.getElementById('mediano');
const dificultadDificil = document.getElementById('dificil');

 const darBienvenida = () => {
    modalBienvenida.classList.remove('hidden')

    botonAJugar.onclick = () => {
        modalBienvenida.classList.add('hidden');
        elegirDificultad()
    }
    
}

const iniciarModales = () => {
    darBienvenida()
    
}



const elegirDificultad = () => {

    modalDificultad.classList.remove('hidden');

    dificultadFacil.onclick=()=>{
        modalDificultad.classList.add('hidden');
        columnas = 9;
        crearGrillaSinMatches(frutas)
    }

    dificultadMediano.onclick=()=>{
        modalDificultad.classList.add('hidden');
        columnas = 8;
        crearGrillaSinMatches(frutas)
    }

    dificultadDificil.onclick=()=>{
        modalDificultad.classList.add('hidden');
        columnas = 7;
        crearGrillaSinMatches(frutas)
    }
    
}

const pedirAyuda=()=>{
    modalBienvenida.classList.remove('hidden')
    botonAJugar.onclick=()=>{
        modalBienvenida.classList.add('hidden')
    }
}

botonAyuda.onclick=()=>{
    pedirAyuda()
   
}




/**
 * ～*～♡～*～♥～*～♡～*～♥～*～♡～*～♥～*～♡～*～
 *        INICIALIZAR JUEGO
 * ～*～♡～*～♥～*～♡～*～♥～*～♡～*～♥～*～♡～*～
 */

// REINICIAR JUEGO

const reiniciarJuego = () => {
    borrarGrilla()
    elegirDificultad()
    
}

botonReiniciar.onclick = () => {

    modalReiniciarJuego.classList.remove('hidden')

    nuevoJuegoReiniciar.onclick=()=>{
        modalReiniciarJuego.classList.add('hidden')
        elegirDificultad()
    }

    cancelarReiniciar.onclick = () => {
        modalReiniciarJuego.classList.add('hidden')
    }
 
}


window.onload = () => {
    iniciarModales()
}

