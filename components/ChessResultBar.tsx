import React from "react";
import {ChessLogic} from "../models/ChessLogic";
import {Text, StyleSheet, View, Image} from "react-native";
import {ChessImages} from "../models/ChessImages";
import {Piece, PieceType} from "chess.js";

interface Props {
    game: ChessLogic
}

interface State {

}

export class ChessResultBar extends React.Component<Props, State>{
    constructor(props: Props, state: State) {
        super(props, state);

        props.game.subscribeToView(() => {
            this.forceUpdate();
        })
    }

    render() {
        const capturedPieces: {'w': Array<PieceType>, 'b': Array<PieceType>, } = {'w': [], 'b': []};

        for(const piece of this.props.game.getCapturedPieces()) {
            capturedPieces[piece.color].push(piece.type);
        }


        return (
            <View style={styles.wrapper}>
                <View style={[styles.block,styles.whiteBlock]}>
                    <Text style={[styles.text, styles.whitesText]}>Captured</Text>
                    {this.renderPieces('b', capturedPieces['w'])}
                </View>
                <View style={[styles.block, styles.blackBlock]}>
                    <Text style={[styles.text, styles.blacksText]}>Captured</Text>
                    {this.renderPieces('w', capturedPieces['b'])}
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
        width: 15,
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
