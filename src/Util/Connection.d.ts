declare class Connection<T> {
    constructor(event: T, connection: RBXScriptConnection)

    IsConnected(): boolean;
    Disconnect(): void;
    Destroy(): void;
}
