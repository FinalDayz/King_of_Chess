import {ChessLogic} from "../models/ChessLogic";
import React from "react";
import {StyleSheet, View, Text} from "react-native";
import {ChessStopwatch} from "../models/ChessStopwatch";

interface Props {
    game: ChessLogic,
    whiteSide: boolean,
}

interface State {
}

export class ChessTimer extends React.Component<Props, State> {
    private stopwatch: ChessStopwatch | undefined;
    private timer: undefined|number;


    constructor(props: Props, state: State) {
        super(props, state);
    }

    componentDidMount(): void {
        this.stopwatch = this.props.game.stopwatch;

        this.timer = setInterval(() => {
            if(this.props.game.hasEnded()) {
                clearInterval(this.timer);
            }
            if(this.stopwatch)
                this.forceUpdate();
        }, 100);
    }

    componentWillUnmount(): void {
        if(this.timer)
            clearInterval(this.timer);
    }

    render() {
        if(!this.stopwatch)
            return null;

        const isThisTurn = this.stopwatch.isWhiteTurn() === this.props.whiteSide;
        // console.log(this.stopwatch);
        return (
            <View style={[styles.wrapper, isThisTurn ? styles.thisTurn : {}]}>
                <Text>Time left: {this.stopwatch.getTimeAsString(this.props.whiteSide)}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    thisTurn: {
        backgroundColor: '#fec367',
    },
    wrapper: {
        alignItems: 'center',
        // flex: 2,
        width: 100,
        justifyContent: 'center',
        height: 40,
        flexDirection: 'row',
    }
});
