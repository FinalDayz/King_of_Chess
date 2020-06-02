import {HumanPlayerInterface} from "./HumanPlayerInterface";
import {ChessLogic} from "../../models/ChessLogic";
import {Move, Square} from "chess.js";
import {ChessDisplay} from "../screens/ChessDisplay";
import {DotMoveDecorator} from "../renderers/RenderDecorators/DotMoveDecorator";
import {RenderDecorator} from "../renderers/RenderDecorators/RenderDecorator";
import {DotCapturedMoveDecorator} from "../renderers/RenderDecorators/DotCapturedMoveDecorator";

export class TouchscreenPlayer implements HumanPlayerInterface {
    private isWhite: boolean|null = null;
    private pressedSquare: Square|null = null;
    private owner!: ChessDisplay;
    private moveCallback: null|((move: Move) => void) = null;
    game: ChessLogic;
    private visibleMoves : Move[] = [];

    constructor(game: ChessLogic) {
        this.game = game;
    }

    setOwner(owner: ChessDisplay) {
        this.owner = owner;
    }

    makeMove(game: ChessLogic): Promise<Move> {
        return new Promise<Move>((accept, reject) => {
            if(this.isWhite === null) {
                reject("setIsWhite function must be called first");
            }

            const move = game.getMoves()[0];
            this.moveCallback = accept;
            // accept(move);
        });
    };

    setIsWhite(isWhite: boolean) {
        this.isWhite = isWhite;
    };

    movedPiece(move: Move) {
        console.log(this.moveCallback);
        if(this.moveCallback !== null){
            this.moveCallback(move);
        }
    }

    touchedSquare(square: Square, released: boolean) {
        console.log("Pressed " + square+" " + released);

        if(released) {
            if(this.pressedSquare != null) {


                for(const move of this.visibleMoves) {
                    console.log(square+" === " + move.to);
                    if(move.to === square) {
                        this.movedPiece(move);
                    }
                }
            }
        } else {
            this.pressedSquare = square;
            this.visibleMoves = this.game.getMoves(this.pressedSquare);
            this.owner.getSquareRendered().clearDecorators();

            for(const move of this.visibleMoves) {

                let decorator: RenderDecorator;
                if(move.captured) {
                    decorator = new DotCapturedMoveDecorator();
                } else {
                    decorator = new DotMoveDecorator()
                }
                this.owner.getSquareRendered().addTileDecoration(move.to,decorator);
            }
            this.owner.forceUpdate();

        }

    };

    touchMoved(position: { x: number; y: number }): void {
        // console.log(position);
        // this.
    }


}
