import {ChessLogic} from "../../models/ChessLogic";
import {ChessRenderer} from "./ChessRenderer";
import {Image, StyleSheet, View} from "react-native";
import React, {ReactNode} from "react";
import {Square} from "chess.js";
import {ChessImages} from "../../models/ChessImages";

export class PieceRenderer implements ChessRenderer {
    game: ChessLogic;

    constructor(game: ChessLogic) {
        this.game = game;
    }

    render(square: Square): ReactNode {
        const piece = this.game.getPiece(square);
        const image = piece ? ChessImages.chesspieces[piece?.color + '-' + piece?.type] : null;

        return (
            <View style={{position: 'absolute'}}>
            {image ? (
                    <Image source={image} style={styles.pieceImage}/>
                ) : null}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    pieceImage: {
        width: 44,
        height: 44,
        marginLeft: 3,
        marginTop: 3,
    },
});
