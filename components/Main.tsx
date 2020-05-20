import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import Chess from 'chess.js';
import {ChessLogic} from "../models/ChessLogic";

export interface Props {
}

interface State {
}


export class Main extends React.Component<Props, State> {

    constructor(props: Props, state: State) {
        super(props, state);

        var ch = new ChessLogic();
    }

    render()
    {
        return (
            <Text>Main</Text>
        );
    }
}
