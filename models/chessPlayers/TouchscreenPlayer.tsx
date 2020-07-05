import {HumanPlayerInterface} from "./HumanPlayerInterface";
import {ChessLogic} from "../ChessLogic";
import {Move, Square} from "chess.js";
import {ChessDisplay} from "../../components/screens/ChessDisplay";
import {DotMoveDecorator} from "../../components/renderers/RenderDecorators/DotMoveDecorator";
import {RenderDecorator} from "../../components/renderers/RenderDecorators/RenderDecorator";
import {DotCapturedMoveDecorator} from "../../components/renderers/RenderDecorators/DotCapturedMoveDecorator";

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
        });
    };

    setIsWhite(isWhite: boolean) {
        this.isWhite = isWhite;
    };

    executeMove(move: Move) {
        if(this.moveCallback !== null){
            this.moveCallback(move);
        }
    }

    makeMoveIfValid(square: Square): boolean {
        for(const move of this.visibleMoves) {
            if(move.to === square) {
                this.executeMove(move);
                this.clearVisibleMoves();
                return true;
            }
        }
        return false
    }

    touchedSquare(square: Square, released: boolean) {
        if(released) {
            if(this.pressedSquare != null) {
                this.makeMoveIfValid(square);
            }
        } else {

            if(this.makeMoveIfValid(square))
                return;

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

    clearVisibleMoves() {
        this.visibleMoves = [];
        this.owner.getSquareRendered().clearDecorators();
        this.owner.forceUpdate();
    }
}
