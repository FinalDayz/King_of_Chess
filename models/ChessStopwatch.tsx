export class ChessStopwatch {
    private readonly startTime: number;

    private whiteTimeLeft: number;
    private blackTimeLeft: number;

    private started = false;
    private countingForWhite = true;
    private lastUpdate = Date.now();

    constructor(timeInMinutes: number) {
        const timeInMs = timeInMinutes * 60 * 1000;
        this.startTime = timeInMs;
        this.whiteTimeLeft = timeInMs;
        this.blackTimeLeft = timeInMs;
    }

    getStartTime(): number {
        return this.startTime
    }

    formatNumber(n: number):string {
        return n > 9 ? n.toString() : '0'+n;
    }

    isOutOfTime(white?: boolean) {
        this.updateTime();
        if(white === undefined) {
            return this.whiteTimeLeft < 100 || this.blackTimeLeft < 100
        } else if(white) {
            return this.whiteTimeLeft < 100;
        } else if(!white) {
            return this.blackTimeLeft < 100;
        }
    }

    start(whiteStart: boolean) {
        this.started = true;
        this.countingForWhite = whiteStart;
    }

    switch() {
        this.updateTime();
        this.countingForWhite = !this.countingForWhite;
    }

    isPaused(): boolean {
        return this.started;
    }

    pause() {
        this.updateTime();
        this.started = false;
    }

    unpause() {
        this.lastUpdate = Date.now();
        this.started = true;
    }

    getTime(white: boolean): number {
        this.updateTime();
        if(white) {
            return this.whiteTimeLeft;
        } else {
            return this.blackTimeLeft;
        }
    }

    getTimeInSec(white: boolean): number {
        return Math.round(this.getTime(white) / 1000.0)
    }

    updateTime() {
        if(!this.started)
            return;
        const timePassed = Date.now() - this.lastUpdate;
        if(this.countingForWhite) {
            this.whiteTimeLeft -= timePassed;
        } else {
            this.blackTimeLeft -= timePassed;
        }
        this.lastUpdate = Date.now();
    }

    getTimeAsString(white: boolean) {
        const seconds = this.getTimeInSec(white);

        let minutes = 0;
        if(seconds > 60) {
            minutes = Math.floor(seconds / 60.0);
        }

        return this.formatNumber(minutes) + ":" +
            this.formatNumber(seconds % 60);

    }

    isWhiteTurn(): boolean {
        return this.countingForWhite;
    }
}
