import {ChessPlayerInterface} from "./ChessPlayerInterface";
import {ChessLogic} from "../ChessLogic";
import {Move} from "chess.js";
import {ChessDisplay} from "../../components/screens/ChessDisplay";
import {ChessAnalyser} from "../ChessAnalyser";
import {Alert} from "react-native";

export class ComputerChessPlayer implements ChessPlayerInterface {
    private isWhite: boolean|null = null;
    game: ChessLogic;
    private owner!: ChessDisplay;
    private moveCallback: (move: Move) => void;
    private difficulty: number;


    constructor(game: ChessLogic, difficulty: number) {
        this.game = game;
        this.moveCallback = () => {};
        this.difficulty = difficulty;
    }

    makeMove(game: ChessLogic): Promise<Move> {
        return new Promise<Move>((accept, reject) => {
            if(this.isWhite === null) {
                reject("setIsWhite function must be called first");
            }

            game.chessAnalyser.analysePosition(this.game, this.difficulty)
                .then(result => {
                    const move = this.game.getMoveFromPositions(result.move);
                    if(this.game.hasEnded())
                        reject();

                    if(move)
                        this.moveCallback(move);
                    else
                        console.error("Move is not found?!")
                }).catch(error => {
                Alert.alert("Error", "Unknown error occurred");
            });

            this.moveCallback = accept;
        });
    };

    setIsWhite(isWhite: boolean) {
        this.isWhite = isWhite;
    };

    setOwner(owner: ChessDisplay) {
        this.owner = owner;
    };


}
