import {ChessPlayerInterface} from "./ChessPlayerInterface";
import {Square} from "chess.js";

export interface HumanPlayerInterface extends ChessPlayerInterface {
    touchedSquare: (square: Square) => (void),

    touchMoved(param: { x: number; y: number }): void;
}
