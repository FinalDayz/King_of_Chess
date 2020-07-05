import {ChessLogic} from "../ChessLogic";
import {Move} from "chess.js";
import {ChessDisplay} from "../../components/screens/ChessDisplay";

export interface ChessPlayerInterface {
     game: ChessLogic;

     makeMove: (game: ChessLogic) => Promise<Move>;
     setIsWhite: (isWhite: boolean) => void;
     setOwner: (owner: ChessDisplay) => void;
}
