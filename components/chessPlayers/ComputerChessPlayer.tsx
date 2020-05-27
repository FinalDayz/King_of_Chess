import {ChessPlayerInterface} from "./ChessPlayerInterface";
import {ChessLogic} from "../../models/ChessLogic";
import {Move} from "chess.js";

export class ComputerChessPlayer implements ChessPlayerInterface {
    private isWhite: boolean|null = null;

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


}
