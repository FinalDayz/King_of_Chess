import {ChessPlayerInterface} from "./ChessPlayerInterface";
import {ChessLogic} from "../../models/ChessLogic";
import {Move} from "chess.js";
import {ChessDisplay} from "../screens/ChessDisplay";

export class ComputerChessPlayer implements ChessPlayerInterface {
    private isWhite: boolean|null = null;
    game: ChessLogic;
    private owner!: ChessDisplay;

    constructor(game: ChessLogic) {
        this.game = game;
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

    setOwner(owner: ChessDisplay) {
        this.owner = owner;
    };


}
