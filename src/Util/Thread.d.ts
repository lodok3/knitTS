declare enum DelayRepeatBehavior {
    Delayed = "Delayed",
    Immediate = "Immediate",
}

declare class Thread {
    static SpawnNow(func: (...args: any[]) => void, ...args: any[]): void;
    static Spawn(func: (...args: any[]) => void, ...args: any[]): void;
    static Delay(waitTime: number, func: (...args: any[]) => void, ...args: any[]): void;
    static DelayRepeat(waitTime: number, func: (...args: any[]) => void, behavior?: DelayRepeatBehavior, ...args: any[]): void;
}

export { Thread }
export { DelayRepeatBehavior }