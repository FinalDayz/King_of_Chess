import {ChessLogic} from "../../models/ChessLogic";
import {ChessRenderer} from "./ChessRenderer";
import {Square} from "chess.js";
import React, {ReactNode} from "react";
import {Image, StyleSheet, Text, View} from "react-native";

export class SquareRenderer implements ChessRenderer {
    game: ChessLogic;

    constructor(game: ChessLogic) {
        this.game = game;
    }


    render(square: Square, rowIndex: Number, columnIndex: Number): ReactNode {
        return (
            <View
                style={[
                    styles.square,
                    styles[this.game.isLight(square) ? 'light' : 'dark']
                ]}>


                {this.renderSquareCoordinates(columnIndex === 0, true, square)}
                {this.renderSquareCoordinates(rowIndex === 7, false, square)}
            </View>
        );
    }

    renderSquareCoordinates(render: boolean, column: boolean, square: Square) {
        if (render) {
            const style = column ? styles.columnText : styles.rowText;
            const text = column ? square[1] : square[0];
            return (
                <Text
                    style={[style, styles[this.game.isLight(square) ? 'darkTxt' : 'lightTxt']]}>
                    {text}
                </Text>
            );
        }
    }
}

const styles = StyleSheet.create({
    lightTxt: {
        color: '#FFF',
    },
    darkTxt: {
        color: '#000',
    },
    light: {
        backgroundColor: '#ccc',
    },
    dark: {
        backgroundColor: '#666',
    },
    rowText: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    columnText: {
        position: 'absolute',
        left: 0,
    },
    square: {
        width: 50,
        height: 50,
    },
});
