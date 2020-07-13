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

        let percentLeft = this.stopwatch.getTime(this.props.whiteSide) / this.stopwatch.getStartTime();
        percentLeft = Math.round(percentLeft * 100);

        return (
            <View style={[styles.wrapper]}>
                <View style={[styles.timeBar, isThisTurn ? styles.thisTurn : styles.notThisTurn,
                    {flex: percentLeft}]}/>
                <View style={[styles.invertTimeBar,
                    {flex: 100 - percentLeft}]}/>
                <Text style={styles.timeText}>Time left: {this.stopwatch.getTimeAsString(this.props.whiteSide)}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    timeText: {
        padding: 10,
        paddingLeft: 5,
        position: 'absolute',
        fontSize: 16,
    },
    notThisTurn: {
        backgroundColor: 'rgba(254,195,103,0.53)',
    },
    invertTimeBar: {
        backgroundColor: 'gray',
        height: 40,
    },
    timeBar: {
        height: 40,
    },
    thisTurn: {
        backgroundColor: '#feb841',
    },
    wrapper: {
        backgroundColor: 'gray',
        // alignItems: 'center',
        // flex: 1,
        // justifyContent: 'center',
        height: 40,
        flexDirection: 'row',
    }
});
