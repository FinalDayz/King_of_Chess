import {RenderDecorator} from "./RenderDecorator";
import {StyleSheet, View} from "react-native";
import React from "react";

export class DotCapturedMoveDecorator implements RenderDecorator {
    renderSquare() {
        return (
            <View style={styles.dotWrapper}>
                <View style={styles.dot}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    dotWrapper: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dot: {
        backgroundColor: 'red',
        width: '70%',
        height: '70%',
        borderRadius: 100,
        opacity: .5,
        position: 'absolute',
    }
});
