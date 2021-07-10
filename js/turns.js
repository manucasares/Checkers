import { changeTurnUI } from './ui.js';


export function getTurn () {
    const turnElement = document.querySelector( '#turn' ); 
    let turn = turnElement.dataset.turn;
    return turn;
}

export function changeTurn () {

    const turn = getTurn();

    const nextTurn = turn === 'black' ? 'red' : 'black';

    document.querySelector( '#turn' ).dataset.turn = nextTurn;
    changeTurnUI( nextTurn );
}