import React from "react";
import {Button, View} from "react-native";
import {NavigationParams, NavigationScreenProp, NavigationState} from "react-navigation";

interface Props {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

export class MainScreen extends React.Component<Props, {}>{
    constructor(props: Props) {
        super(props);
        console.log(props.navigation);
    }

    render() {
        return (
            <View>
                <Button title={'Competitive mode'} onPress={() => {
                    this.props.navigation.navigate('Competitive');
                }}/>
            </View>
        );
    }

}
