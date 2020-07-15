import {ChessLogic} from "../../models/ChessLogic";
import {ChessPlayerInterface} from "../../models/chessPlayers/ChessPlayerInterface";
import React from "react";
import {ChessMode} from "../../models/ChessMode";
import {ChessDisplay, DisplaySettings} from "../screens/ChessDisplay";
import {TouchscreenPlayer} from "../../models/chessPlayers/TouchscreenPlayer";
import {ActivityIndicator, Alert, ImageBackground, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {ChessEnd} from "../ChessEnd";
import {ChessControlPanel} from "../ChessControlPanel";
import {NavigationScreenProp, NavigationState} from "react-navigation";
import {ComputerChessPlayer} from "../../models/chessPlayers/ComputerChessPlayer";
import {HTTPClient} from "../../models/HTTPClient";

interface Props {
    navigation: NavigationScreenProp<NavigationState>
}

interface State {
    loading: boolean,
    game: ChessLogic,
    whitePlayer: ChessPlayerInterface,
    blackPlayer: ChessPlayerInterface,
}

export class PuzzleMode extends React.Component<Props, State> implements ChessMode {
    private displaySettings: DisplaySettings;

    constructor(props: Props, state: State) {
        super(props);

        const game = new ChessLogic();

        this.displaySettings = {
            whiteDown: true
        };

        this.state = {
            ...state,
            loading: true,
            game: game,
            whitePlayer: new TouchscreenPlayer(game),
            blackPlayer: new ComputerChessPlayer(game, 20),
        };
    }


    componentDidMount() {
        this.startMode();
    }

    startMode(): void {
        this.setState({
            loading: true,
        });

        HTTPClient.getRequest("/puzzle")
            .then(fen => {
                this.state.game.setFen(fen.puzzle);
                this.setState({
                    loading: false,
                });
            })
    }

    render() {
        return (
            <ImageBackground
                source={require('../../assets/backgrounds/woodBackground.jpg')}
                style={{flex: 1}}>
                <View style={styles.wrapper}>
                    {this.state.loading ? (
                        <View>
                            <Modal
                                animationType="fade"
                                transparent={true}
                                visible={this.state.loading}
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
                                    <View style={{height: 75, marginTop: 40}}>
                                        <ActivityIndicator size="large"/>
                                    </View>
                                </View>
                            </Modal>
                        </View>
                    ) : (
                        <View>

                            <ChessDisplay
                                displaySettings={this.displaySettings}
                                game={this.state.game}
                                whitePlayer={this.state.whitePlayer}
                                blackPlayer={this.state.blackPlayer}>
                            </ChessDisplay>

                            < ChessControlPanel game={this.state.game}>
                                <TouchableOpacity
                                    style={styles.controlButtonWrapper}
                                    onPress={() => {
                                        this.state.game.getCurrentAnalysis().then(analyse => {
                                            Alert.alert(
                                                "Best move",
                                                "The next move to make is: " + analyse.bestMove
                                            );
                                        });
                                    }}>
                                    <Text style={styles.controlButton}>{'?'}</Text>
                                </TouchableOpacity>
                            </ChessControlPanel>
                            <ChessEnd
                                game={this.state.game}/>

                        </View>
                    )}

                </View>
            </ImageBackground>

        );
    }
}

const styles = StyleSheet.create({
    controlButtonWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#b56100',
        width: 50,
        height: 40,
        borderColor: 'black',
        borderWidth: 2,
        margin: 1,
    },
    controlButton: {
        justifyContent: 'center',
        fontSize: 30,

    },
    wrapper: {
        flex: 1,
    }
});
