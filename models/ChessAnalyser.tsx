import {ChessLogic} from "./ChessLogic";
import {HTTPClient} from "./HTTPClient";
import {Analysis} from "./Analysis";

export class ChessAnalyser {

    analysePosition(
        chessGame: ChessLogic
    ): Promise<Analysis|{error: string}|any> {
        const fen = chessGame.getFen();
        return new Promise<{}>((accept, reject) => {
            HTTPClient.getRequest("/analyse", [fen])
                .then(json => {
                    console.log(json);
                    if(json.error) {
                        reject(json);
                    }
                    accept(json);
                })
                .catch(error => {
                    console.error(error);
                    reject(error);
                });
        });

    }
}
