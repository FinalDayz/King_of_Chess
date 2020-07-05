import React from "react";
import {StyleSheet, Text, View} from 'react-native';
import Chess from 'chess.js';
import {ChessLogic} from "../models/ChessLogic";
import {ChessDisplay} from "./screens/ChessDisplay";
import {ComputerChessPlayer} from "../models/chessPlayers/ComputerChessPlayer";
import {TouchscreenPlayer} from "../models/chessPlayers/TouchscreenPlayer";
import {ChessAnalyseBar} from "./ChessAnalyseBar";
import {ChessControlPanel} from "./ChessControlPanel";
import {ModePlayerAgainstComputer} from "./modes/ModePlayerAgainstComputer";

export interface Props {
}

interface State {
    chessLogic: ChessLogic,
}

export class Main extends React.Component<Props, State> {


    constructor(props: Props, state: State) {
        super(props, state);

        this.state = {
            ...state
        };
    }

    componentDidMount(): void {
        this.setState(  {
            chessLogic: new ChessLogic(),
        });
    }

    render() {
        if(!this.state.chessLogic) {
            return (null);
        }
        return (
            <View>
                <ModePlayerAgainstComputer/>
                {/*<ChessAnalyseBar game={this.state.chessLogic}/>*/}
                {/*<ChessDisplay*/}
                {/*    game={this.state.chessLogic}*/}
                {/*    blackPlayer={new ComputerChessPlayer(this.state.chessLogic, 10)}*/}
                {/*    whitePlayer={new TouchscreenPlayer(this.state.chessLogic)}*/}
                {/*/>*/}
                {/*<ChessControlPanel game={this.state.chessLogic}/>*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({});
