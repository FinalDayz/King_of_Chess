import React, {createRef} from "react";
import {StyleSheet, Text, View} from 'react-native';
import Chess from 'chess.js';
import {ChessLogic} from "../models/ChessLogic";
import {ChessDisplay} from "./screens/ChessDisplay";
import {ComputerChessPlayer} from "../models/chessPlayers/ComputerChessPlayer";
import {TouchscreenPlayer} from "../models/chessPlayers/TouchscreenPlayer";
import {ChessAnalyseBar} from "./ChessAnalyseBar";
import {ChessControlPanel} from "./ChessControlPanel";
import {CompetitiveMode} from "./modes/CompetitiveMode";

export interface Props {
}

interface State {
    chessLogic: ChessLogic,
}

export class Main extends React.Component<Props, State> {
    private startCompetitive?: () => void;
    private competitiveMode = createRef<CompetitiveMode>();


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

        if (this.competitiveMode.current) {
            this.competitiveMode.current.startMode();
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <CompetitiveMode ref={this.competitiveMode}/>
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
