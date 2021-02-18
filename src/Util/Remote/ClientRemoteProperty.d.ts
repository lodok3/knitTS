import { Signal } from "Util/Signal";

export declare class ClientRemoteProperty<T> {
    constructor(valueObject: ValueBase);

    Get(): any;
    Destroy(): void;

    Changed: Signal<T>
}