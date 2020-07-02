import {ChessLogic} from "./ChessLogic";
import {HTTPClient} from "./HTTPClient";
import {Analysis} from "./Analysis";

export class ChessAnalyser {

    analysePosition(
        chessGame: ChessLogic,
        difficulty?: number
    ): Promise<Analysis|{error: string}|any> {
        const fen = chessGame.getFen();
        return new Promise<{}>((accept, reject) => {
            const params: Array<string|number> = [fen];
            if(difficulty) {
                params.push(difficulty);
            }
            HTTPClient.getRequest("/analyse", params)
                .then(json => {
                    if(json.error) {
                        reject(json);
                    }
                    accept({
                        ...json,
                        isWhite: chessGame.isWhiteTurn()
                    });
                })
                .catch(error => {
                    console.error(error);
                    reject(error);
                });
        });

    }
}
