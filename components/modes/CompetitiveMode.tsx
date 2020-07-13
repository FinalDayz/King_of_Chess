import React from "react";
import {Modal, Text, StyleSheet, View, Alert, ImageBackground} from "react-native";
import {ChessMode} from "../../models/ChessMode";
import {ModeSettings, SettingsState} from "./initSettings/ModeSettings";
import {ChessDisplay, DisplaySettings} from "../screens/ChessDisplay";
import {ChessLogic} from "../../models/ChessLogic";
import {ChessPlayerInterface} from "../../models/chessPlayers/ChessPlayerInterface";
import {TouchscreenPlayer} from "../../models/chessPlayers/TouchscreenPlayer";
import {ChessResultBar} from "../ChessResultBar";
import {ComputerChessPlayer} from "../../models/chessPlayers/ComputerChessPlayer";
import {ChessTimer} from "../ChessTimer";
import {ChessEnd} from "../ChessEnd";

interface Props {

}

interface State {
    showSettings: boolean,
    game: ChessLogic,
    whitePlayer: ChessPlayerInterface,
    blackPlayer: ChessPlayerInterface,

}

export class CompetitiveMode extends React.Component<Props, State> implements ChessMode {
    private displaySettings: DisplaySettings;

    constructor(props: Props, state: State) {
        super(props);

        const game = new ChessLogic();

        this.displaySettings = {
            whiteDown: true
        };

        this.state = {
            ...state,
            showSettings: false,
            game: game,
            whitePlayer: new TouchscreenPlayer(game),
            blackPlayer: new TouchscreenPlayer(game),
        };
    }

    componentDidMount() {
        this.startMode();
    }

    start(settings: SettingsState) {
        const game = this.state.game;
        let whitePlayer, blackPlayer;

        console.log(settings.againstAI);

        const player = new TouchscreenPlayer(game);
        const opponent = settings.againstAI ?
            new ComputerChessPlayer(game, settings.difficulty) :
            new TouchscreenPlayer(game);

        if (settings.isWhite) {
            whitePlayer = player;
            blackPlayer = opponent;
        } else {
            blackPlayer = player;
            whitePlayer = opponent;
        }

        game.addTimer(settings.time);

        this.displaySettings.whiteDown = settings.isWhite;

        this.setState({
            showSettings: false,
            whitePlayer: whitePlayer,
            blackPlayer: blackPlayer,
        });
        game.start();
    }

    render() {
        return (
            <ImageBackground
                source={require('../../assets/backgrounds/woodBackground.jpg')}
                style={{flex: 1}}>
            <View style={styles.wrapper}>

                {this.state.showSettings ? (null) : (
                    <View>
                        <ChessTimer
                            game={this.state.game}
                            whiteSide={!this.displaySettings.whiteDown}/>
                        <ChessResultBar
                            game={this.state.game}
                            whiteSide={!this.displaySettings.whiteDown}/>
                        <ChessDisplay
                            displaySettings={this.displaySettings}
                            game={this.state.game}
                            whitePlayer={this.state.whitePlayer}
                            blackPlayer={this.state.blackPlayer}>
                        </ChessDisplay>
                        <ChessResultBar
                            game={this.state.game}
                            whiteSide={this.displaySettings.whiteDown}/>
                        <ChessTimer
                            game={this.state.game}
                            whiteSide={this.displaySettings.whiteDown}/>

                            <ChessEnd
                                game={this.state.game}/>
                    </View>
                )}

                <View style={styles.settingsScreen}>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.showSettings}
                    >
                        <View style={{
                            opacity: 0.5,
                            position: 'absolute',
                            backgroundColor: 'black',
                            width: '100%',
                            height: '100%'
                        }}/>
                        <ModeSettings
                            startCallback={(settings) => {
                                this.start(settings);
                            }}
                        />
                    </Modal>
                </View>

            </View>
            </ImageBackground>
        );
    }

    startMode(): void {
        this.setState({
            showSettings: true,
        })
    }
}

const styles = StyleSheet.create({
    settingsScreen: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 22
        // marginTop: 300,

        // marginHorizontal: '5%',
        // marginVertical: '10%',
        // width: '90%',
        // height: '100%',
        // elevation: 10,
        // backgroundColor: 'magenta',
    },
    wrapper: {
        flex: 1,
    }
});
