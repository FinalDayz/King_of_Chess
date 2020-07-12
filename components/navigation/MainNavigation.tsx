import {CompetitiveMode} from "../modes/CompetitiveMode";
import {MainScreen} from "./MainScreen";

import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from "react-navigation-stack";

const MainNavigation = createStackNavigator({
        MainScreen: {
            screen: MainScreen,
            navigationOptions: {
                headerShown: false,
            }
        },
        Tutorial: {
            screen: CompetitiveMode,
            navigationOptions: {
                title: 'Tutorial Mode',
            }
        },
        Puzzle: {
            screen: CompetitiveMode,
            navigationOptions: {
                headerTitle: 'Puzzle Mode'
            }
        },
        Practice: {
            screen: CompetitiveMode,
            navigationOptions: {
                headerTitle: 'Practice Mode'
            }
        },
        Competitive: {
            screen: CompetitiveMode,
            navigationOptions: {
                headerTitle: 'Competitive Mode'
            }
        },
        Analyse: {
            screen: CompetitiveMode,
            navigationOptions: {
                headerTitle: 'Analyse Mode'
            }
        },

    },{
        initialRouteName: 'MainScreen'
    }
);

export default createAppContainer(MainNavigation);
