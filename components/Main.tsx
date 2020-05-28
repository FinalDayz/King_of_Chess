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
}


export class Main extends React.Component<Props, State> {

    constructor(props: Props, state: State) {
        super(props, state);
    }

    render() {
        return (
            <View>
                <Text>Main</Text>
                <ChessDisplay
                    game={new ChessLogic()}
                    blackPlayer={new ComputerChessPlayer()}
                    whitePlayer={new TouchscreenPlayer()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({});
