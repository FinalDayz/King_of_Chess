import React from 'react';
import {GestureResponderEvent, PanResponder, PanResponderInstance, View} from "react-native";

export interface Props {
    info: string,
}

interface State {
}


export class TouchView extends React.Component<Props, State> {
    private _panResponder: PanResponderInstance;
    constructor(props: Props, state: State) {
        super(props, state);
        this._panResponder = PanResponder.create({
            // Ask to be the responder:
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

            onPanResponderGrant: (evt, gestureState) => {
                // The guesture has started. Show visual feedback so the user knows
                // what is happening!

                // gestureState.{x,y}0 will be set to zero now
            },
            onPanResponderMove: (evt, gestureState) => {
                // The most recent move distance is gestureState.move{X,Y}

                // The accumulated gesture distance since becoming responder is
                // gestureState.d{x,y}
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                // The user has released all touches while this view is the
                // responder. This typically means a gesture has succeeded
                // console.log("onPanResponderRelease", evt);
            },
            onPanResponderTerminate: (evt, gestureState) => {
                // Another component has become the responder, so this gesture
                // should be cancelled
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
                // Returns whether this component should block native components from becoming the JS
                // responder. Returns true by default. Is currently only supported on android.
                return true;
            },
        });


    }

    render() {
        return (
            <View

                onResponderRelease={(event) => {console.log(this.props.info);}}
                onStartShouldSetResponder={(evt) => true}
                onMoveShouldSetResponder={(evt) => true}

                >
                {this.props.children}
            </View>
        );
    }

    touchEnd(event: GestureResponderEvent) {
        console.log(event);

        if (this.props.children) {

        }
    }
}
