import React, {ReactNode} from "react";
import {StyleSheet, Text, View, Image, TouchableOpacity, GestureResponderEvent} from 'react-native';
import Chess, {Square} from 'chess.js';
import {ChessLogic} from "../../models/ChessLogic";
import {ChessImages} from "../../models/ChessImages";
import {ChessPlayerInterface} from "../chessPlayers/ChessPlayerInterface";
import {HumanPlayerInterface} from "../chessPlayers/HumanPlayerInterface";
import {SquareRenderer} from "../renderers/SquareRenderer";
import {PieceRenderer} from "../renderers/PieceRenderer";


export interface Props {
    game: ChessLogic,
    whitePlayer: ChessPlayerInterface,
    blackPlayer: ChessPlayerInterface,
}

interface State {
    whiteDown: boolean,
    whitePlayer: ChessPlayerInterface,
    blackPlayer: ChessPlayerInterface,
    players: Array<ChessPlayerInterface>,
    playerTurn: ChessPlayerInterface,
}

export class ChessDisplay extends React.Component<Props, State> {
    private game: ChessLogic;
    private squareRendered: SquareRenderer;
    private pieceRenderer: PieceRenderer;

    public constructor(props: Props, state: State) {
        super(props);

        this.state = {
            ...state,
            whiteDown: false,
            whitePlayer: props.whitePlayer,
            blackPlayer: props.blackPlayer,
            players: [props.whitePlayer, props.blackPlayer],
            playerTurn: props.whitePlayer,
        };

        this.game = props.game;

        this.state.whitePlayer.setIsWhite(true);
        this.state.blackPlayer.setIsWhite(false);

        this.squareRendered = new SquareRenderer(this.game);
        this.pieceRenderer = new PieceRenderer(this.game)
    }

    buildChessSquares(): Array<ReactNode> {
        let boardNodes = [];
        let board = new Array<Array<Square>>(8);
        for (let i = 0; i < board.length; i++) {
            board[i] = new Array<Square>(8);
        }

        for (let square of this.game.getAllSquares()) {
            const position = this.game.squareToPosition(square, this.state.whiteDown);
            board[position.x][position.y] = square;
        }

        for (const row of board) {
            boardNodes.push(
                <View style={styles.chessboardRow}
                      key={board.indexOf(row)}>
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

            squares.push(
                <TouchableOpacity
                    onPress={this.pressSquare.bind(this, square)}
                    key={square}>
                    {this.squareRendered.render(square, rowIndex, columnIndex)}
                    {this.pieceRenderer.render(square)}

                </TouchableOpacity>
            );
        }

        return squares;
    }


    render() {
        let boardNodes = this.buildChessSquares();

        return (
            <View style={styles.chessboard}
                  onTouchMove={(event) => this.touchMove(event)}>
                {boardNodes}
            </View>
        );
    }

    private touchMove(event: GestureResponderEvent) {
        for(const player of this.state.players) {
            if(this.state.playerTurn !== player)
                continue;
            if('touchedSquare' in player) {
                (player as HumanPlayerInterface).touchMoved(
                    {x: event.nativeEvent.pageX, y: event.nativeEvent.pageY}
                    );
            }
        }
    }

    private pressSquare(square: Square) {
        for(const player of this.state.players) {
            if(this.state.playerTurn !== player)
                continue;
            if('touchedSquare' in player) {
                (player as HumanPlayerInterface).touchedSquare(square);
            }
        }
    }
}

const styles = StyleSheet.create({
    chessboard: {
        flexDirection: 'row',
    },
    chessboardRow: {
        flexDirection: 'column',
    },
});

