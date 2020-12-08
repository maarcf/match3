
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
    grillaHTML.innerHTML = "";
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

    buscarMatches()
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
            intercambiarCuadrados(primerCuadrado, e.target)
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
            // VERTICALES -match de 3 elementos
            // Buscar solo si hay mas elementos abajo
            console.log(`estoy en la posicion: i = ${i} y j =  ${j}`)

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

    reinciarTiempo()
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


// Reloj - CountDown
const tiempoHTML = document.getElementById('tiempo-de-juego');

let tiempoJS = 10
let reloj = null;

const comenzarTiempo = () => {    
        
    if  (tiempoJS >= 10) {
        tiempoHTML.textContent = `0:${tiempoJS}`;
        tiempoJS--
    }
    else if (tiempoJS <= 10 && tiempoJS >= 1) { 
        tiempoHTML.textContent = `0:0${tiempoJS}`;
        tiempoJS--
    }
    else {
        tiempoHTML.textContent = `0:00`;
        console.log('acá estoy')
        finalizarJuego()
        //modal finalizar juego
    }
        
    if (tiempoJS !== -1) {
        reloj = setTimeout(comenzarTiempo, 1000);
    }

}

const reinciarTiempo = () => {
    clearTimeout(reloj)
    tiempoJS = 30
    comenzarTiempo()
}


const botonReiniciarEnGameOver = document.querySelector('#reiniciar');
const botonNuevoJuegoEnGameOver = document.querySelector('#nuevo-juego')

const jugarDeNuevo = () => {
    clearTimeout(reloj)
    modalGameOver.classList.add('hidden');
    elegirDificultad()     
}

const reinciarJuegoEnGameOver = (frutas) => {
    clearTimeout(reloj)
    modalGameOver.classList.add('hidden');
    crearGrillaSinMatches(frutas)
}

const finalizarJuego = () => {
    
    modalGameOver.classList.remove('hidden');
    botonReiniciarEnGameOver.onclick = () => {
        reinciarJuegoEnGameOver(frutas)
    }

    botonNuevoJuegoEnGameOver.onclick = () => {
        jugarDeNuevo()
    }

}



/**
 * ～*～♡～*～♥～*～♡～*～♥～*～♡～*～♥～*～♡～*～
 *        INICIALIZAR JUEGO
 * ～*～♡～*～♥～*～♡～*～♥～*～♡～*～♥～*～♡～*～
 */


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


const iniciarJuego = () => {
    iniciarModales()
}

window.onload = () => {
    iniciarJuego()
}