import { pieces } from '../data/pieces.js';
import { findPieceByPosition, getSquaresIndexed } from './helpers.js';
import { main } from './main.js';
import { getPossibleMoves } from './moves.js';
import { changeTurn } from './turns.js';
import { removeActiveBorder } from './ui.js';


let activePiece = null;

export function setPieces ( squares ) {
    
    // Indexamos las piezas para poder acceder por su posición fácilmente
    const squaresIndexed = getSquaresIndexed( squares );

    // Por cada square con pieza ponemos atributos y clases
    pieces.forEach( piece => {
        squaresIndexed[ piece.square ].classList.add( `piece` )
        squaresIndexed[ piece.square ].classList.add( `piece-${ piece.team }` )
        squaresIndexed[ piece.square ].setAttribute( 'data-occupied', 'true' );
    });
}



export function setActivePiece ( e ) {
    
    // Quitamos borde amarillo a la piece active pasada, si la hay...
    if ( activePiece ) {
        activePiece.classList.remove( 'active' );
    }
    
    const piece = e.target;

    // Seteamos active piece
    activePiece = piece;

    // Agregamos borde amarillo
    piece.classList.add( 'active' );


}

export function movePiece ( e ) {
    
    // Si hay una pieza seleccionada
    if ( activePiece ) {

        const position = activePiece.dataset.position;
        const landingSquare = e.target.dataset.position;

        // Buscamos pieza a mover
        const pieceToMove = findPieceByPosition( pieces, position );

        // Calculamos posibles movimientos
        const moves = getPossibleMoves( pieceToMove );
            
        // Si el movimiento no es legal retornamos
        if ( !moves.includes( landingSquare ) ) {
            console.log('illegal')
            return;
        }

        // La movemos
        pieceToMove.square = landingSquare;
        
        // Active piece
        activePiece = null;
        removeActiveBorder();

        // Turn
        changeTurn();
        
        main();
    }
}