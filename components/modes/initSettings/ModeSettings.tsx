import React from "react";
import {StyleSheet, View, Text, TextInput, Slider, Button} from "react-native";

interface Props {
    difficulty: boolean,
    side: boolean,
    time: boolean,
    renderPlayAgainst: boolean,
    startCallback: (settings: SettingsState) => void,

    initialDifficulty: number,
    initialIsWhite: boolean,
    initialTime: number,
    initialAgainstAI: boolean,
}

export interface SettingsState {
    difficulty: number,
    isWhite: boolean,
    time: number,
    againstAI: boolean,
}


export class ModeSettings extends React.Component<Props, SettingsState> {
    static defaultProps = {
        difficulty: true,
        side: true,
        time: true,
        renderPlayAgainst: true,

        initialDifficulty: 20,
        initialIsWhite: true,
        initialTime: 5,
        initialAgainstAI: true,
    };

    private lastUpdate: number = Date.now();
    private readonly timeConsts = [1, 2, 3, 5, 10, 20, 30, 45, 60, 90, 120];
    private nextUpdate: boolean = false;

    constructor(props: Props, state: SettingsState) {
        super(props);

        this.state = {
            ...state,
            isWhite: props.initialIsWhite,
            difficulty: props.initialDifficulty,
            time: props.initialTime,
            againstAI: props.initialAgainstAI
        }
    }

    shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<SettingsState>, nextContext: any): boolean {
        if (Date.now() - this.lastUpdate > 150 || this.nextUpdate) {
            this.nextUpdate = false;
            this.lastUpdate = Date.now();
            return true;
        }
        return false;
    }

    changedDifficulty(value: number, forceUpdate = false) {
        value = Math.floor(value);

        if(forceUpdate)
            this.nextUpdate = true;

        this.setState({
            difficulty: value,
        });
    }

    setSide(white: boolean) {
        this.setState({
            isWhite: white
        });
    }

    changedTime(value: number, forceUpdate = false) {
        value = Math.floor(value);

        if(forceUpdate)
            this.nextUpdate = true;

        this.setState({
            time: this.timeConsts[value],
        });
    }

    setAgainstAI(againstAI: boolean) {
        this.setState({
            againstAI: againstAI,
        });
    }

    start() {
        this.props.startCallback(this.state);
    }

    render() {
        return (
            <View style={styles.wrapper}>
                {/*<View style={[styles.contentTop, styles.content]}>*/}
                <Text style={{fontSize: 20}}>Settings</Text>
                <View style={{height: 20}}/>
                {/*</View>*/}
                <View style={[styles.contentBody, styles.content]}>

                    {this.props.difficulty ? this.renderDifficulty() : null}

                    {this.props.side ? this.renderSide() : null}

                    {this.props.time ? this.renderTime() : null}

                    {this.props.renderPlayAgainst ? this.renderPlayAgainst() : null}
                </View>
                <View style={[styles.startBtn]}>
                <Button title={'Start'} onPress={() => {this.start()}}/>
                 </View>
            </View>
        );
    }

    renderTime() {
        return (
            <View style={styles.setting}>
                <Text style={styles.settingsText}>Time</Text>
                <View style={styles.settingsInput}>
                    <Slider
                        onValueChange={(value) => {
                            this.changedTime(value)
                        }}
                        onSlidingComplete={(value) => {
                            this.changedTime(value, true)
                        }}
                        value={this.props.initialTime}
                        style={{width: 200, height: 40}}
                        minimumValue={0}
                        maximumValue={this.timeConsts.length}
                        minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="#000000"
                    />
                    <Text style={styles.inputValue}>{this.state.time} Min</Text>
                </View>
            </View>
        );
    }

    renderSide() {
        return (
            <View style={styles.setting}>
                <Text style={styles.settingsText}>Side</Text>
                <View style={styles.settingsInput}>

                    <View style={this.state.isWhite ? styles.selectedButton : styles.nonSelectedButton}>
                        <Button title={'White'} onPress={() => {this.setSide(true)}}/>
                    </View>
                    <View style={this.state.isWhite ?  styles.nonSelectedButton : styles.selectedButton}>
                        <Button title={'Black'} onPress={() => {this.setSide(false)}}/>
                    </View>
                </View>
            </View>
        );
    }

    renderDifficulty() {
        return (
            <View style={styles.setting}>
                <Text style={styles.settingsText}>Difficulty</Text>
                <View style={styles.settingsInput}>
                    <Slider
                        onValueChange={(value) => {
                            this.changedDifficulty(value)
                        }}
                        onSlidingComplete={(value) => {
                            this.changedDifficulty(value, true)
                        }}
                        value={this.props.initialDifficulty}
                        style={{width: 200, height: 40}}
                        minimumValue={1}
                        maximumValue={100}
                        minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="#000000"
                    />
                    <Text style={styles.inputValue}>{this.state.difficulty}</Text>
                </View>
            </View>
        );
    }

    renderPlayAgainst() {
        return (
            <View style={styles.setting}>
                <Text style={styles.settingsText}>Play against</Text>
                <View style={styles.settingsInput}>

                    <View style={this.state.againstAI ? styles.selectedButton : styles.nonSelectedButton}>
                        <Button title={'Computer'} onPress={() => {this.setAgainstAI(true)}}/>
                    </View>
                    <View style={this.state.againstAI ?  styles.nonSelectedButton : styles.selectedButton}>
                        <Button title={'Player'} onPress={() => {this.setAgainstAI(false)}}/>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputValue: {
        marginLeft: 10,
        fontSize: 16,
    },
    settingsText: {
        fontSize: 19,
    },
    settingsInput: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    nonSelectedButton: {
        opacity: 0.3,
    },
    selectedButton: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'gray',
        opacity: 1,
    },
    setting: {
        flexDirection: 'column',
        width: '100%',
        borderTopWidth: 1,
        paddingTop: 20,
    },
    content: {
        width: '100%',
        paddingHorizontal: 20,
        alignItems: "center",
    },
    contentBody: {
        flex: 1,
    },
    wrapper: {
        height: '75%',
        marginHorizontal: 50,
        marginVertical: 75,
        borderRadius: 20,
        paddingTop: 15,
        backgroundColor: 'lightgrey',
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.51,
        shadowRadius: 13.16,
        elevation: 20,
    },
    startBtn: {
        borderTopWidth: 1,
        padding: 10,
        width: '100%',
    }
});

