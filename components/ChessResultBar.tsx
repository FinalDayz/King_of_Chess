import React from "react";
import {ChessLogic} from "../models/ChessLogic";
import {Text, StyleSheet, View, Image} from "react-native";
import {ChessImages} from "../models/ChessImages";
import {Piece, PieceType} from "chess.js";

interface Props {
    game: ChessLogic,
    whiteSide: boolean
}

interface State {
}

export class ChessResultBar extends React.Component<Props, State>{
    constructor(props: Props, state: State) {
        super(props, state);

        props.game.subscribeToView(() => {
            this.forceUpdate();
        });

    }

    render() {
        const thisColor = this.props.whiteSide ? 'w' : 'b';
        const capturedPieces: {'w': Array<PieceType>, 'b': Array<PieceType>, } = {'w': [], 'b': []};
        const points = {'w': 0, 'b': 0};
        for(const piece of this.props.game.getCapturedPieces()) {
            points[piece.color] += this.props.game.getPiecePoints(piece.type);
            capturedPieces[piece.color].push(piece.type);
        }

        const advantage = points[thisColor];

        return (
            <View style={styles.wrapper}>
                <View style={[styles.block,
                    this.props.whiteSide ? styles.whiteBlock : styles.blackBlock]}>
                    <Text style={[styles.text,
                        this.props.whiteSide ? styles.whitesText : styles.blackBlock]}>
                        Captured Pieces
                    </Text>
                    {this.renderPieces(
                        thisColor,
                        capturedPieces[thisColor]
                    )}
                    <Text> ({advantage > 0 ? '+' : ''}{advantage})</Text>
                </View>
            </View>
        );
    }

    renderPieces(color: 'w'|'b', pieceType: PieceType[]) {
        const pieces = [];
        for(const piece of pieceType) {
            const pieceString = color + '-' + piece;
            pieces.push(
                <Image
                    style={styles.pieceImage}
                    source={ChessImages.chesspieces[pieceString]}/>
                );
        }

        return pieces;
    }

}

const styles = StyleSheet.create({
    pieceImage: {
        width: 25,
        height: 30,
    },
    whitesText: {

    },
    blacksText: {
        color: 'white',
    },
    text: {
       fontSize: 16,
    },
    blackBlock: {
        justifyContent: 'flex-start',
        backgroundColor: 'black',
    },
    whiteBlock: {
        justifyContent: 'flex-start',
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
