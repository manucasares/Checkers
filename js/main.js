import { resetBoard, createBoard } from './board.js';
import { addPieceListeners, addSquareListener, getTurn, setPieces } from './pieces.js';
import { initialPieces } from '../data/pieces.js';

// Referencias HTML
const board = document.querySelector( '#board' ); 



const squares = createBoard( board );


function main () {

    // Obtenemos el turno
    const turn = getTurn();
    
    // Limpiamos el tablero
    resetBoard( squares );

    // Seteamos las piezas
    setPieces( squares );

    // Agregamos listener a las piezas
    addPieceListeners( squares, turn );

    // Agregamos listener a los squares
    addSquareListener( squares );

}


main();