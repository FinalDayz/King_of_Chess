import {RenderDecorator} from "./RenderDecorator";
import {StyleSheet, View} from "react-native";
import React from "react";

export class DotMoveDecorator implements RenderDecorator {
    renderSquare() {
        return (
            <View style={styles.dotWrapper}>
                <View style={styles.outerDot}/>
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
        backgroundColor: 'blue',
        width: '30%',
        height: '30%',
        borderRadius: 100,
        opacity: .3,
        position: 'absolute',
    },
    outerDot: {
        backgroundColor: 'blue',
        width: '50%',
        height: '50%',
        borderRadius: 100,
        opacity: .3,
        position: 'absolute',
    }
});
