import React, {ReactNode} from "react";
import {StyleSheet, Text, View, Image, TouchableOpacity, GestureResponderEvent} from 'react-native';
import Chess, {Square} from 'chess.js';
import {ChessLogic} from "../../models/ChessLogic";
import {ChessImages} from "../../models/ChessImages";


export interface Props {
    game: ChessLogic
}

interface State {

}

export class ChessDisplay extends React.Component<Props, State> {
    private game: ChessLogic;
    private readonly whiteDown: boolean;

    public constructor(props: Props) {
        super(props);

        this.game = props.game;
        this.whiteDown = false;
    }

    buildChessSquares(): Array<ReactNode> {
        let boardNodes = [];
        let board = new Array<Array<Square>>(8);
        for (let i = 0; i < board.length; i++) {
            board[i] = new Array<Square>(8);
        }

        for (let square of this.game.getAllSquares()) {
            const position = this.game.squareToPosition(square, this.whiteDown);
            board[position.x][position.y] = square;
        }

        for (const row of board) {
            boardNodes.push(
                <View style={styles.chessboardRow}>
                    {this.renderColumn(row, board.indexOf(row))}
                </View>
            );
        }

        return boardNodes;
    }

    private renderColumn(column: Array<Square>, columnIndex: number): Array<React.ReactNode> {
        let squares = [];

        for (const square of column) {

            const rowIndex = column.indexOf(square);
            const piece = this.game.getPiece(square);
            const image = piece ? ChessImages.chesspieces[piece?.color + '-' + piece?.type] : null;

            squares.push(
                <TouchableOpacity
                    onPress={this.pressSquare.bind(this, square)}>
                    <View key={square} style={[
                        styles.square,
                        styles[this.game.isLight(square) ? 'light' : 'dark']
                    ]}>
                        {image ? (
                            <Image source={image} style={styles.pieceImage}/>
                        ) : null}

                        {this.renderSquareCoordinates(columnIndex === 0, true, square)}
                        {this.renderSquareCoordinates(rowIndex === 7, false, square)}
                    </View>
                </TouchableOpacity>
            );
        }

        return squares;
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


    render() {

        let boardNodes = this.buildChessSquares();

        return (
            <View style={styles.chessboard}>
                {boardNodes}
            </View>
        );
    }

    private pressSquare(square: Square) {
        // return function (p1: GestureResponderEvent) {
            console.log(square);
        // };
    }
}

const styles = StyleSheet.create({
    rowText: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    columnText: {
        position: 'absolute',
        left: 0,
    },
    pieceImage: {
        width: 44,
        height: 44,
        marginLeft: 3,
        marginTop: 3,
    },
    chessboard: {
        flexDirection: 'row',
    },
    chessboardRow: {
        flexDirection: 'column',
    },
    square: {
        width: 50,
        height: 50,
    },
    light: {
        backgroundColor: '#ccc',
    },
    dark: {
        backgroundColor: '#666',
    },
    lightTxt: {
        color: '#FFF',
    },
    darkTxt: {
        color: '#000',
    }
});

