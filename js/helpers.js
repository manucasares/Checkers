


export function findPieceByPosition ( pieces, position ) {
    return pieces.find( piece => piece.square === position );
}