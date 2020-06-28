import React from "react";
import {StyleSheet, View} from "react-native";

interface Props {

}

interface State {
    whiteAdvantage: number
}

export class ChessAnalyseBar extends React.Component<Props, State>{
    constructor(props: Props, state: State) {
        super(props, state);
        this.state = {
            ...state,
            whiteAdvantage: 0,
        };
    }

    render() {
        return (
            <View>
                <View style={styles.white}></View>
                <View style={styles.black}></View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    white: {
        backgroundColor: 'white',
    },
    black: {
        backgroundColor: 'black',
    },
})
