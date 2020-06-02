import React from "react";
import {StyleSheet, Text, View} from 'react-native';
import Chess from 'chess.js';
import {ChessLogic} from "../models/ChessLogic";
import {ChessDisplay} from "./screens/ChessDisplay";
import {ComputerChessPlayer} from "./chessPlayers/ComputerChessPlayer";
import {TouchscreenPlayer} from "./chessPlayers/TouchscreenPlayer";

export interface Props {
}

interface State {
    chessLogic: ChessLogic,
}

export class Main extends React.Component<Props, State> {


    constructor(props: Props, state: State) {
        super(props, state);

        this.state = {
            chessLogic: new ChessLogic(),
        };
    }

    render() {
        return (
            <View>
                <Text>Main</Text>
                <ChessDisplay
                    game={this.state.chessLogic}
                    blackPlayer={new ComputerChessPlayer(this.state.chessLogic)}
                    whitePlayer={new TouchscreenPlayer(this.state.chessLogic)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({});
