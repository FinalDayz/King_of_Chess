import React, {ReactNode} from "react";
import {
    FlatList,
    ListView,
    PanResponder,
    PanResponderInstance, SectionList,
    StyleSheet, Text, TouchableHighlight, TouchableNativeFeedback,
    TouchableOpacity, TouchableWithoutFeedback, TouchableWithoutFeedbackComponent, UIManager,
    View
} from 'react-native';
import {Square} from 'chess.js';
import {ChessLogic} from "../../models/ChessLogic";
import {ChessPlayerInterface} from "../../models/chessPlayers/ChessPlayerInterface";
import {HumanPlayerInterface} from "../../models/chessPlayers/HumanPlayerInterface";
import {SquareRenderer} from "../renderers/SquareRenderer";
import {PieceRenderer} from "../renderers/PieceRenderer";
import {Position} from "../../models/Position";
import {PositionView} from "../PositionView";
import {Subscription} from "rxjs";

export interface DisplaySettings {
    whiteDown: boolean
}

export interface Props {
    game: ChessLogic,
    whitePlayer: ChessPlayerInterface,
    blackPlayer: ChessPlayerInterface,
    displaySettings: DisplaySettings
}

interface State {
    whitePlayer: ChessPlayerInterface,
    blackPlayer: ChessPlayerInterface,
    players: Array<ChessPlayerInterface>,
    playerTurn: ChessPlayerInterface,
}


export class ChessDisplay extends React.Component<Props, State> {
    private readonly game: ChessLogic;
    private readonly squareRendered: SquareRenderer;
    private readonly pieceRenderer: PieceRenderer;
    private boardPosition: undefined | Position;
    private touchSelectedSquare: Square | null = null;

    private viewSubscription: Subscription | undefined;

    static defaultProps = {
        displaySettings: {
            whiteDown: true,
        }
    };

    public constructor(props: Props, state: State) {
        super(props);


        this.state = {
            ...state,
            whitePlayer: props.whitePlayer,
            blackPlayer: props.blackPlayer,
            players: [props.whitePlayer, props.blackPlayer],
            playerTurn: props.whitePlayer
        };

        this.game = props.game;

        this.state.whitePlayer.setIsWhite(true);
        this.state.blackPlayer.setIsWhite(false);
        for (const player of this.state.players) {
            player.setOwner(this);
        }

        this.squareRendered = new SquareRenderer(this.game);
        this.pieceRenderer = new PieceRenderer(this.game);
    }

    componentDidMount(): void {
        this.viewSubscription = this.props.game.subscribeToView(() => {
            this.forceUpdate();
        });
        this.toMove(this.state.playerTurn);
    }

    componentWillUnmount(): void {
        this.viewSubscription?.unsubscribe();
    }

    toMove(player: ChessPlayerInterface) {
        this.setState({
            playerTurn: player
        });
        player.makeMove(this.game)
            .then(move => {
                this.game.makeMove(move);
                this.toMove(this.state.whitePlayer === player ?
                    this.state.blackPlayer : this.state.whitePlayer
                );
            })
            .catch(err => {

            });
    }

    clickToTile(x: number, y: number) {
        if (this.boardPosition === undefined) {
            return
        }

        x = Math.ceil(x / this.boardPosition.width * 8);
        y = Math.ceil(y / this.boardPosition.height * 8);

        this.touchSelectedSquare = this.game.positionToSquare(x, y, this.props.displaySettings.whiteDown);
    }

    buildChessSquares(): Array<ReactNode> {
        let boardNodes = [];
        let board = new Array<Array<Square>>(8);
        for (let i = 0; i < board.length; i++) {
            board[i] = new Array<Square>(8);
        }

        for (let square of this.game.getAllSquares()) {
            const position = this.game.squareToPosition(square, this.props.displaySettings.whiteDown);
            board[position.x][position.y] = square;
        }

        for (const row of board) {
            boardNodes.push(
                <View
                    style={styles.chessboardRow}
                    pointerEvents={'none'}
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
                <View key={square}>
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
            <View style={styles.wrapper}>
                <PositionView
                    style={styles.chessboard}
                    onTouchMove={(event) => {
                        this.clickToTile(event.nativeEvent.locationX, event.nativeEvent.locationY);
                    }}
                    onTouchEnd={this.releasedSquare.bind(this)}
                    onTouchStart={(event) => {
                        this.clickToTile(event.nativeEvent.locationX, event.nativeEvent.locationY);
                        this.pressSquare();
                    }}

                    positionFeedback={(pos) => {
                        this.boardPosition = pos
                    }}>
                    {boardNodes}
                </PositionView>
            </View>
        );
    }

    private releasedSquare() {
        this.interactSquare(true);
        this.touchSelectedSquare = null;
    }

    private pressSquare() {
        this.interactSquare(false);
    }

    private interactSquare(released: boolean) {

        for (const player of this.state.players) {

            if (this.state.playerTurn !== player || this.touchSelectedSquare === null)
                continue;
            if ('touchedSquare' in player) {
                (player as HumanPlayerInterface).touchedSquare(this.touchSelectedSquare, released);
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
    wrapper: {
        alignItems: 'center',
    },
    chessboard: {
        flexDirection: 'row',
    },
    chessboardRow: {
        flexDirection: 'column',
    },
});

