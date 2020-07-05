import React from "react";
import {Modal, StyleSheet, View} from "react-native";
import {ChessMode} from "../../models/ChessMode";
import {PlayAgainstComputerSettings} from "./initSettings/PlayAgainstComputerSettings";

interface Props {

}

interface State {

}

export class ModePlayerAgainstComputer extends React.Component<Props, State> implements ChessMode {
    constructor(props: Props, state: State) {
        super(props);

        this.state = {
            ...state,
        }
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.settingsScreen}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={true}
                        onRequestClose={() => {
                            // Alert.alert("Modal has been closed.");
                        }}
                    >
                        <PlayAgainstComputerSettings/>
                    </Modal>
                </View>
            </View>
        );
    }

    showMode(): void {
    }

    showInitSettings(): void {

    }
}

const styles = StyleSheet.create({
    settingsScreen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
        // marginTop: 300,

        // marginHorizontal: '5%',
        // marginVertical: '10%',
        // width: '90%',
        // height: '100%',
        // elevation: 10,
        // backgroundColor: 'magenta',
    },
    wrapper: {
        // flex: 1,
    }
});
