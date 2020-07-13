import {ChessLogic} from "../models/ChessLogic";
import {Analysis} from "../models/Analysis";
import React from "react";
import {Subscription} from "rxjs";

interface Props {
    game: ChessLogic,
}

interface State {
    whiteAdvantage: number,
    whiteWidth: number,
    blackWidth: number,
    analysis?: Analysis,
}

export class AnalysisNavigator extends React.Component<Props, State> {
    private viewSubscription: Subscription|undefined;

    componentDidMount(): void {
        this.viewSubscription = this.props.game.subscribeToMove(() => {
            this.forceUpdate();
        });
    }

    componentWillUnmount(): void {
        this.viewSubscription?.unsubscribe();
    }
}
