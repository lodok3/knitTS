import { Signal } from "Util/Signal";

export declare class ClientRemoteProperty {
    constructor(valueObject: ValueBase | RemoteEvent);

    Get(): any;
    Destroy(): void;

    Changed: Signal
}