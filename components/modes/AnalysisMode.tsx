import {ChessLogic} from "../../models/ChessLogic";
import {ChessPlayerInterface} from "../../models/chessPlayers/ChessPlayerInterface";
import React from "react";
import {ChessMode} from "../../models/ChessMode";
import {ChessDisplay, DisplaySettings} from "../screens/ChessDisplay";
import {TouchscreenPlayer} from "../../models/chessPlayers/TouchscreenPlayer";
import {ImageBackground, StyleSheet, View} from "react-native";
import {ChessResultBar} from "../ChessResultBar";
import {ChessEnd, SavedResult} from "../ChessEnd";
import {ChessAnalyseBar} from "../ChessAnalyseBar";
import {ChessControlPanel} from "../ChessControlPanel";
import {NavigationScreenProp, NavigationState} from "react-navigation";

interface Props {
    navigation: NavigationScreenProp<NavigationState>
}

interface State {
    showSettings: boolean,
    game: ChessLogic,
    whitePlayer: ChessPlayerInterface,
    blackPlayer: ChessPlayerInterface,

}

export class AnalysisMode extends React.Component<Props, State> implements ChessMode {
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

    startMode(): void {
        const lastResult : SavedResult = this.props.navigation.getParam('lastResult');

        if(lastResult)
            this.state.game.loadFromMoves(lastResult.moves);
    }

    render() {
        return (
            <ImageBackground
                source={require('../../assets/backgrounds/woodBackground.jpg')}
                style={{flex: 1}}>
                <View style={styles.wrapper}>

                    {this.state.showSettings ? null : (
                        <View>

                            <ChessAnalyseBar game={this.state.game}/>
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
                            <ChessControlPanel game={this.state.game}/>
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
    settingsScreen: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 22
    },
    wrapper: {
        flex: 1,
    }
});
