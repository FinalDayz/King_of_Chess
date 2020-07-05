import React from "react";
import {StyleSheet, View, Text, TextInput, Slider} from "react-native";

interface Props {

}

interface State {

}

export class PlayAgainstComputerSettings extends React.Component<Props, State> {
    constructor(props: Props, state: State) {
        super(props);

        this.state = {
            ...state,
        }
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <Text style={{fontSize: 20}}>Settings</Text>
                 <View style={styles.setting}>
                     <Text>Difficulty</Text>
                     <Slider
                         style={{width: 200, height: 40}}
                         minimumValue={0}
                         maximumValue={1}
                         minimumTrackTintColor="#FFFFFF"
                         maximumTrackTintColor="#000000"
                     />
                 </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    setting: {

    },
    wrapper: {
        height: '75%',
        marginHorizontal: 50,
        marginVertical: 75,
        backgroundColor: "#c46e00",
        borderRadius: 20,
        paddingTop: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.51,
        shadowRadius: 13.16,
        elevation: 20,
    }
});
