import {HumanPlayerInterface} from "./HumanPlayerInterface";
import {ChessLogic} from "../../models/ChessLogic";
import {Move, Square} from "chess.js";

export class TouchscreenPlayer implements HumanPlayerInterface {
    private isWhite: boolean|null = null;

    setGame(game: ChessLogic) {

    }

    makeMove(game: ChessLogic): Promise<Move> {
        return new Promise<Move>((accept, reject) => {
            if(this.isWhite === null) {
                reject("setIsWhite function must be called first");
            }

            const move = game.getMoves()[0];

            accept(move);
        });
    };

    setIsWhite(isWhite: boolean) {
        this.isWhite = isWhite;
    };

    touchedSquare(square: Square) {
        console.log("Pressed " + square);
    };

    touchMoved(position: { x: number; y: number }): void {
        console.log();
        // this.
    }


}
