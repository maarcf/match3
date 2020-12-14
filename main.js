/**
 * ～*～♡～*～♥～*～♡～*～♥～*～♡～*～♥～*～♡～*～
 *         VARIABLES GLOBALES Y CONFIGURACION
 * ～*～♡～*～♥～*～♡～*～♥～*～♡～*～♥～*～♡～*～
 */

const grillaHTML = document.querySelector(".grilla");

const frutas = ['🍉', '🥝', '🍌', '🍇', '🍋', '🥥'];


let columnas = 9;
let anchoDeDiv = 0;
let ajustarGrillaResponsive = 0;

const ajustarGrilla = () => {
  
    if (window.matchMedia("(max-width: 575.98px)").matches) {
        ajustarGrillaResponsive = 270;
    }
    else if (window.matchMedia("(max-width: 767.98px)").matches){
        ajustarGrillaResponsive = 290;
    }
    else {
        ajustarGrillaResponsive = 440;
    }

    return ajustarGrillaResponsive
} 

let anchoDeGrilla = ajustarGrilla();

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

const obtenerCuadrado = (x, y) => {
    const cuadrado = document.querySelector(`div[data-x='${x}'][data-y='${y}']`)
    console.log(cuadrado)
    return cuadrado
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
    // Vacio la grilla para el responsive
    grillaHTML.innerHTML = '';

    for (let i = 0; i < grillaJS.length; i++) {
        for (let j = 0; j < grillaJS[i].length; j++) {
            let cuadrado = generarCuadrado(j, i)
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

const buscarCuadradoVacio = () => {
    const cuadradosDeGrillaHTML = document.querySelectorAll(".grilla > div");

    for (let cuadrado of cuadradosDeGrillaHTML) {
        if (cuadrado.innerHTML === "") {
            return cuadrado
        }
    }
}

const crearGrillaSinMatches = (frutas) => {
    do {
        borrarGrilla()
        crearGrilla(frutas)
    }
    while (hayMatch() === true)

//    reinciarTiempo()
    reinciarPuntaje()
    mostrarPuntajeParcial()
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

            if (hayMatch()) {
                console.log("hay match, buscalos, borralos y reacomoda")
                setTimeout(() => buscarMatches(), 500)
                setTimeout(() => bajarTodoUnBloque(), 3000)
               
            } else {
                console.log("no hay match, volve a tu lugar")
                setTimeout(() => intercambiarCuadrados(primerCuadrado, e.target), 500)               
            }

        } else {
            primerCuadrado.classList.remove("seleccionado")
            e.target.classList.add("seleccionado")
        }
    } else(
        e.target.classList.add("seleccionado")
    )
}

/**   INICIA FUNCIONALIDAD REACOMODAR FRUTITAS */
/**
 * ～*～♡～*～♥～*～♡～*～♥～*～♡～*～♥～*～♡～*～
 *              BUSCAR y BORRAR MATCHES
 * ～*～♡～*～♥～*～♡～*～♥～*～♡～*～♥～*～♡～*～
 */

const borrarMatches = (matches) => {
    for (let div of matches) {
        const datax = div.dataset.x
        const datay = div.dataset.y
        grillaJS[datax][datay] = null
        div.innerHTML = ""
        div.classList.add('desaparecer-item')
        
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
                            setTimeout(() => borrarMatches(match3),1000);
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
                            setTimeout(() => borrarMatches(match3),1000);
                        }
                    }
                }
            }
        }
    }   
}

/**-------------------------------------------------------------------- */


const bajarCuadrado = (cuadrado, espacios = 1) => {
    const datax = Number(cuadrado.dataset.x)
    const datay = Number(cuadrado.dataset.y)
  
    //modifica grillaJS
    grillaJS[datax+1][datay] = grillaJS[datax][datay]  // el de arriba de lo enchufa al cuadrado de abajo
    grillaJS[datax][datay] = null // el de arriba queda null
  
   // modifica grillahtml-- posicion y dataset
    cuadrado.style.top = `${(datax + espacios) * anchoDeDiv}px`
    cuadrado.dataset.x = datax + espacios  
  }




const obtenerCantidadEspaciosDebajo = (x, y) => {
    let espacios = 0
    for (let i = y; i < grilla.length; i++) {
        if (grilla[i][x] === null) {
        espacios++
        }
    }
    return espacios
}

const rellenarEspaciosRestantes = () => {  
    for (let i = 0; i < grillaJS.length; i++) {
        for (let j = 0; j < grillaJS[i].length; j++) {
        if (grillaJS[i][j] === null) {
            grillaJS[i][j] = obtenerItemAlAzar(frutas)
        }
        }
    }
}

const chequearSiHayAlgoQueAcomodar = () => {

    let cuadradoVacio = buscarCuadradoVacio()
    console.log(cuadradoVacio)

    if(cuadradoVacio){
        const dataX = Number(cuadradoVacio.dataset.x)
        const dataY = Number(cuadradoVacio.dataset.y)

        let cuadradoArribaDeCuadradoVacio = obtenerCuadrado((dataX-1), dataY)
        console.log(cuadradoArribaDeCuadradoVacio)

        if(cuadradoArribaDeCuadradoVacio){
            return cuadradoArribaDeCuadradoVacio
        }
    
    }
    return false
    
}

const bajarTodoUnBloque = () => {
    console.log("bajando frutitas en bloque")
    
    let cuadradoParaBajar = chequearSiHayAlgoQueAcomodar()
    console.log(cuadradoParaBajar)

    while (cuadradoParaBajar) { // mientras haya un cuadrado que se pueda bajar
        const dataX2 = Number(cuadradoParaBajar.dataset.x)
        const dataY2 = Number(cuadradoParaBajar.dataset.y)

        const espaciosVacios = obtenerCantidadEspaciosDebajo(dataX2, dataY2)
        bajarCuadrado(cuadradoParaBajar, espaciosVacios)        
    }

    setTimeout(rellenarEspaciosRestantes, 6000)
}

const buscarMatches = () => {
    buscarMatchesHorizontales()
    buscarMatchesVerticales()
    sumarPuntos()
    mostrarPuntajeParcial()
}

/**   FINALIZA FUNCIONALIDAD REACOMODAR FRUTITAS */




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

    dificultadFacil.onclick = () => {
        modalDificultad.classList.add('hidden');
        columnas = 9;
        crearGrillaSinMatches(frutas)
    }

    dificultadMediano.onclick = () => {
        modalDificultad.classList.add('hidden');
        columnas = 8;
        crearGrillaSinMatches(frutas)
    }

    dificultadDificil.onclick = () => {
        modalDificultad.classList.add('hidden');
        columnas = 7;
        crearGrillaSinMatches(frutas)
    }

}

const pedirAyuda = () => {
    modalBienvenida.classList.remove('hidden')
    botonAJugar.onclick = () => {
        modalBienvenida.classList.add('hidden')
    }
}

botonAyuda.onclick = () => {
    pedirAyuda()

}



// Male: dejamos comentada la función del tiempo para que no moleste.
// // Reloj - CountDown
// const tiempoHTML = document.getElementById('tiempo-de-juego');
// const botonReiniciarEnGameOver = document.querySelector('#reiniciar');
// const botonNuevoJuegoEnGameOver = document.querySelector('#nuevo-juego');

// let tiempoJS = 10
// let reloj = null;

// const comenzarTiempo = () => {

//     if (tiempoJS >= 10) {
//         tiempoHTML.textContent = `0:${tiempoJS}`;
//         tiempoJS--
//     }
//     else if (tiempoJS <= 10 && tiempoJS >= 1) { 
//         tiempoHTML.textContent = `0:0${tiempoJS}`;
//         tiempoJS--
//     } else {
//         tiempoHTML.textContent = `0:00`;
//         finalizarJuego()
//     }
        
//     if (tiempoJS !== -1) {
//         reloj = setTimeout(comenzarTiempo, 1000);
//     }

// }

// const reinciarTiempo = () => {
//     clearTimeout(reloj)
//     tiempoJS = 30
//     comenzarTiempo()
// }

// const jugarDeNuevo = () => {
//     clearTimeout(reloj)
//     modalGameOver.classList.add('hidden');
//     elegirDificultad()     
// }

// const reinciarJuegoEnGameOver = (frutas) => {
//     clearTimeout(reloj)
//     modalGameOver.classList.add('hidden');
//     crearGrillaSinMatches(frutas)
// }

// const finalizarJuego = () => {  
      
//     modalGameOver.classList.remove('hidden');
//     mostrarPuntajeFinal()
//     botonReiniciarEnGameOver.onclick = () => {
//         reinciarJuegoEnGameOver(frutas)
//     }

//     botonNuevoJuegoEnGameOver.onclick = () => {
//         jugarDeNuevo()
//     }

// }


// PUNTAJE
let puntos = 0
const puntajeFinal = document.querySelector('#puntaje-final')
const puntajeParcial = document.querySelector('#puntaje-parcial')

const sumarPuntos = () => {
    return puntos += 100
}

const reinciarPuntaje = () => {
    puntos = 0
}

const mostrarPuntajeParcial = () => {
    puntajeParcial.textContent = puntos    
}

const mostrarPuntajeFinal = () => {
    puntajeFinal.textContent = puntos
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

    nuevoJuegoReiniciar.onclick = () => {
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

window.onresize = e => {
    if (e.isTrusted) {
        anchoDeGrilla = ajustarGrilla();
        dibujarAnchoDeGrilla();
        redimensionarAnchoDeDiv();
        dibujarGrillaHTML();
    }
}