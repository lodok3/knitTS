export declare enum DelayRepeatBehavior {
    Delayed = "Delayed",
    Immediate = "Immediate",
}

export declare interface Thread {
    SpawnNow(func: (...args: any[]) => void, ...args: any[]): void;
    Spawn(func: (...args: any[]) => void, ...args: any[]): void;
    Delay(waitTime: number, func: (...args: any[]) => void, ...args: any[]): void;
    DelayRepeat(waitTime: number, func: (...args: any[]) => void, behavior?: DelayRepeatBehavior, ...args: any[]): void;
}