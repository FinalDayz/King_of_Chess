import Chess, {ChessInstance, Move} from 'chess.js';

export class ChessLogic {
    private game: ChessInstance;

    constructor() {
        this.game = Chess.Chess();
        console.log("BOE");
        console.log(this.game.moves({verbose: true}));

    }

    hasEnded()
    {
        return this.game.game_over();
    }

    getMoves(square?: string): Move[]
    {
        return this.game.moves({verbose: true, square: square});
    }
}
