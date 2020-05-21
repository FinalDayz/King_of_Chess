import Chess, {ChessInstance, Move, Piece, Square} from 'chess.js';

export class ChessLogic {
    private game: ChessInstance;
    private selectedSquare?: Square;

    constructor() {
        this.game = Chess.Chess();

    }

    hasEnded()
    {
        return this.game.game_over();
    }

    getMoves(square?: string): Move[]
    {
        return this.game.moves({verbose: true, square: square});
    }

    getAllSquares()
    {
        return this.game.SQUARES;
    }

    squareToPosition(square: Square, whiteDown: boolean): {x: number, y: number}
    {
        const pos = {
            x: "abcdefgh".indexOf(square[0]),
            y: (+square[1] - 1),
        };

        if(whiteDown)
            pos.x = 7 - pos.x;

        if(!whiteDown)
            pos.y = 7 - pos.y;
        return pos;
    }

    getPiece(square: Square): Piece | null
    {
        return this.game.get(square);
    }

    isLight(square: Square): boolean
    {
        return this.game.square_color(square) === 'light';
    }
}
