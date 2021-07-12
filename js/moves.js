import { getSquaresIndexed } from './helpers.js';
import { getTurn } from './turns.js';


export function getPossibleMoves ( piece ) {

    const turn = getTurn();
    const squares = [ ...document.querySelectorAll( '.square' ) ];
    const squaresIndexed = getSquaresIndexed( squares );
    const board_direction = ( turn === 'black' ) ? -1 : 1;
    

    const forwardSquares = getForwardSquares( piece, squaresIndexed, board_direction );
    const eatingMoves = getEatingMoves( forwardSquares, turn, squaresIndexed, board_direction );

    
    const moves = [ ...forwardSquares, ...eatingMoves ];
    const cleanedMoves = cleanMoves( moves );
    
    return cleanedMoves.map( move => move.dataset.position );
}

function getForwardSquares ( piece, squares, board_direction ) {
    
    const [ row, column ] = piece.square;
    
    const left_square = squares[ `${ +row + board_direction }${ +column - 1 }` ];
    const right_square = squares[ `${ +row + board_direction }${ +column + 1 }` ];
    
    return [ left_square, right_square ];
}

function getEatingMoves ( forwardSquares, turn, squaresIndexed, board_direction ) {

    const [ left_square, right_square ] = forwardSquares;
    const opossiteTurn = ( turn === 'black' ) ? 'red' : 'black';
    const possibleMoves = [];

    // Si tiene adelante una pieza del equipo opuesto
    if ( left_square?.classList.contains( `piece-${ opossiteTurn }` ) ) {
        const [ row, column ] = left_square.dataset.position;
        possibleMoves.push( squaresIndexed[ `${ +row + board_direction }${ +column - 1 }` ] )
    }

    if ( right_square?.classList.contains( `piece-${ opossiteTurn }` ) ) {
        const [ row, column ] = right_square.dataset.position;
        possibleMoves.push( squaresIndexed[ `${ +row + board_direction }${ +column + 1 }` ] )
    }

    return possibleMoves;   
}

// Limpiamos las moves que cuyas casillas de destino estén ocupadas
function cleanMoves ( moves ) {
    return moves.filter( move => move && !move.dataset.occupied )
}

