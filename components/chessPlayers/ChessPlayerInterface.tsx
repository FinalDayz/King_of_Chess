import {ChessLogic} from "../../models/ChessLogic";
import {Move} from "chess.js";

export interface ChessPlayerInterface {

     makeMove: (game: ChessLogic) => Promise<Move>;
     setIsWhite: (isWhite: boolean) => void;
}
