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

    analyse() {
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
        this.subscription = this.props.game.subscribeToView(() => {
            this.analyse();
        });
        this.analyse();
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
            whiteAdvantage = -this.centiPawnToPercent(whiteCpAdvantage);
        }

        let mate = undefined;

        if(analysis?.mate) {
            mate = "Mate in "+analysis.mate;
            whiteAdvantage = analysis.isWhite ? -150 : 150;
            if(analysis?.mate < 0)
                whiteAdvantage = -whiteAdvantage;
        }


        const blackAdvantage = -whiteAdvantage;
        const bestMove = analysis?.bestMove ? analysis?.bestMove : '-';

        return (

            <View style={styles.wrapper}>
                <View style={styles.titleWrapper}>
                 <Text style={[styles.text, styles.title]}>Best move: {bestMove}, White/Black:</Text>
                </View>
                <View style={styles.analyseBar}>
                    <View style={[styles.block, styles.white, {flex: (150 - whiteAdvantage)}]}>
                        <Text style={[styles.text]}>
                            { mate ? (
                                analysis?.isWhite ? mate : ''
                            ) : (
                                whiteCpAdvantage / 100
                            )}
                        </Text>
                    </View>
                    <View style={[styles.block, styles.black, {flex: (150 - blackAdvantage)}]}>
                        <Text style={[styles.text, {color: 'white', textAlign: 'right'}]}>
                            { mate ? (
                                analysis?.isWhite ? '' : mate
                            ) : (
                                -whiteCpAdvantage / 100
                            )}
                        </Text>
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
        fontSize: 22,
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
