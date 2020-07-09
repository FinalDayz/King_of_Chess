import React from "react";
import {Modal, Text, StyleSheet, View, Alert} from "react-native";
import {ChessMode} from "../../models/ChessMode";
import {ModeSettings} from "./initSettings/ModeSettings";
import {ChessDisplay} from "../screens/ChessDisplay";
import {ChessLogic} from "../../models/ChessLogic";
import {ChessPlayerInterface} from "../../models/chessPlayers/ChessPlayerInterface";
import {TouchscreenPlayer} from "../../models/chessPlayers/TouchscreenPlayer";
import {ChessResultBar} from "../ChessResultBar";

interface Props {

}

interface State {
    showSettings: boolean,
    game: ChessLogic,
    whitePlayer: ChessPlayerInterface,
    blackPlayer: ChessPlayerInterface,
}

export class CompetitiveMode extends React.Component<Props, State> implements ChessMode {
    constructor(props: Props, state: State) {
        super(props);

        const game = new ChessLogic();

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

    start() {
        this.setState({
            showSettings: false,
        });
    }

    render() {
        console.log("showSettings? " + this.state.showSettings);
        return (
            <View style={styles.wrapper}>

                <ChessDisplay
                    game={this.state.game}
                    whitePlayer={this.state.whitePlayer}
                    blackPlayer={this.state.blackPlayer}>
                </ChessDisplay>
                <ChessResultBar
                    game={this.state.game}/>
                <View style={styles.settingsScreen}>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.showSettings}
                    >
                        <View style={{ opacity: 0.5, position:'absolute',backgroundColor: 'black', width: '100%', height: '100%'}}/>
                        <ModeSettings
                            startCallback={() => {
                                this.start();
                            }}
                        />
                    </Modal>
                </View>
            </View>
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
