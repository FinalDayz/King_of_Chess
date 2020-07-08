import {Position} from "../models/Position";
import {LayoutChangeEvent, View, ViewProps} from "react-native";
import React from "react";

interface Props extends ViewProps {
    positionFeedback: (pos: Position) => void;
}

export class PositionView extends React.Component<Props, {}> {

    private positionView: any;
    private position: null|Position = null;

    constructor(props: Props) {
        super(props);

    }

    private handleLayoutChange(event: LayoutChangeEvent) {
        this.positionView.measure((
            x: number,
            y: number,
            width: number,
            height: number,
            pageX: number,
            pageY: number
        ) => {
            this.position = {
                x: x,
                y: y,
                width: width,
                height: height,
                pageX: pageX,
                pageY: pageY,
            };
            this.props.positionFeedback(this.position);
        });
    }

    render() {
        return (
            <View
                {...this.props}
                onLayout={(event) => {
                    this.handleLayoutChange(event)
                }}
                ref={view => this.positionView = view}
            >
                {this.props.children}
            </View>
        );
    }
}
