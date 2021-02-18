export declare class RemoteSignal {
    Connect(handler: (player: Player, ...args: any[]) => void): RBXScriptConnection;
    Fire(player: Player, ...args: any[]): void;
    FireAll(...args: any[]): void;
    FireExcept(player: Player, ...args: any[]): void;
    Wait(): LuaTuple<any>;
    Destroy(): void;
}