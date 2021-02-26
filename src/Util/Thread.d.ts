declare enum DelayRepeatBehavior {
    Delayed = "Delayed",
    Immediate = "Immediate",
}

declare interface Thread {
    SpawnNow(func: (...args: any[]) => void, ...args: any[]): void;
    Spawn(func: (...args: any[]) => void, ...args: any[]): void;
    Delay(waitTime: number, func: (...args: any[]) => void, ...args: any[]): void;
    DelayRepeat(waitTime: number, func: (...args: any[]) => void, behavior?: DelayRepeatBehavior, ...args: any[]): void;
}

export { Thread }
export { DelayRepeatBehavior }