import React from "react";
import {ChessLogic} from "../models/ChessLogic";
import {Analysis} from "../models/Analysis";
import {Button, StyleSheet, View, Text, TouchableOpacity} from "react-native";


interface Props {
    game: ChessLogic,
}

interface State {
}

export class ChessControlPanel extends React.Component<Props, State> {

    constructor(props: Props, state: State) {
        super(props);

        this.state = {
            ...state,
        };
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <TouchableOpacity style={styles.controlButtonWrapper}
                                  onPress={() => this.props.game.undo()}>
                    <Text style={styles.controlButton}>{'<'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlButtonWrapper}
                                  onPress={() => this.props.game.redo()}>
                    <Text style={styles.controlButton}>{'>'}</Text>
                </TouchableOpacity>
                {this.props.children}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    controlButtonWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#b56100',
        width: 50,
        height: 40,
        borderColor: 'black',
        borderWidth: 2,
        margin: 1,
    },
    controlButton: {
        justifyContent:'center',
        fontSize: 30,

    },
    wrapper: {
        width: '100%',
        height: 45,
        backgroundColor: '#633500',
        flexDirection: 'row',
        padding: 2,
    },
});
