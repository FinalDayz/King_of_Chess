import React from "react";
import {ChessLogic} from "../models/ChessLogic";
import {Move} from "chess.js";
import {Analysis} from "../models/Analysis";
import {StyleSheet, View, Text} from "react-native";
import {Observer, Subscribable, Subscription} from "rxjs";

interface Props {
    game: ChessLogic,
}

interface State {
    whiteAdvantage: number,
    whiteWidth: number,
    blackWidth: number,
    analysis?: Analysis,
}

export class ChessAnalyseBar extends React.Component<Props, State> {
    private _mounted: boolean;
    private subscription?: Subscription;

    constructor(props: Props, state: State) {
        super(props, state);
        this._mounted = false;
        this.state = {
            ...state,
            whiteAdvantage: 0,
            whiteWidth: 50,
            blackWidth: 50,
        };

    }

    madeMove(move: Move) {
        this.props.game.getCurrentAnalysis()
            .then(analysis => {
                if (this._mounted) {
                    this.setState({
                        analysis: analysis
                    });
                }
            });
    }

    componentDidMount() {
        this.subscription = this.props.game.subscribeToMove((move) => {
            this.madeMove(move);
        });
        this._mounted = true;
    }

    componentWillUnmount() {
        this.subscription?.unsubscribe();
        this._mounted = false;
    }

    centiPawnToPercent(centiPawn: number): number {
        const isNegative = centiPawn < 0;
        centiPawn = Math.abs(centiPawn);
        let score = 1000 - 1000 / (centiPawn + 1000.0) * 1000;
        if (isNegative)
            score = -score;
        return score / 10;
    }

    render() {

        let whiteAdvantage = 0;
        let whiteCpAdvantage = 0;
        const analysis = this.state.analysis;
        if (analysis && analysis.cp) {
            whiteCpAdvantage = analysis.isWhite ? analysis.cp : -analysis.cp;
            whiteAdvantage = this.centiPawnToPercent(whiteCpAdvantage);
        }

        // console.log("ANALYSE... white advantage " + whiteAdvantage);
        const blackAdvantage = -whiteAdvantage;
        return (

            <View style={styles.wrapper}>
                <View style={styles.titleWrapper}>
                 <Text style={[styles.text, styles.title]}>Advantage White vs Black</Text>
                </View>
                <View style={styles.analyseBar}>
                    <View style={[styles.block, styles.white, {flex: (150 - whiteAdvantage)}]}>
                        <Text style={[styles.text]}>{whiteCpAdvantage / 100}</Text>
                    </View>
                    <View style={[styles.block, styles.black, {flex: (150 - blackAdvantage)}]}>
                        <Text
                            style={[styles.text, {color: 'white', textAlign: 'right'}]}>{-whiteCpAdvantage / 100}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    titleWrapper: {
        backgroundColor: 'white',
    },
    title: {
        fontSize: 25,
        color: 'black'
    },
    analyseBar: {
        flexDirection: 'row'
    },
    text: {
        padding: 5,
        fontSize: 20,
    },
    white: {
        backgroundColor: '#d9d9d9',
    },
    black: {
        backgroundColor: '#333',
    },
    wrapper: {
        borderColor: '#888',
        borderWidth: 2,

    },
    block: {
        height: 40,
    }
});
