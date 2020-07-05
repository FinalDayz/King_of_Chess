import {ChessPlayerInterface} from "./ChessPlayerInterface";
import {Square} from "chess.js";
import {ChessLogic} from "../ChessLogic";

export interface HumanPlayerInterface extends ChessPlayerInterface {

    touchedSquare: (square: Square, released: boolean) => (void),

    touchMoved(param: { x: number; y: number }): void;
}
