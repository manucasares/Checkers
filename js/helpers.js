


export function findPieceByPosition ( pieces, position ) {
    return pieces.find( piece => piece.square === position );
}

export const getSquaresIndexed = ( squares ) => {
    return squares.reduce( ( squaresIndexed, square ) => {
        return {
            ...squaresIndexed,
            [ square.dataset.position ]: square
        }
    }) 
}