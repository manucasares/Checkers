import { pieces } from '../data/pieces.js';
import { findPieceByPosition } from './helpers.js';

let activePiece = null;
let turn = 'black';


export function setPieces ( squares ) {
    
    // Indexamos las piezas para poder acceder por su posición fácilmente
    const squaresIndexed = squares.reduce( ( squaresIndexed, square ) => {
        return {
            ...squaresIndexed,
            [ square.dataset.position ]: square
        }        
    }, {} )

    // Por cada square con pieza ponemos atributos y clases
    pieces.forEach( piece => {
        squaresIndexed[ piece.square ].classList.add( `piece` )
        squaresIndexed[ piece.square ].classList.add( `piece-${ piece.team }` )
        squaresIndexed[ piece.square ].setAttribute( 'data-occupied', 'true' );
    });
}

export function addPieceListeners ( squares ) {
    
    const occupiedSquares = squares.filter( square => square.dataset.occupied );
    const turnOccupiedSquares = occupiedSquares.filter( square => square.classList.contains( `piece-${ turn }` ) );

    turnOccupiedSquares.forEach( square => {
        square.addEventListener( 'click', setActivePiece )
    });
}

export function addSquareListener ( squares ) {
    const emptySquares = squares.filter( square => !square.dataset.occupied );

    emptySquares.forEach( square => {
        square.addEventListener( 'click', movePiece );
    });
}

function setActivePiece ( e ) {
    
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

function movePiece ( e ) {
    
    // Si hay una pieza seleccionada
    if ( activePiece ) {

        const position = activePiece.dataset.position;

        // Buscamos pieza a mover
        const pieceToMove = findPieceByPosition( pieces, position );

        // La movemos
        pieceToMove.square = e.target.dataset.position;        
    }
}

export function getTurn () {
    const turnElement = document.querySelector( '#turn' ); 
    turn = turnElement.dataset.turn;
    return turn;
}