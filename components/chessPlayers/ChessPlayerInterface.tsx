import {ChessLogic} from "../../models/ChessLogic";
import {Move} from "chess.js";
import {ChessDisplay} from "../screens/ChessDisplay";

export interface ChessPlayerInterface {
     game: ChessLogic;

     makeMove: (game: ChessLogic) => Promise<Move>;
     setIsWhite: (isWhite: boolean) => void;
     setOwner: (owner: ChessDisplay) => void;
}
