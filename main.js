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