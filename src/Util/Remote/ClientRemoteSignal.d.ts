export declare class ClientRemoteSignal {
    constructor(remoteEvent: RemoteEvent);

    Connect(handler: (...args: any[]) => any): Connection<ClientRemoteSignal>;
    Fire(...args: any[]): void;
    Wait(): LuaTuple<[...any]>;
    Destroy(): void;
}