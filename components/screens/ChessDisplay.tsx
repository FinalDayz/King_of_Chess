import React, {ReactNode} from "react";
import {
    FlatList,
    GestureResponderEvent, ListView,
    PanResponder,
    PanResponderInstance, SectionList,
    StyleSheet, Text, TouchableHighlight, TouchableNativeFeedback,
    TouchableOpacity, TouchableWithoutFeedback, TouchableWithoutFeedbackComponent,
    View
} from 'react-native';
import {Square} from 'chess.js';
import {ChessLogic} from "../../models/ChessLogic";
import {ChessPlayerInterface} from "../chessPlayers/ChessPlayerInterface";
import {HumanPlayerInterface} from "../chessPlayers/HumanPlayerInterface";
import {SquareRenderer} from "../renderers/SquareRenderer";
import {PieceRenderer} from "../renderers/PieceRenderer";
import {TouchView} from "../TouchView";


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
    private readonly game: ChessLogic;
    private readonly squareRendered: SquareRenderer;
    private readonly pieceRenderer: PieceRenderer;
    private _panResponder: PanResponderInstance;

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
        for (const player of this.state.players) {
            player.setOwner(this);
        }

        this.squareRendered = new SquareRenderer(this.game);
        this.pieceRenderer = new PieceRenderer(this.game);
        this._panResponder = PanResponder.create({
            // Ask to be the responder:
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

            onPanResponderGrant: (evt, gestureState) => {
                // The gesture has started. Show visual feedback so the user knows
                // what is happening!

                // gestureState.d{x,y} will be set to zero now
                console.log("onPanResponderGrant");
            },
            onPanResponderMove: (evt, gestureState) => {
                // The most recent move distance is gestureState.move{X,Y}

                // The accumulated gesture distance since becoming responder is
                // gestureState.d{x,y}
                console.log(evt);
                console.log("onPanResponderMove");
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                // The user has released all touches while this view is the
                // responder. This typically means a gesture has succeeded
                console.log("onPanResponderRelease");
                // console.log(evt);
                // console.log(evt['_dispatchInstances']);

            },
            onPanResponderTerminate: (evt, gestureState) => {
                // Another component has become the responder, so this gesture
                // should be cancelled
                console.log("onPanResponderTerminate");
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
                // Returns whether this component should block native components from becoming the JS
                // responder. Returns true by default. Is currently only supported on android.
                console.log("onShouldBlockNativeResponder");
                return true;
            }
        });

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
                <View
                    style={styles.chessboardRow}
                    // pointerEvents={'box-none'}
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
                <View
                    key={square}
                    onTouchMove={(event) => {
                        // console.log("MVD ON " + square);
                        // event.stopPropagation();
                        // event.preventDefault();
                    }}
                    // onTouchEnd={(event) => {
                    //     console.log(event);
                    // }}
                    // pointerEvents={'box-only'}
                    // onTouchEndCapture={this.releasedSquare.bind(this, square)}
                    // onTouchStart={this.pressSquare.bind(this, square)}

                >
                    <TouchableOpacity>

                        {this.squareRendered.render(square, rowIndex, columnIndex)}
                        {this.pieceRenderer.render(square)}
                    </TouchableOpacity>
                </View>
            );
        }

        return squares;
    }


    render() {
        let boardNodes = this.buildChessSquares();

        return (
            <View style={styles.chessboard}

                  onTouchMove={(event) => {
                      // console.log(event);

                  }}
                  {...this._panResponder.panHandlers}
                // onTouchEndCapture={(event) => {console.log(event)}}
                // onTouchStart={(event) => {console.log(event)}}
                //   onTouchMove={(event) => this.touchMove(event)}
            >
                {boardNodes}
            </View>
        );
    }

    private touchMove(event: GestureResponderEvent) {
        for (const player of this.state.players) {
            if (this.state.playerTurn !== player)
                continue;
            if ('touchMoved' in player) {
                (player as HumanPlayerInterface).touchMoved(
                    {x: event.nativeEvent.pageX, y: event.nativeEvent.pageY}
                );
            }
        }
    }

    private releasedSquare(square: Square) {
        this.interactSquare(square, true);
    }

    private pressSquare(square: Square) {
        this.interactSquare(square, false);
    }

    private interactSquare(square: Square, released: boolean) {
        for (const player of this.state.players) {
            if (this.state.playerTurn !== player)
                continue;
            if ('touchedSquare' in player) {
                (player as HumanPlayerInterface).touchedSquare(square, released);
            }
        }
    }


    getSquareRendered(): SquareRenderer {
        return this.squareRendered;
    }

    getPieceRenderer(): PieceRenderer {
        return this.pieceRenderer;
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

