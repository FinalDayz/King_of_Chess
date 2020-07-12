import React from "react";
import {Text, Button, ImageBackground, View, Image, StyleSheet, TouchableOpacity} from "react-native";
// @ts-ignore
import {NavigationParams, NavigationScreenProp, NavigationState} from "react-navigation";

interface Props {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

export class MainScreen extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ImageBackground
                    source={require('../../assets/backgrounds/mainBackground.jpg')}
                    style={styles.background}>
                    <Image
                        source={require('../../assets/backgrounds/Title.png')}
                        style={styles.title}/>
                    <View style={styles.rowWrapper}>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => {
                                this.props.navigation.navigate('Competitive');
                            }}>
                            <Image
                                source={require('../../assets/button/Tutorial_mode_btn.png')}
                                style={styles.buttonImage}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => {
                                this.props.navigation.navigate('Competitive');
                            }}>
                            <Image
                                source={require('../../assets/button/Puzzle_mode_btn.png')}
                                style={styles.buttonImage}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rowWrapper}>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => {
                                this.props.navigation.navigate('Competitive');
                            }}>
                            <Image
                                source={require('../../assets/button/Practice_mode_btn.png')}
                                style={styles.buttonImage}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => {
                                this.props.navigation.navigate('Competitive');
                            }}>
                            <Image
                                source={require('../../assets/button/Analyse_mode_btn.png')}
                                style={styles.buttonImage}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rowWrapper}>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => {
                                this.props.navigation.navigate('Competitive');
                            }}>
                            <Image
                                source={require('../../assets/button/Competitive_mode_btn.png')}
                                style={styles.buttonImage}/>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    rowWrapper: {
        flexDirection: 'row',
    },
    background: {
        flex: 1,
        alignItems: 'center',
        paddingTop: '15%',
        alignContent: 'center',
    },
    title: {
        resizeMode: 'contain',
        width: 240,
        height: 85,
    },
    buttonImage: {
        resizeMode: 'contain',
        width: 160,
        marginHorizontal: 5,
        paddingVertical: 0,
        height: 85,
    }
});
