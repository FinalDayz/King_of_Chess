import {CompetitiveMode} from "../modes/CompetitiveMode";
import {MainScreen} from "./MainScreen";

import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from "react-navigation-stack";
import {AnalysisMode} from "../modes/AnalysisMode";
import {PuzzleMode} from "../modes/PuzzleMode";

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
            screen: PuzzleMode,
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
            screen: AnalysisMode,
            navigationOptions: {
                headerTitle: 'Analysis Mode'
            }
        },

    },{
        initialRouteName: 'MainScreen'
    }
);

export default createAppContainer(MainNavigation);
