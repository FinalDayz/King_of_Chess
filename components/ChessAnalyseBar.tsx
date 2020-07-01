import React from "react";
import {StyleSheet, View} from "react-native";
import {ChessLogic} from "../models/ChessLogic";
import {Move} from "chess.js";
import {Analysis} from "../models/Analysis";

interface Props {
    game: ChessLogic
}

interface State {
    whiteAdvantage: number,
    whiteWidth: number,
    blackWidth: number,
    analysis?: Analysis,
}

export class ChessAnalyseBar extends React.Component<Props, State> {
    constructor(props: Props, state: State) {
        super(props, state);
        this.state = {
            ...state,
            whiteAdvantage: 0,
            whiteWidth: 50,
            blackWidth: 50,
        };

        this.props.game.addMoveCallback(this.madeMove)
    }

    madeMove(move: Move) {
        this.props.game.getCurrentAnalysis()
            .then(analysis => {
                this.setState({
                    analysis: analysis
                });
            });

    }

    centiPawnToPercent(centiPawn: number): number {
        const isNegative = centiPawn < 0;
        centiPawn = Math.abs(centiPawn);

        return 50;
    }

    render() {
        let whiteArea = 50;
        const analysis = this.state.analysis;
        if(analysis && analysis.cp)
            whiteArea = this.centiPawnToPercent(
                analysis.isWhite ? analysis.cp : -analysis.cp
            );
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
