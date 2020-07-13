import React from "react";
import {ChessLogic} from "../models/ChessLogic";
import {Text, StyleSheet, View, Image} from "react-native";
import {ChessImages} from "../models/ChessImages";
import {Piece, PieceType} from "chess.js";
import {Subscription} from "rxjs";

interface Props {
    game: ChessLogic,
    whiteSide: boolean
}

interface State {
}

export class ChessResultBar extends React.Component<Props, State>{
    private viewSubscription: Subscription|undefined;

    componentDidMount(): void {
        this.viewSubscription = this.props.game.subscribeToView(() => {
            this.forceUpdate();
        });
    }

    componentWillUnmount(): void {
       this.viewSubscription?.unsubscribe();
    }

    render() {
        const thisColor = this.props.whiteSide ? 'w' : 'b';
        const capturedPieces: {'w': Array<PieceType>, 'b': Array<PieceType>, } = {'w': [], 'b': []};
        const points = {'w': 0, 'b': 0};
        const opponentColor = this.props.whiteSide ? 'b' : 'w';

        for(const piece of this.props.game.getCapturedPieces()) {
            points[piece.color] += this.props.game.getPiecePoints(piece.type);
            capturedPieces[piece.color].push(piece.type);
        }

        const advantage = points[thisColor] - points[opponentColor];

        const boxStyle = this.props.whiteSide ? styles.whiteBlock : styles.blackBlock;
        const textStyle = this.props.whiteSide ? styles.whitesText : styles.blacksText;

        return (
            <View style={styles.wrapper}>
                <View style={[styles.block, boxStyle]}>
                    <Text style={[styles.text, textStyle]}>
                        Captured:
                    </Text>
                    {this.renderPieces(
                        opponentColor,
                        capturedPieces[thisColor]
                    )}
                    <Text style={[styles.text, textStyle]}> ({advantage > 0 ? '+' : ''}{advantage})</Text>
                </View>
            </View>
        );
    }

    renderPieces(color: 'w'|'b', pieceType: PieceType[]) {
        const pieces = [];
        let index = 0;
        pieceType.sort(
            (pieceA: PieceType, pieceB: PieceType) => {
                return this.props.game.getPiecePoints(pieceA) - this.props.game.getPiecePoints(pieceB);
            });

        for(const piece of pieceType) {
            const pieceString = color + '-' + piece;
            pieces.push(
                <Image key={index}
                    style={styles.pieceImage}
                    source={ChessImages.chesspieces[pieceString]}/>
                );
            index++;
        }

        return pieces;
    }

}

const styles = StyleSheet.create({
    pieceImage: {
        width: 23,
        height: 30,
    },
    whitesText: {

    },
    blacksText: {
        color: 'white',
    },
    text: {
       fontSize: 16,
        paddingLeft: 3,
    },
    blackBlock: {
        justifyContent: 'flex-start',
        backgroundColor: 'black',
    },
    whiteBlock: {
        justifyContent: 'flex-start',
        backgroundColor: 'white',
    },
    block: {
        alignItems: 'center',
        flex: 2,
        justifyContent: 'center',
        height: 40,
        flexDirection: 'row',
    },
    wrapper: {
        borderColor: '#888',
        borderWidth: 2,
        flexDirection: 'row'
    },
});
