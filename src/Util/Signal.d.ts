declare class Signal {
    constructor();

    Fire(...args: any[]): void;
    Wait(): LuaTuple<[...any]>;
    WaitPromise(): Promise<any>;
    Destroy(): void;
    DisconnectAll(): void;

    Connect(handler: (...args: any[]) => void): Connection<Signal>;
}