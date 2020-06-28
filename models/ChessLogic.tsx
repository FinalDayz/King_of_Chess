import Chess, {ChessInstance, Move, Piece, Square} from 'chess.js';
import {ChessAnalyser} from "./ChessAnalyser";
import {Analysis} from "./Analysis";



export class ChessLogic {
    private game: ChessInstance;
    private selectedSquare?: Square;
    chessAnalyser: ChessAnalyser;
    private currentAnalysisInfo: undefined |
        { fen: string, analysis: Analysis};
    private moveCallbacks: Array<(move: Move) => void> = [];

    constructor() {
        this.game = Chess.Chess();
        this.chessAnalyser = new ChessAnalyser();
    }

    addMoveCallback(callback: (move: Move) => void) {
        this.moveCallbacks.push(callback);
    }

    private executeCallbacks(move: Move) {
        for(const callback of this.moveCallbacks) {
            callback(move);
        }
    }


    getFen() {
        return this.game.fen();
    }

    hasEnded() {
        return this.game.game_over();
    }

    getMoves(square?: string): Move[] {
        if (square) {
            return this.game.moves({verbose: true, square: square});
        }

        return this.game.moves({verbose: true});
    }

    getAllSquares() {
        return this.game.SQUARES;
    }

    positionToSquare(x: number, y: number, whiteDown: boolean): Square | null {
        if (x < 1 || x > 8 || y < 1 || y > 8)
            return null;

        if (whiteDown) {
            x = 7 - (x - 1) + 1;
            y = 7 - (y - 1) + 1;
        }

        let square =
            "abcdefgh" [x - 1] +
            (8 - (y - 1));

        return square as Square;
    }

    squareToPosition(square: Square, whiteDown: boolean): { x: number, y: number } {
        const pos = {
            x: "abcdefgh".indexOf(square[0]),
            y: (+square[1] - 1),
        };

        if (whiteDown)
            pos.x = 7 - pos.x;

        if (!whiteDown)
            pos.y = 7 - pos.y;
        return pos;
    }

    getPiece(square: Square): Piece | null {
        return this.game.get(square);
    }

    isLight(square: Square): boolean {
        return this.game.square_color(square) === 'light';
    }

    isWhiteTurn(): boolean {
        return this.game.turn() === "w";
    }

    makeMove(move: Move): Move | null {
        const madeMove = this.game.move(move);
        if(madeMove)
            this.executeCallbacks(madeMove);
        return madeMove;
    }

    getMoveFromPositions(moveStr: string): Move | null {
        for (const move of this.getMoves()) {
            if (moveStr === move.from + move.to) {
                return move;
            }
        }
        return null;
    }

    undo() {
        this.game.undo();
    }

    getCurrentAnalysis(): Promise<Analysis> {
        return new Promise<Analysis>((accept, reject) => {
            if (this.currentAnalysisInfo && this.currentAnalysisInfo.fen == this.getFen()) {
                accept(this.currentAnalysisInfo.analysis);
            }
            this.chessAnalyser.analysePosition(this).then(analysis => {
                if(analysis.error) {
                    reject(analysis);
                }
                this.currentAnalysisInfo = {
                    fen: this.getFen(),
                    analysis: analysis,
                };

                accept(this.currentAnalysisInfo.analysis);
            }).catch(error => {
                reject(error)
            });

        });

    }
}
