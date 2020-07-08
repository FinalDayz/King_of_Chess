import React from "react";
import {Modal, Text, StyleSheet, View} from "react-native";
import {ChessMode} from "../../models/ChessMode";
import {ModeSettings} from "./initSettings/ModeSettings";

interface Props {

}

interface State {
    showSettings: boolean
}

export class CompetitiveMode extends React.Component<Props, State> implements ChessMode {
    constructor(props: Props, state: State) {
        super(props);

        this.state = {
            ...state,
            showSettings: false
        };
    }

    componentDidMount() {
        this.startMode();
    }

    render() {
        console.log("showSettings? " + this.state.showSettings);
        return (
            <View style={styles.wrapper}>

                <View style={styles.settingsScreen}>
                    {/*<Modal*/}
                    {/*    visible={this.state.showSettings}*/}
                    {/*    transparent={true}>*/}
                    {/*    <View style={{ opacity: 0.5, backgroundColor: 'black', width: '100%', height: '100%'}}/>*/}
                    {/*</Modal>*/}
                </View>
                <View style={styles.settingsScreen}>
                    {/*<Modal*/}
                    {/*    visible={this.state.showSettings}*/}
                    {/*    transparent={true}>*/}
                    {/*    <View style={{ opacity: 0.5, backgroundColor: 'black', width: '100%', height: '100%'}}/>*/}
                    {/*</Modal>*/}
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.showSettings}
                        onRequestClose={() => {
                            // Alert.alert("Modal has been closed.");
                        }}
                    >
                        <View style={{ opacity: 0.5, position:'absolute',backgroundColor: 'black', width: '100%', height: '100%'}}/>
                        <ModeSettings
                            startCallback={() => {
                                console.log("CLOSE");
                                this.setState({
                                    showSettings: false,
                                })
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
