import React from "react";
import {ChessLogic} from "../models/ChessLogic";
import {Text, StyleSheet, View, Image} from "react-native";
import {ChessImages} from "../models/ChessImages";

interface Props {
    game: ChessLogic
}

interface State {

}

export class ChessResultBar extends React.Component<Props, State>{
    constructor(props: Props, state: State) {
        super(props, state);

    }

    render() {
        const image = ChessImages.chesspieces['w-k'];
        return (
            <View style={styles.wrapper}>
                <View style={[styles.block,styles.whiteBlock]}>
                    <Text style={[styles.text, styles.whitesText]}>Captured</Text>
                    <Image style={styles.pieceImage} source={image}/>
                </View>
                <View style={[styles.block, styles.blackBlock]}>
                    <Text style={[styles.text, styles.blacksText]}>Captured</Text>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    pieceImage: {
        width: 30,
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
        justifyContent: 'flex-end',
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
