import {ChessLogic, ENDGAME} from "../models/ChessLogic";
import React from "react";
import {StyleSheet, View, Text, Modal, TouchableWithoutFeedback, Button} from "react-native";
import {AsyncStorage} from 'react-native';
import {Move} from "chess.js";

interface Props {
    game: ChessLogic,
    saveMatch: boolean,
}

interface State {
    visible: boolean
}

export interface SavedResult {
    moves: Move[],
    result: ENDGAME
}

export class ChessEnd extends React.Component<Props, State> {
    private savedResult = false;
    static defaultProps = {
        saveMatch: false,
    };
    private timer: undefined | number;


    constructor(props: Props, state: State) {
        super(props, state);

        this.state = {
            ...state,
            visible: true,
        };
    }

    componentDidMount(): void {
        this.timer = setInterval(() => {
            this.forceUpdate();
        }, 500);
    }

    componentWillUnmount(): void {
        if (this.timer)
            clearInterval(this.timer);
    }

    render() {

        if (!this.props.game.hasEnded()) {
            return null;
        }

        const end = this.props.game.getEndedResult();

        if (!end)
            return null;
        let player, title, content = "";

        switch (end.result) {
            case "BLACK_LOST":
                player = "black";
                break;
            case "WHITE_LOST":
                player = "white";
                break;
        }

        switch (end.cause) {
            case "CHECKMATE":
                title = 'Checkmate';
                content = player + " lost due checkmate!";
                break;
            case "DRAW":
                title = 'Draw';
                content = "Game ends in a draw!";
                break;
            case "OUT_OF_TIME":
                title = 'Out of time';
                content = player + " is out of time!";
                break;
            case "STALEMATES":
                title = "Draw";
                content = "Game has end in a draw because of stalemates!";
                break;
        }


        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.visible}
            >
                <View style={{
                    opacity: 0.8,
                    position: 'absolute',
                    backgroundColor: 'black',
                    width: '70%',
                    marginHorizontal: '15%',
                    marginTop: '60%',
                    height: 150,
                    alignItems: 'center',
                    alignContent: 'center',
                    borderRadius: 20,
                    padding: 10,
                }}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.content}>{content}
                        {this.props.saveMatch ? '(Match saved)' : ''}
                    </Text>
                    <View style={{paddingTop: 20, flex: 1}}>
                        <Button title={'Dismiss'} onPress={() => {
                            this.setState({
                                visible: false
                            });
                        }}/>
                    </View>
                </View>
            </Modal>);

    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        color: 'white',
    },
    content: {
        color: 'white',
        fontSize: 20,
    },
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
