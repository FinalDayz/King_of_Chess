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

    getMoves(square?: string): Move[] {
        if (square) {
            return this.game.moves({verbose: true, square: square});
        }

        return this.game.moves({verbose: true});
    }

    getAllSquares()
    {
        return this.game.SQUARES;
    }

    positionToSquare(x: number, y: number, whiteDown: boolean): Square|null
    {
        if(x < 1 || x > 8 || y < 1 || y > 8)
            return null;

        if(whiteDown) {
            x = 7 - (x-1) + 1;
            y = 7 - (y-1) + 1;
        }

        let square =
            "abcdefgh" [x - 1] +
            (8 - (y - 1));

        return square as Square;
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

    isWhiteTurn(): boolean
    {
        return this.game.turn() === "w";
    }

    makeMove(move: Move): Move|null {
        return this.game.move(move);
    }
}
