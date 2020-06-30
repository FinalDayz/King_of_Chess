import React from "react";
import {StyleSheet, View} from "react-native";

interface Props {

}

interface State {
    whiteAdvantage: number,
    whiteWidth: number,
    blackWidth: number,
}

export class ChessAnalyseBar extends React.Component<Props, State>{
    constructor(props: Props, state: State) {
        super(props, state);
        this.state = {
            ...state,
            whiteAdvantage: 0,
            whiteWidth: 50,
            blackWidth: 50,
        };
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <View style={[styles.block, styles.white, {flex: this.state.whiteWidth}]}/>
                <View style={[styles.block, styles.black, {flex: this.state.blackWidth}]}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    white: {
        backgroundColor: 'grey',
    },
    black: {
        backgroundColor: 'black',
    },
    wrapper: {
        flexDirection: 'row'
    },
    block: {
        height: 20,
    }
});
